
import React, { useState, useEffect } from "react";
import PropTypes from "proptypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck, faTimes, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import { gql, useSubscription } from "@apollo/client";
import { parseJSON, format, subBusinessDays, set, formatISO, differenceInMinutes } from "date-fns";
import numeral from "numeral";
import localforage from "localforage";


const SUBSCRIPTION = gql`
subscription SubcribeAnnouncements ( $time_before: timestamptz!, $is_price_sensitive: [Boolean!], $market_cap_lower: numeric, $market_cap_upper: numeric ) {
	announcements( 
		where: { 
            time: { _gte: $time_before },
			is_price_sensitive: { _in: $is_price_sensitive },
            stock: { market_cap: { _gte: $market_cap_lower, _lte: $market_cap_upper }}
		},
		order_by: { time: desc }
	) {
		ann_download_url
		description
		hotcopper_url
		id time
		is_price_sensitive
		stock {
			name ticker
			GICS exchange
            market_cap
		}
	}
}`;

const marketCapOptions = [
	{ label: "Micro Cap", value: "micro" },
	{ label: "Small Cap", value: "small" },
	{ label: "Medium Cap", value: "medium" },
	{ label: "Large Cap", value: "large" },
];

const marketCapSizes = {
	micro: { lower: 0, upper: 20000000 },
	small: { lower: 20000000, upper: 2000000000 },
	medium: { lower: 2000000000, upper: 10000000000 },
	large: { lower: 10000000000, upper: 999999999999999999 },
};

export default function Home () {
	const [ settings, setSettings ] = useState({
		loaded: false,
		history: {},
		is_price_sensitive: true,
		is_after_4pm_yesterday: true,
		market_cap: "small",
		updateSettings: ( setting, value ) => setSettings( s => ({ ...s, [ setting ]: value })),
	});
	const { loaded, history, is_price_sensitive, is_after_4pm_yesterday, market_cap, updateSettings } = settings;

	useEffect(() => {
		( async () => {
			const oldSettings = await localforage.getItem( "settings" );
			setSettings( s => ({ ...s, ...oldSettings, loaded: true }));
		})();
	}, []);

	const time_before = is_after_4pm_yesterday ? formatISO( set( subBusinessDays( new Date(), 1 ), { hours: 16, minutes: 0, seconds: 0 })) : formatISO( 0 );

	const { data, loading } = useSubscription( SUBSCRIPTION, { variables: { 
		is_price_sensitive: is_price_sensitive ? [ true ] : [ true, false ],
		time_before,
		market_cap_lower: _.get( marketCapSizes, [ market_cap, "lower" ]),
		market_cap_upper: _.get( marketCapSizes, [ market_cap, "upper" ]),
	}});
    
	const announcements = _.get( data, "announcements" );
	const annoucementsWithSavedData = _.map( announcements, announcement => {
		const { id } = announcement;
		return {
			...announcement,
			read: _.get( history, [ id, "read" ], false ),
			saved: _.get( history,[ id, "saved" ], false ),
		};});

	const unread = _.filter( annoucementsWithSavedData, { read: false, saved: false });
	const saved = _.filter( annoucementsWithSavedData, { saved: true });
	const read = _.filter( annoucementsWithSavedData, { read: true, saved: false });

	useEffect(() => {
		if ( !history ) updateSettings( "history", {});
		localforage.setItem( "settings", _.omit( settings, [ "updateSettings" ]));
	}, [ settings ]);
	
	useEffect(() => { 
		document.title = `ASX  Ann Feed (${ _.size( unread ) } unread)`; 
	}, [ unread ]);

	const markAllRead = () => {
		updateSettings( 
			"history",
			_.reduce( announcements, ( acc, { id }) => ({
				...acc,
				[ id ]: { read: true, saved: _.get( history, [ id, "saved" ], false ) },
			}), history ),
		);
	};

	if ( !loaded ) return null;

	return (
		<div className="body">
			<div className="header">
				<Clock />
				<h2>ASX Recent Announcement Feed</h2>
				<p>A scraped collection of ASX announcements, data live updated every minute during peak hours.</p>
				<p>History of read and saved annoucments saved locally to your browser.</p>
			</div>
			<div className="inputs-box-row">
				<div onClick={ () => updateSettings( "is_price_sensitive", !is_price_sensitive ) }>
					<p>Price sensitive only?</p>
					{ is_price_sensitive ? <FontAwesomeIcon icon={ faCheck } /> : <FontAwesomeIcon icon={ faTimes } className="unchecked" /> }
				</div>
				<div>
					<p>Market cap</p>
					<select value={ market_cap } onChange={ e => updateSettings( "market_cap", e.target.value ) }>
						{ !_.isEmpty( marketCapOptions ) && _.map( marketCapOptions, ({ value, label }) => <option key={ value } value={ value }>{ label }</option> )}
					</select>
				</div>
				<div onClick={ () => updateSettings( "is_after_4pm_yesterday", !is_after_4pm_yesterday ) }>
					<p>After 4pm yesterday only?</p>
					{ is_after_4pm_yesterday ? <FontAwesomeIcon icon={ faCheck } /> : <FontAwesomeIcon icon={ faTimes } className="unchecked" /> }
				</div>
			</div>

			{ loading && <div className="loader">
				<FontAwesomeIcon icon={ faSpinner } spin size="3x" />
			</div> }

			{ ( !loading && !_.isEmpty( unread )) && <div className="mark-read-button">
				<button onClick={ markAllRead }>Mark All Read</button>
			</div>}

			{ ( !loading && _.isEmpty( unread ) && _.isEmpty( saved ) && _.isEmpty( read )) && <p className="-colour-tertiary">No matching announcements</p> }
			
			{ !_.isEmpty( saved ) && <h5>Saved ({ _.size( saved )}):</h5> }
			{ !_.isEmpty( saved ) && _.map( saved, el => <RowCard data={ el } key={ el.id } savedData={ history } setSavedData={ history => updateSettings( "history", history ) } /> ) }

			{ !_.isEmpty( unread ) && <h5>Unread ({ _.size( unread )}):</h5> }
			{ !_.isEmpty( unread ) && _.map( unread, el => <RowCard data={ el } key={ el.id } savedData={ history } setSavedData={ history => updateSettings( "history", history ) } /> ) }
			
			{ !_.isEmpty( read ) && <h5>Read ({ _.size( read )}):</h5> }
			{ !_.isEmpty( read ) && _.map( read, el => <RowCard data={ el } key={ el.id } savedData={ history } setSavedData={ history => updateSettings( "history", history ) } /> ) }
		</div>
	);
}

const RowCard = ({ data, savedData, setSavedData }) => {
	const { id, description, hotcopper_url, stock, time, read, saved, is_price_sensitive } = data;
	const { name, ticker, exchange, market_cap, GICS } = stock;

	const parsedTime =  parseJSON( time );
	const lineTwo = _.compact([ `Market Cap: ${ numeral( market_cap ).format( "0.0a" ) }`, is_price_sensitive ? "Price Sensitive" : false ]).join( " - " );
	const isHotcopperAnnAvailable = differenceInMinutes( new Date(), parsedTime ) <= 20;

	return (
		<div className="card">
			<div className="card-header">
				<div>
					<a href={ `https://finance.yahoo.com/quote/${ ticker  }.AX` } target="_blank" rel="noopener noreferrer">{ exchange }:{ ticker }{ name && ` - ${ name }` }<FontAwesomeIcon icon={ faExternalLinkAlt } size="xs" /></a>
					<p>{ GICS }</p>
					<p>{ lineTwo }</p>
				</div>
				<p>{ format( parsedTime, "h:mm aaa '-' EE do MMM" ) }</p>
			</div>
			<div className="card-body">
				<a href={ hotcopper_url } target="_blank" rel="noopener noreferrer">{ description }<FontAwesomeIcon icon={ faExternalLinkAlt } size="xs" className={ isHotcopperAnnAvailable ? "-colour-tertiary" : "" } /></a>
				<div className="inputs-box-column">
					<div onClick={ () => setSavedData({ ...savedData, [ id ]: { read: true, saved: !saved }}) }>
						<label>Saved</label>
						{ saved ? <FontAwesomeIcon icon={ faCheck } /> : <FontAwesomeIcon icon={ faTimes } className="unchecked" /> }
					</div>
					<div onClick={ () => setSavedData({ ...savedData, [ id ]: { saved, read: !read }}) }>
						<label>Read</label>
						{ read ? <FontAwesomeIcon icon={ faCheck } /> : <FontAwesomeIcon icon={ faTimes } className="unchecked" /> }
					</div>
				</div>
			</div>
		</div>
	);
};
RowCard.propTypes = {
	data: PropTypes.object,
	savedData: PropTypes.object,
	setSavedData: PropTypes.func,
};

const Clock = () => {
	const [ time, setTime ] = useState( new Date());
	const [ intervalRef, setIntervalRef ] = useState( false );

	useEffect(() => { 
		if ( !intervalRef ) setIntervalRef( setInterval(() => setTime( new Date()), 1000 )); 
		
		return () => {
			if ( intervalRef ) clearInterval( intervalRef );
		};
	}, [ intervalRef ]);

	return <h3>{ format( time, "h:mm:ss aaa '-' EE do MMM" ) }</h3>;
};
