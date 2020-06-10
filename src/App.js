
import React from "react";
import Home from "./Home";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";

export default function App () {

	const httpLink = new HttpLink({
		uri: "https://quiet-river-86309.herokuapp.com/v1/graphql",
	});
    
	const wsLink = new WebSocketLink({
		uri: "wss://quiet-river-86309.herokuapp.com/v1/graphql",
		options: {
			reconnect: true,
			timeout: 30000,
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

	const client = new ApolloClient({
		link,
		cache: new InMemoryCache(),
	});

	return (
		<ApolloProvider client={ client }>
			<Home />
		</ApolloProvider>
	);
}
