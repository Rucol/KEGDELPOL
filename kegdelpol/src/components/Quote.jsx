import React from 'react';
import './Quote.css';

const Quote = ({ quoteText }) => {
  return (
    <p className="quote-text">
      {quoteText}
    </p>
  );
};

export default Quote;