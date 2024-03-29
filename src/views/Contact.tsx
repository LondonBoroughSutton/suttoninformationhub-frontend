import React from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';

// import { formatContactNumber } from '../helpers';
import CMSStore from '../stores/CMSStore';
import CMSPage from '../components/CMSPageLayout';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  cmsStore: CMSStore;
}

const Contact: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  // const facebookHandle = cmsStore?.global?.facebook_handle;
  // const twitterHandle = cmsStore?.global?.twitter_handle;

  return (
    <CMSPage title={get(cmsStore, 'contact.title')} twoColumn={true} breadcrumb="Contact">
      <Helmet>
        <title>Contact | Sutton Information Hub</title>
      </Helmet>

      <div className="flex-col flex-col--7 flex-col--tablet--12">
        <ReactMarkdown className="markdown" children={get(cmsStore, 'contact.content')} />
      </div>
      <div className="flex-col flex-col--3 flex-col--tablet--6">
        {/* <div className="cms--contact-card">
          <h2>Contact</h2>
          <div className="cms--contact-card--row">
            <h3 className="h5">
              <FontAwesomeIcon icon="phone-alt" /> Telephone
            </h3>
            <p className="">
              <a href={`tel:${get(cmsStore, 'global.contact_phone')}`}>
                {formatContactNumber(get(cmsStore, 'global.contact_phone'))}
              </a>
            </p>
          </div>
          <div className="cms--contact-card--row">
            <h3 className="h5">
              <FontAwesomeIcon icon="at" /> Email
            </h3>
            <a
              className="cms--contact-card--email"
              href={`mailto:${get(cmsStore, 'global.contact_email')}`}
            >
              {get(cmsStore, 'global.contact_email')}
            </a>
          </div>
          <div className="flex-col flex-col--12 cms--contact-card--socials service__contact-card--row">
            {facebookHandle !== '#' && (
              <a
                href={`https://facebook.com/${facebookHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                aria-label="Link to Sutton Information Hub Facebook"
              >
                <FontAwesomeIcon icon={['fab', 'facebook']} className="service__social-icon" />
              </a>
            )}
            {twitterHandle !== '#' && (
              <a
                href={`https://twitter.com/${twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                aria-label="Link to Sutton Information Hub Twitter"
              >
                <FontAwesomeIcon icon={['fab', 'twitter']} className="service__social-icon" />
              </a>
            )}
          </div>
        </div> */}
      </div>
    </CMSPage>
  );
};

export default inject('cmsStore')(observer(Contact));
