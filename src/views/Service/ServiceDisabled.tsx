import React from 'react';

const ServiceDisabled = () => (
  <div className="flex-container flex-container--align-center not__found ">
    <div className="flex-col flex-col--12">
      <h1 className="not__found--heading">Service not available</h1>
      <p className="body-l">
        This service has been removed from Sutton Information Hub. Please contact{' '}
        <a href="mailto:ia.hub@sutton.gov.uk">ia.hub@sutton.gov.uk</a> for more information.
      </p>
    </div>
  </div>
);

export default ServiceDisabled;
