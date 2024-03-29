import React from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import find from 'lodash/find';
import size from 'lodash/size';

import { formatContactNumber } from '../../../helpers';

import './ContactCard.scss';

import { IOrganisation, IService } from '../../../types/types';

interface IProps {
  service: IService;
  accordian?: boolean;
  organisation?: IOrganisation | null;
}

const getSocialUrl = (socialObj: any) => socialObj.url;

const ContactCard: React.FunctionComponent<IProps> = ({ service, accordian, organisation }) => (
  <div
    className={cx(
      'flex-container flex-container--align-center flex-container--mobile-no-padding service__section',
      {
        'service__accordian-inner service__contact-card--accordian': accordian,
        'service__contact-card': !accordian,
      }
    )}
  >
    {service.url && (
      <div className={cx('flex-col flex-col--12 service__accordian--no-overflow')}>
        <h3
          className={cx({
            'service__contact-card--row': !accordian,
          })}
        >
          <FontAwesomeIcon icon="globe" /> Website
        </h3>
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${service.name} website`}
        >
          {service.url}
        </a>
      </div>
    )}
    {service.contact_phone && (
      <div className="flex-col flex-col--12 service__accordian--no-overflow">
        <h3
          className={cx({
            'service__contact-card--row': !accordian,
          })}
        >
          <FontAwesomeIcon icon="phone" /> Telephone
        </h3>
        <a href={`tel:${service.contact_phone}`}>{formatContactNumber(service.contact_phone)}</a>
      </div>
    )}
    {service.contact_email && (
      <div className="flex-col flex-col--12 service__accordian--no-overflow">
        <h3
          className={cx({
            'service__contact-card--row': !accordian,
          })}
        >
          <FontAwesomeIcon icon="envelope" /> Email
        </h3>
        <a
          href={`mailto:${service.contact_email}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Email ${service.name}`}
        >
          {service.contact_email}
        </a>
      </div>
    )}
    {organisation && !!size(organisation.social_medias) && (
      <div
        className={cx('flex-col flex-col--12 service__social-icon-container', {
          'service__contact-card--row': !accordian,
        })}
      >
        {find(organisation.social_medias, { type: 'facebook' }) && (
          <a
            href={getSocialUrl(find(organisation.social_medias, { type: 'facebook' }))}
            aria-label={`Link to ${organisation.name} Facebook`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', 'facebook-f']} className="service__social-icon" />
          </a>
        )}
        {find(organisation.social_medias, { type: 'twitter' }) && (
          <a
            href={getSocialUrl(find(organisation.social_medias, { type: 'twitter' }))}
            aria-label={`Link to ${organisation.name} Twitter`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', 'twitter']} className="service__social-icon" />
          </a>
        )}
        {find(organisation.social_medias, { type: 'instagram' }) && (
          <a
            href={getSocialUrl(find(organisation.social_medias, { type: 'instagram' }))}
            aria-label={`Link to ${organisation.name} Instagram`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', 'instagram']} className="service__social-icon" />
          </a>
        )}
        {find(organisation.social_medias, { type: 'youtube' }) && (
          <a
            href={getSocialUrl(find(organisation.social_medias, { type: 'youtube' }))}
            aria-label={`Link to ${organisation.name} Youtube`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={['fab', 'youtube']} className="service__social-icon" />
          </a>
        )}
        {find(organisation.social_medias, { type: 'other' }) && (
          <a
            href={getSocialUrl(find(organisation.social_medias, { type: 'other' }))}
            aria-label={`Link to ${organisation.name} other`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon="link" className="service__social-icon" />
          </a>
        )}
      </div>
    )}
  </div>
);

export default ContactCard;
