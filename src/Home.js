
import React, { useState, useEffect } from "react";
import PropTypes from "proptypes";
import { useSubscription } from "@apollo/react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import gql from "graphql-tag";
import { parseJSON, format, formatDistanceToNow, subBusinessDays, set, formatISO } from "date-fns";

const SUBSCRIPTION = gql`
subscription SubcribeAnnouncements ( $time_before: timestamptz!, $is_price_sensitive: Boolean!, $is_asx_300: Boolean! ) {
    announcements( where: { 
        time: { _gte: $time_before },
        is_price_sensitive: { _eq: $is_price_sensitive }, 
        stock: { is_asx_300: { _eq: $is_asx_300 }}
    }) {
        ann_download_url
        description
        hotcopper_url
        id time
        is_price_sensitive
        stock {
            name ticker
            is_asx_300 GICS
        }
    }
}`;


export default function Home () {
	const [ savedData, setSavedData ] = useState( JSON.parse( localStorage.getItem( "savedData" )));
	const [ is_price_sensitive, set_is_price_sensitive ] = useState( true );
	const [ is_asx_300, set_is_asx_300 ] = useState( true );
	const [ is_after_4pm_yesterday, set_is_after_4pm_yesterday ] = useState( true );

	const time_before = is_after_4pm_yesterday ? formatISO( set( subBusinessDays( new Date(), 1 ), { hours: 16, minutes: 0, seconds: 0 })) : formatISO( 0 );

	const { data, loading } = useSubscription( SUBSCRIPTION, { variables: { is_price_sensitive, is_asx_300, time_before }});

	const announcements = _.get( data, "announcements" );
	const annoucementsWithSavedData = _.map( announcements, announcement => {
		const { id } = announcement;
		return {
			...announcement,
			read: _.get( savedData, [ id, "read" ], false ),
			saved: _.get( savedData,[ id, "saved" ], false ),
		};});
	const sortedAnnouncements = _.orderBy( annoucementsWithSavedData, [ "read", "saved", "id" ], [ "asc", "asc", "desc" ]);

	useEffect(() => {
		if ( !savedData ) setSavedData({});
		localStorage.setItem( "savedData", JSON.stringify( savedData ));
	}, [ savedData ]);

	return (
		<div className="body">
			<div className="header">
				<h2>ASX Recent Announcement Feed</h2>
				<p>A scraped collection of ASX announcements from midnight today.</p>
			</div>
			<div className="flex-box">
				<div>
					<label>Price sensitive only?</label>
					<input type="checkbox" checked={ is_price_sensitive } onChange={ () => set_is_price_sensitive( !is_price_sensitive ) } disabled={ loading } />
				</div>
				<div>
					<label>ASX 300 only?</label>
					<input type="checkbox" checked={ is_asx_300 } onChange={ () => set_is_asx_300( !is_asx_300 ) } disabled={ loading } />
				</div>
				<div>
					<label>After 4pm yesterday only?</label>
					<input type="checkbox" checked={ is_after_4pm_yesterday } onChange={ () => set_is_after_4pm_yesterday( !is_after_4pm_yesterday ) } disabled={ loading } />
				</div>
				<div className={ `${ loading ? "loading" : "loaded" }` }>
					{ loading ?
						<>
							<p>Connecting</p>
							<FontAwesomeIcon icon={ faSpinner } spin size="2x" />
						</>
						: 
						<>
							<p>Connected</p>
							<FontAwesomeIcon icon={ faCheck } />
						</>
					}
				</div>
			</div>
			{ !_.isEmpty( sortedAnnouncements ) && _.map( sortedAnnouncements, el => <RowCard data={ el } key={ el.id } savedData={ savedData } setSavedData={ setSavedData } /> ) }
		</div>
	);
}

const RowCard = ({ data, savedData, setSavedData }) => {
	const { id, description, hotcopper_url, stock, time, read, saved } = data;
	const { name, ticker, GICS } = stock;

	const markRead = () => { if ( !saved ) setSavedData({ ...savedData, [ id ]: { saved, read: !read }}); };

	const parsedTime =  parseJSON( time );

	return (
		<div className="card">
			<div className="card-header">
				<p>{ ticker } - { name } - { GICS }</p>
				<p>{ formatDistanceToNow( parsedTime ) } ago - { format( parsedTime, "d LLL @ hh:mm bbb" )} </p>
			</div>
			<div className="card-body">
				<a href={ hotcopper_url } target="_blank" rel="noopener noreferrer" onClick={ markRead }>{ description }<FontAwesomeIcon icon={ faExternalLinkAlt } size="xs" /></a>
				<div className="read-saved">
					<div>
						<label>Saved</label>
						<input type="checkbox" checked={ saved } onChange={ () => setSavedData({ ...savedData, [ id ]: { read: false, saved: !saved }}) } />
					</div>
					<div>
						<label>Read</label>
						<input type="checkbox" checked={ read } onChange={ markRead } disabled={ saved } />
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
