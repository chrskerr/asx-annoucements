
import React, { useState, useEffect } from "react";
import PropTypes from "proptypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

export default function App () {
	const [ data, setData ] = useState([]);
	const [ savedData, setSavedData ] = useState( JSON.parse( localStorage.getItem( "savedData" )));
	const [ isLoading, setIsLoading ] = useState( 0 );
	const [ onlyPriceSensitive, setOnlyPriceSensitive ] = useState( true );
	const [ onlyAsx300, setOnlyAsx300 ] = useState( true );
	
	useEffect(() => {
		if ( !isLoading ) {
			setIsLoading( true );
			fetch( `https://asx-node.herokuapp.com/?price_sensitive=${ onlyPriceSensitive ? "true" : "false" }&asx300=${ onlyAsx300 ? "true" : "false" }` )
				.then( res => res.json())
				.then( data => setData( _.orderBy( _.map( data, el => {
					const { id } = el;
					return {
						...el,
						read: _.get( savedData, [ id, "read" ], false ),
						saved: _.get( savedData,[ id, "saved" ], false ),
					};
				})), [ "read", "saved", "id" ], [ "asc", "asc", "desc" ]))
				.catch( error => console.error( error ))
				.finally(() => setIsLoading( false ));
		}
	}, [ onlyPriceSensitive, onlyAsx300 ]);

	useEffect(() => {
		if ( !savedData ) setSavedData({});
		localStorage.setItem( "savedData", JSON.stringify( savedData ));
	}, [ savedData ]);

	const dataPlusSaved = _.map( data, el => {
		const { id } = el;
		return {
			...el,
			read: _.get( savedData, [ id, "read" ], false ),
			saved: _.get( savedData,[ id, "saved" ], false ),
		};
	});

	return (
		<div className="body">
			<div className="header">
				<h2>ASX Recent Announcement Feed</h2>
				<p>A scraped collection of ASX announcements from midnight today.</p>
			</div>
			<div className="filters">
				<div>
					<label>Price sensitive only?</label>
					<input type="checkbox" checked={ onlyPriceSensitive } onChange={ () => setOnlyPriceSensitive( !onlyPriceSensitive ) } disabled={ isLoading } />
				</div>
				<div>
					<label>ASX 300 only?</label>
					<input type="checkbox" checked={ onlyAsx300 } onChange={ () => setOnlyAsx300( !onlyAsx300 ) } disabled={ isLoading } />
				</div>
				<div className={ isLoading ? "loading" : "loaded" }>
					{ isLoading ?
						<>
							<p>Loading</p>
							<FontAwesomeIcon icon={ faSpinner } spin size="2x" />
						</>
						: 
						<>
							<p>Loaded</p>
							<FontAwesomeIcon icon={ faCheck } />
						</>
					}
				</div>
			</div>
			{ !_.isEmpty( dataPlusSaved ) && _.map( dataPlusSaved, el => <RowCard data={ el } key={ el.id } savedData={ savedData } setSavedData={ setSavedData } /> ) }
		</div>
	);
}

const RowCard = ({ data, savedData, setSavedData }) => {
	const { id, description, discussionUrl, ticker, time, businessName, read, saved } = data;

	const markRead = () => { if ( !saved ) setSavedData({ ...savedData, [ id ]: { saved, read: !read }}); };

	return (
		<div className={ `card ${ saved ? "saved" : "" } ${ ( !saved && read ) ? "read": "" }` }>
			<div className="card-header">
				<p>{ ticker } - { businessName }</p>
				<p>{ time }</p>
			</div>
			<div className="card-body">
				<a href={ discussionUrl } target="_blank" rel="noopener noreferrer" onClick={ markRead }>{ description }<FontAwesomeIcon icon={ faExternalLinkAlt } size="xs" /></a>
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
