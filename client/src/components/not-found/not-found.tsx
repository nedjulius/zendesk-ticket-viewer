import React from 'react';
import {Link} from 'react-router-dom';

export const NotFound: React.FC = () => (
  <>
    <h1>Page not found!</h1>
    <Link to="/">Return home</Link>
  </>
);
