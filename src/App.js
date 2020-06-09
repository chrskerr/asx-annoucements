
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

export default function App () {
	const [ data, setData ] = useState([]);
	const [ onlyPriceSensitive, setOnlyPriceSensitive ] = useState( true );
	const [ onlyAsx300, setOnlyAsx300 ] = useState( true );
	
	// useEffect(() => {
	// 	fetch( `https://asx-node.herokuapp.com/?price_sensitive=${ onlyPriceSensitive ? "true" : "false" }&asx300=${ onlyAsx300 ? "true" : "false" }` )
	// 		.then( res => res.json())
	// 		.then( data => setData( data ))
	// 		.catch( error => console.error( error ));
	// }, [ onlyPriceSensitive, onlyAsx300 ]);

	console.log( onlyPriceSensitive );

	return (
		<div className="body">
			<div className="header">
				<h2>ASX Recent Announcement Feed</h2>
				<p>A scraped collection of ASX announcements from the last 24 hours</p>
			</div>
			<div className="filters">
				<div>
					<label>
						Price sensitive only?
						<input type="checkbox" checked={ onlyPriceSensitive } onClick={ () => setOnlyPriceSensitive( !onlyPriceSensitive ) } />
					</label>
				</div>
				<div>
					<label>
						ASX 300 only?
						<input type="checkbox" checked={ onlyAsx300 } onClick={ () => setOnlyAsx300( !onlyAsx300 ) }/>
					</label>
				</div>
			</div>
			{ !_.isEmpty( data ) ? _.map( data, el => {
				console.log( el );
				return (
					<div className="card">
						<p>Here's some words</p>
					</div>
				);
			}) : 
				<div className="loading">
					<p>Loading</p>
					<FontAwesomeIcon icon={ faSpinner } spin />
				</div> 
			}
		</div>
	);
}
