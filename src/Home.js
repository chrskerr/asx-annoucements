
import React, { useState, useEffect } from "react";
import PropTypes from "proptypes";
import { useSubscription } from "@apollo/react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck, faTimes, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import gql from "graphql-tag";
import { parseJSON, format, subBusinessDays, set, formatISO } from "date-fns";

const SUBSCRIPTION = gql`
subscription SubcribeAnnouncements ( $time_before: timestamptz!, $is_price_sensitive: [Boolean!], $is_asx_300: [Boolean!] ) {
	announcements( 
		where: { 
            time: { _gte: $time_before },
			is_price_sensitive: { _in: $is_price_sensitive },
            stock: { is_asx_300: { _in: $is_asx_300 }}
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
			is_asx_300 GICS
            exchange
		}
	}
}`;

export default function Home () {
	const [ savedData, setSavedData ] = useState( JSON.parse( localStorage.getItem( "savedData" )));
	const [ is_price_sensitive, set_is_price_sensitive ] = useState( true );
	const [ is_asx_300, set_is_asx_300 ] = useState( true );
	const [ is_after_4pm_yesterday, set_is_after_4pm_yesterday ] = useState( true );

	const time_before = is_after_4pm_yesterday ? formatISO( set( subBusinessDays( new Date(), 1 ), { hours: 16, minutes: 0, seconds: 0 })) : formatISO( 0 );

	const { data, loading } = useSubscription( SUBSCRIPTION, { variables: { 
		is_price_sensitive: is_price_sensitive ? [ true ] : [ true, false ],
		is_asx_300: is_asx_300 ? [ true ] : [ true, false ],
		time_before,
	}});

	const announcements = _.get( data, "announcements" );
	const annoucementsWithSavedData = _.map( announcements, announcement => {
		const { id } = announcement;
		return {
			...announcement,
			read: _.get( savedData, [ id, "read" ], false ),
			saved: _.get( savedData,[ id, "saved" ], false ),
		};});

	const unread = _.filter( annoucementsWithSavedData, { read: false, saved: false });
	const saved = _.filter( annoucementsWithSavedData, { saved: true });
	const read = _.filter( annoucementsWithSavedData, { read: true, saved: false });

	useEffect(() => {
		if ( !savedData ) setSavedData({});
		localStorage.setItem( "savedData", JSON.stringify( savedData ));
	}, [ savedData ]);
	
	useEffect(() => { document.title = `ASX  Ann Feed (${ _.size( unread ) } unread)`; }, [ unread ]);

	return (
		<div className="body">
			<div className="header">
				<Clock />
				<h2>ASX Recent Announcement Feed</h2>
				<p>A scraped collection of ASX and NSX announcements, data live updated every minute during peak hours.</p>
				<p>History of read and saved annoucments saved locally to your browser.</p>
			</div>
			<div className="inputs-box-row">
				<div onClick={ () => set_is_price_sensitive( !is_price_sensitive ) }>
					<p>Price sensitive only?</p>
					{ is_price_sensitive ? <FontAwesomeIcon icon={ faCheck } /> : <FontAwesomeIcon icon={ faTimes } className="unchecked" /> }
				</div>
				<div onClick={ () => set_is_asx_300( !is_asx_300 ) }>
					<p>ASX 300 only?</p>
					{ is_asx_300 ? <FontAwesomeIcon icon={ faCheck } /> : <FontAwesomeIcon icon={ faTimes } className="unchecked" /> }
				</div>
				<div onClick={ () => set_is_after_4pm_yesterday( !is_after_4pm_yesterday ) }>
					<p>After 4pm yesterday only?</p>
					{ is_after_4pm_yesterday ? <FontAwesomeIcon icon={ faCheck } /> : <FontAwesomeIcon icon={ faTimes } className="unchecked" /> }
				</div>
			</div>

			{ loading && <div className="loader">
				<FontAwesomeIcon icon={ faSpinner } spin size="3x" />
			</div> }

			{ ( !loading && _.isEmpty( unread ) && _.isEmpty( saved ) && _.isEmpty( read )) && <p className="-colour-tertiary">No matching announcements</p> }

			{ !_.isEmpty( unread ) && <h5>Unread ({ _.size( unread )}):</h5> }
			{ !_.isEmpty( unread ) && _.map( unread, el => <RowCard data={ el } key={ el.id } savedData={ savedData } setSavedData={ setSavedData } /> ) }
			
			{ !_.isEmpty( saved ) && <h5>Saved ({ _.size( saved )}):</h5> }
			{ !_.isEmpty( saved ) && _.map( saved, el => <RowCard data={ el } key={ el.id } savedData={ savedData } setSavedData={ setSavedData } /> ) }
			
			{ !_.isEmpty( read ) && <h5>Read ({ _.size( read )}):</h5> }
			{ !_.isEmpty( read ) && _.map( read, el => <RowCard data={ el } key={ el.id } savedData={ savedData } setSavedData={ setSavedData } /> ) }
		</div>
	);
}

const RowCard = ({ data, savedData, setSavedData }) => {
	const { id, description, hotcopper_url, stock, time, read, saved, is_price_sensitive } = data;
	const { name, ticker, GICS, exchange, is_asx_300 } = stock;

	const parsedTime =  parseJSON( time );
	const lineTwo = _.compact([ GICS, is_asx_300 ? "ASX300" : false, is_price_sensitive ? "$$" : false ]).join( " - " );

	return (
		<div className="card">
			<div className="card-header">
				<div>
					<a href={ `https://finance.yahoo.com/quote/${ ticker  }.AX` } target="_blank" rel="noopener noreferrer">{ exchange }:{ ticker }{ name && ` - ${ name }` }<FontAwesomeIcon icon={ faExternalLinkAlt } size="xs" /></a>
					<p>{ lineTwo }</p>
				</div>
				<p>{ format( parsedTime, "h:mm aaa '-' EE do MMM" ) }</p>
			</div>
			<div className="card-body">
				<a href={ hotcopper_url } target="_blank" rel="noopener noreferrer" onClick={ () => setSavedData({ ...savedData, [ id ]: { saved, read: true }}) }>{ description }<FontAwesomeIcon icon={ faExternalLinkAlt } size="xs" /></a>
				<div className="inputs-box-column">
					<div onClick={ () => setSavedData({ ...savedData, [ id ]: { read, saved: !saved }}) }>
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

	useEffect(() => { if ( !intervalRef ) setIntervalRef( setInterval(() => setTime( new Date()), 1000 )); }, [ intervalRef ]);

	return <h3>{ format( time, "h:mm:ss aaa '-' EE do MMM" ) }</h3>;
};
