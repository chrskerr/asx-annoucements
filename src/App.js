
import React, { useState, useEffect } from "react";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink, InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { CachePersistor, LocalForageWrapper } from "apollo3-cache-persist";
import localforage from "localforage";

const Home = React.lazy(() => import( "./Home" ));

export default function App () {
	const [ client, setClient ] = useState( false );
	useEffect(() => {
		( async () => {
			const cache = new InMemoryCache();

			const newPersistor = new CachePersistor({
				storage: new LocalForageWrapper( localforage ),
				trigger: "write", cache,
			});
			await newPersistor.restore();

			const httpLink = new HttpLink({
				uri: "https://quiet-river-86309.herokuapp.com/v1/graphql",
			});
			
			const wsLink = new WebSocketLink({
				uri: "wss://quiet-river-86309.herokuapp.com/v1/graphql",
				options: {
					reconnect: true,
				},
			});
		
			const link = split(
				({ query }) => {
					const { kind, operation } = getMainDefinition( query );
					return kind === "OperationDefinition" && operation === "subscription";
				},
				wsLink,
				httpLink,
			);

			setClient( new ApolloClient({ link, cache }));
			
		})();
	}, []);

	if ( !client ) return null;

	return (
		<ApolloProvider client={ client }>
			<React.Suspense fallback={ <div></div> }>
				<Home />
			</React.Suspense>
		</ApolloProvider>
	);
}
