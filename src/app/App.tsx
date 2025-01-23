import React from 'react';
import { createUseStyles } from 'react-jss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LayoutProvider } from '../contexts';
import { Nav, Spinner } from '../components';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { ListPage, Home } from '../screens';

function App() {
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <LayoutProvider>
        <div className={classes.root}>
          <BrowserRouter>
            <Nav />
            <main className={classes.content}>
              <React.Suspense fallback={<Spinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pokemon" element={<ListPage />} />
                  <Route path="/pokemon/:id" element={<ListPage />} />
                </Routes>
              </React.Suspense>
            </main>
          </BrowserRouter>
        </div>
      </LayoutProvider>
    </ApolloProvider>
  );
}

const useStyles = createUseStyles({
  root: {
    background: '#171E2b',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '20px',  // Added for better content spacing
  }
}, { name: 'App' });

export default App;
