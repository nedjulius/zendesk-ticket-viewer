import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {ErrorMessage} from '../error-message';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Header} from './header';
import {TicketsList} from '../tickets-list';
import {Ticket} from '../ticket';
import {NotFound} from '../not-found';
import {Footer} from './footer';
import styles from './app.module.css';

export const App: React.FC = () => (
  <ErrorBoundary FallbackComponent={ErrorMessage}>
    <Router>
      <Header />
      <main className={styles.mainContainer}>
        <Routes>
          <Route path="/" element={<TicketsList />} />
          <Route path="/ticket/:id" element={<Ticket />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  </ErrorBoundary>
);
