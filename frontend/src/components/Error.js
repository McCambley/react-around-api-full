import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <section className="error">
      <h1 className="error__header">Oops!</h1>
      <h2 className="error__paragraph">Looks like the page you're looking for doesn't exist.</h2>
      <Link to="/" className="error__link">
        Back home
      </Link>
    </section>
  );
}
