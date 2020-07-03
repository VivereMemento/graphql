import React from 'react';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import {  ApolloProvider } from 'react-apollo';
import Movies from './components/movies.component';
import logo from './logo.svg';
import './App.css';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
    link,
    cache,
});

function App() {
  return (
      <ApolloProvider client={client}>
          <Movies />
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                      Edit <code>src/App.js</code> and save to reload.
                  </p>
                  <a
                      className="App-link"
                      href="https://reactjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      Learn React
                  </a>
              </header>
          </div>
      </ApolloProvider>
  );
}

export default App;
