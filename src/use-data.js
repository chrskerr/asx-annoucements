
import { useState, useEffect } from "react";
import IPFS from "ipfs";
import OrbitDB from "orbit-db";
import { differenceInMinutes, parse, subDays } from "date-fns";
import cheerio from "cheerio";
import _ from "lodash";

export default function useData ( database, filters ) {
	const [ db, setDb ] = useState( false );
	useEffect(() => {
		( async () => {
			if ( !db ) {
				const ipfsOptions = { repo : "./ipfs" };
				const ipfs = await IPFS.create( ipfsOptions );
				const orbitdb = await OrbitDB.createInstance( ipfs );
				const newDb = await orbitdb.open( database );
				await newDb.load();
				setDb( newDb );
			}
		})();
	}, []);

	const [ scraperIntervalRef, setScraperIntervalRef ] = useState( false );
	useEffect(() => {
		if ( !scraperIntervalRef && db  ) {
			getNewAnns( db, true );
			setScraperIntervalRef( setInterval( getNewAnns( db, false ), 30 * 1000 ));
		}
		return () => {
			if ( scraperIntervalRef ) clearInterval( scraperIntervalRef );
		};
	}, [ scraperIntervalRef, db ]);

	const [ records, setRecords ] = useState([]);
	const [ queryIntervalRef, setQueryIntervalRef ] = useState( false );
	useEffect(() => {
		if ( !queryIntervalRef && db ) {
			setRecords( query( db, filters ));
			setQueryIntervalRef( setInterval(() => {
				const newRecords = query( db, filters );
				if ( !_.isEqual( records, newRecords )) setRecords( newRecords );
			}, 5 * 1000 ));
		}
		return () => {
			if( queryIntervalRef ) clearInterval( queryIntervalRef );
		};
	}, [ queryIntervalRef, db ]);

	return {
		records,
		loading: !db,
	};
}

const query = ( db, filters ) => {
	if ( filters ) return db.query( filters );
	else return db.get( "" );
};

const getNewAnns = async ( db, initial = false ) => {
	try {
		const asxData = await fetch( "https://hotcopper.com.au/announcements/asx/" );

		if ( asxData ) {		
			const $ = cheerio.load( await asxData.text());
			$( ".hc-announcement-list table.is-hidden-touch > tbody > tr" ).each(( i, el ) => {
				let ticker, discussionUrl, priceSensitive, time, annUrl, description;
				
				$( el ).children().each(( i, el ) => {
					switch ( i ) {
					case 0: 
						ticker = $( el ).find( "a" ).text();
						break;
					case 1:
						description = $( el ).find( "a" ).text();
						discussionUrl = $( el ).find( "a" ).attr( "href" );
						break;
					case 2:
						priceSensitive = $( el ).find( "span" ).text();
						break;
					case 3:
						time = $( el ).find( "span" ).text();
						break;
					case 4:
						annUrl = $( el ).find( "a" ).attr( "href" );
						break;
					default:
						break;
					}
				});

				if ( !( /^\d\d:\d\d$/ ).test( time )) return;
				const parsedTime = parse( time, "HH:mm", new Date());
				const annAge = differenceInMinutes( new Date(), parsedTime );

				if ( !initial && annAge > 3 ) return;

				db.put({
					_id: discussionUrl.split( "/" )[ 2 ], 
					is_price_sensitive: priceSensitive ? true : false, 
					description, 
					time: parsedTime,
					hotcopper_url: `https://hotcopper.com.au${ discussionUrl }`, 
					ann_download_url: annUrl ? `https://hotcopper.com.au${ annUrl }` : null,
					ticker,
				});
			});
		}        
            
		const oldAnns = db.query( doc => doc.time <= subDays( new Date(), 7 ));
		_.forEach( oldAnns, ({ _id }) => db.del( _id ));
		
	} catch ( error ) {
		console.error( error );
	}
};
