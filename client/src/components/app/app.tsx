import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Header} from './header';
import {TicketsList} from '../tickets-list';
import {NotFound} from '../not-found';
import {Footer} from './footer';
import styles from './app.module.css';

export const App: React.FC = () => (
  <>
    <Header />
    <main className={styles.mainContainer}>
      <Router>
        <Routes>
          <Route path="/" element={<TicketsList />} />
          <Route path="/ticket/:id" element={<h1>Ticket id.</h1>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </main>
    <Footer />
  </>
);
