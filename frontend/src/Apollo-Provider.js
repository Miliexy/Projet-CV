import React from 'react'
import App from './App'
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
import {createUploadLink } from 'apollo-upload-client'

const httpLink = createUploadLink({
    uri: 'http://localhost:5000/graphql'
})

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return{
        //link: createUploadLink(httpLink),
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    //link: createUploadLink(),
    cache: new InMemoryCache()
})



export default(
    <ApolloProvider client = {client}>
        <App/>
    </ApolloProvider>
)