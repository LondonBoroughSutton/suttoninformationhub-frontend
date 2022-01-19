import React from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import get from 'lodash/get';

import { membersAreaURL } from '../../config/externalUrls';

import './Footer.scss';

import Logo from '../../assets/logo/logo-footer.png';

import CMSStore from '../../stores/CMSStore';
import UIStore from '../../stores/uiStore';
import ButtonLink from '../Button/ButtonLink';
interface IProps {
  mobileMenu?: boolean;
  cmsStore?: CMSStore;
  uiStore?: UIStore;
}

const Footer: React.FunctionComponent<IProps> = ({ mobileMenu, cmsStore, uiStore }) => {
  if (!uiStore || !cmsStore) {
    return null;
  }

  return (
    <footer
      className={cx('footer', {
        'footer-mobile-menu': mobileMenu,
      })}
    >
      <div className="flex-container footer--inner-container">
        <div className="flex-col flex-col--5 flex-col--tablet--12">
          <p className="footer__heading">{get(cmsStore, 'global.footer_title')}</p>
          <ReactMarkdown
            className="body footer__content"
            children={get(cmsStore, 'global.footer_content')}
          />
          <Link to="/privacy-policy" className="body">
            Privacy Policy
          </Link>
          &nbsp;&nbsp;
          <Link to="/terms-and-conditions" className="body">
            Terms and Conditions
          </Link>
        </div>
        <div className="flex-col flex-col--6 flex-col--tablet--12 footer__section">
          <div className="flex-container flex-container--no-padding">
            <div className="flex-col flex-col--5 flex-col--mobile--12">
              <p className="footer__heading">
                Get in touch with <br />
                <span className="highlight">Help Yourself</span> Sutton
              </p>
              <nav className="footer__social-links" role="menu" aria-label="Social Media Links">
                <a
                  href={`https://facebook.com/${get(cmsStore, 'global.facebook_handle')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  aria-label="Link to Help Yourself Sutton Facebook"
                >
                  <FontAwesomeIcon icon={['fab', 'facebook-f']} className="footer__social-icons" />
                </a>
                <a
                  href={`https://twitter.com/${get(cmsStore, 'global.twitter_handle')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                  aria-label="Link to Help Yourself Sutton Twitter"
                >
                  <FontAwesomeIcon icon={['fab', 'twitter']} className="footer__social-icons" />
                </a>
              </nav>
              <div className="flex-col flex-col--12">
                <Link to={'/contact'} className="body footer-contact-links">
                  Contact us
                </Link>
                <button
                  className="body footer-contact-links"
                  onClick={() => uiStore.toggleFeedbackModal()}
                >
                  Give feedback
                </button>
              </div>
            </div>

            <div className="flex-col flex-col--6 flex-col--mobile--12 flex-col--tablet--12 footer__button">
              <ButtonLink href={membersAreaURL} text="Members Area" target="_blank" />
              <img src={Logo} alt="London Borough of Sutton" className="footer-logo" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default inject('cmsStore', 'uiStore')(observer(Footer));
