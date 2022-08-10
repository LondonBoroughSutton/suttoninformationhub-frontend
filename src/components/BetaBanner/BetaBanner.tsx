import React from 'react';

import './BetaBanner.scss';

const BetaBanner: React.FunctionComponent = () => {
  return (
    <div className="beta-banner">
      <p>
        The site is in Public Beta.{' '}
        <a
          href={`https://docs.google.com/forms/d/e/1FAIpQLSfEdZWKC0kz1ht6qLRO1SGDWAmK2HzvAl7O-SxPzN9f7pzBOg/viewform`}
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          aria-label="Use our Google Form if you find bug or issue"
        >
          Use our Google Form if you find bug or issue
        </a>{' '}
        whilst using the website.
      </p>
    </div>
  );
};

export default BetaBanner;
