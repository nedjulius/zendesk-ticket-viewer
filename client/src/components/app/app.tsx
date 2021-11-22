import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Header} from './header';
import {TicketsList} from '../tickets-list';
import {Ticket} from '../ticket';
import {NotFound} from '../not-found';
import {Footer} from './footer';
import styles from './app.module.css';

export const App: React.FC = () => (
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
);
