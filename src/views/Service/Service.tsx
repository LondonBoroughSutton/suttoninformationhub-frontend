import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';
import take from 'lodash/take';
import ReactSVG from 'react-svg';
import ReactMarkdown from 'react-markdown';

import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player';

import { apiBase } from '../../config/api';

import './Service.scss';

import { ILocation, IService } from '../../types/types';
import ServiceStore from '../../stores/serviceStore';
import Button from '../../components/Button';
import Link from '../../components/Link';

import AgeGroup from '../../assets/images/icons/who-is-this-for/age-group.svg';
import Disability from '../../assets/images/icons/who-is-this-for/disability.svg';
import Employment from '../../assets/images/icons/who-is-this-for/employment.svg';
import Gender from '../../assets/images/icons/who-is-this-for/gender.svg';
import Housing from '../../assets/images/icons/who-is-this-for/housing.svg';
import Income from '../../assets/images/icons/who-is-this-for/income.svg';
import Language from '../../assets/images/icons/who-is-this-for/language.svg';
import Other from '../../assets/images/icons/who-is-this-for/other.svg';

import WheelchairAccessible from '../../assets/images/icons/accessibility/wheelchair-accessible.svg';
import InductionLoop from '../../assets/images/icons/accessibility/induction-loop.svg';
import CriteriaCard from './CriteriaCard';
import Accordian from '../../components/Accordian';
interface RouteParams {
  service: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  serviceStore: ServiceStore;
}

class Service extends Component<IProps> {
  componentDidMount() {
    const { serviceStore, match } = this.props;

    serviceStore.fetchService(match.params.service);
  }

  render() {
    const { serviceStore } = this.props;
    const { service, locations, relatedServices } = serviceStore;

    if (!service) {
      return <div>Service not found</div>;
    }

    return (
      <main>
        <div className={`service__header service__header--${get(service, 'type')}`}>
          <div className="flex-col flex-col--mobile--9">
            <h1>{get(service, 'name')}</h1>
            <p className="service__header__last-updated">
              Page last updated <span>{format(new Date(service!.updated_at), 'do LLLL yyyy')}</span>
              <Button text="Give feedback" icon="comment" alt={true} size="small" />
            </p>
          </div>
          <div className="flex-col flex-col--mobile--3">
            <div className="service__header__logo">
              <img
                src={`${apiBase}/organisations/${get(service, 'organisation.id')}/logo.png?v=${get(
                  service,
                  'organisation.id'
                )}`}
                alt={`${service.name} logo`}
              />
            </div>
          </div>
        </div>
        <section className="flex-container service__info">
          <section className="flex-col flex-col--8 flex-col--mobile--12">
            <div className="flex-container flex-container--align-center flex-container--mobile-no-padding">
              <div className="flex-col flex-col--mobile--12 service__criteria">
                <h2>Who is it for?</h2>
              </div>
              <div className="service__section">
                {get(service, 'criteria.age_group') && (
                  <CriteriaCard
                    svg={AgeGroup}
                    title="Age Group"
                    info={get(service, 'criteria.age_group')}
                  />
                )}

                {get(service, 'criteria.disability') && (
                  <CriteriaCard
                    svg={Disability}
                    title="Disability"
                    info={get(service, 'criteria.disability')}
                  />
                )}

                {get(service, 'criteria.employment') && (
                  <CriteriaCard
                    svg={Employment}
                    title="Employment Status"
                    info={get(service, 'criteria.employment')}
                  />
                )}

                {get(service, 'criteria.gender') && (
                  <CriteriaCard
                    svg={Gender}
                    title="Gender"
                    info={get(service, 'criteria.gender')}
                  />
                )}

                {get(service, 'criteria.housing') && (
                  <CriteriaCard
                    svg={Housing}
                    title="Housing"
                    info={get(service, 'criteria.housing')}
                  />
                )}

                {get(service, 'criteria.income') && (
                  <CriteriaCard
                    svg={Income}
                    title="Income"
                    info={get(service, 'criteria.income')}
                  />
                )}

                {get(service, 'criteria.language') && (
                  <CriteriaCard
                    svg={Language}
                    title="Language"
                    info={get(service, 'criteria.language')}
                  />
                )}

                {get(service, 'criteria.other') && (
                  <CriteriaCard svg={Other} title="Other" info={get(service, 'criteria.other')} />
                )}
              </div>
            </div>

            <div className="flex-container flex-container--align-center">
              <div className="flex-col flex-col--mobile--12">
                <h3>{`What is this ${get(service, 'type')}?`}</h3>
              </div>
              {!!service.gallery_items.length && <div className="service__section">IMAGES</div>}
              <div className="flex-col flex-col--mobile--12 service__section">
                {service.video_embed && (
                  <ReactPlayer
                    url={service.video_embed}
                    width={'100%'}
                    style={{ borderRadius: '19px' }}
                    light={true}
                  />
                )}
              </div>
            </div>

            <div className="flex-container flex-container--align-center">
              <div className="flex-col flex-col--mobile--12 service__section">
                <ReactMarkdown source={service.intro} className="service__markdown" />
              </div>
              <div className="flex-col flex-col--mobile--12">
                <h4>What do we offer?</h4>
              </div>

              <div className="flex-col flex-col--mobile--12">
                {map(service.offerings, (offering: any, i) => (
                  <Fragment key={offering.offering}>
                    <span>{offering.offering}</span>
                    {i < service.offerings.length - 1 ? (
                      <FontAwesomeIcon
                        icon="circle"
                        style={{ fontSize: 8, verticalAlign: 'middle', margin: '0 4px' }}
                      />
                    ) : null}
                  </Fragment>
                ))}
              </div>
              <div className="flex-col flex-col--mobile--12 service__section">
                <ReactMarkdown source={service.description} className="service__markdown" />
              </div>
            </div>

            {service.referral_method !== 'none' && (
              <div className="flex-container flex-container--align-center flex-container--justify flex-container--mobile-no-padding service__referral">
                <Button text="Make a connection" icon="arrow-right" />
                <p className="service__refer-disclaimer">
                  <FontAwesomeIcon icon="info-circle" /> It can take up to 2 weeks to recieve a
                  reply
                </p>
              </div>
            )}

            <Accordian
              title={`How can I contact this ${service.type}?`}
              className="service__accordian"
            >
              <h2>{`How can I contact this ${service.type}?`}</h2>

              <div className="service__section">
                <div>
                  <p>
                    <FontAwesomeIcon icon="globe" /> Website
                  </p>
                  <p>{service.url}</p>
                </div>
                <div>
                  <p>
                    <FontAwesomeIcon icon="phone" /> Telephone
                  </p>
                  <p>{service.contact_phone}</p>
                </div>
                <div>
                  <p>
                    <FontAwesomeIcon icon="envelope" /> Telephone
                  </p>
                  <p>{service.contact_email}</p>
                </div>
                <div>
                  {find(service.social_medias, { type: 'facebook' }) && (
                    <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                  )}
                  {find(service.social_medias, { type: 'twitter' }) && (
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                  )}
                  {find(service.social_medias, { type: 'intstagram' }) && (
                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                  )}
                  {find(service.social_medias, { type: 'instagram' }) && (
                    <FontAwesomeIcon icon={['fab', 'youtube']} />
                  )}
                </div>
              </div>
            </Accordian>

            {service.testimonial && (
              <Accordian title="What people say" className="service__accordian">
                <p>{get(service, 'testimonial')}</p>
              </Accordian>
            )}

            <Accordian title="Where can I access it?" className="service__accordian">
              <div className="service__location">
                {locations.map((location: ILocation) => (
                  <div key={location.id}>
                    {location.has_image && (
                      <img
                        src={`${apiBase}/service-locations/${location.id}/image.png`}
                        alt={`${get(location, 'location.address_line_1')}`}
                      />
                    )}
                    <p> {get(location, 'location.address_line_1')}</p>
                    <p>{`${get(location, 'location.address_line_2')}, ${get(
                      location,
                      'location.postcode'
                    )}`}</p>
                    {get(location, 'location.has_wheelchair_access') && (
                      <ReactSVG src={WheelchairAccessible} />
                    )}
                    {get(location, 'location.has_induction_loop') && (
                      <ReactSVG src={InductionLoop} />
                    )}

                    {/* OPENING TIMES */}

                    <Link
                      icon="map"
                      text="View on Google Maps"
                      size="medium"
                      href=""
                      iconPosition="right"
                    />
                    <Link
                      icon="map-signs"
                      text="View on Google Maps"
                      size="medium"
                      href=""
                      iconPosition="right"
                    />
                  </div>
                ))}
              </div>
            </Accordian>

            <Accordian title="Good to know" className="service__accordian">
              {service.useful_infos.map((info: any) => (
                <div key={info.title}>
                  <p>{info.title}</p>
                  <p>{info.description}</p>
                </div>
              ))}
            </Accordian>

            <Accordian title={`Who runs this ${service.type}?`} className="service__accordian">
              <div className="service__section">
                <div>
                  {get(service, 'organisation.name')}
                  {get(service, 'organisation.has_logo') && (
                    <img
                      src={`${apiBase}/organisations/${service.organisation_id}/logo.png?v=${service.updated_at}`}
                      alt={`${get(service, 'organisation.name')} Logo`}
                    />
                  )}
                </div>
              </div>
            </Accordian>

            <div className="flex-container service__button-container">
              <Button text="Print" icon="print" alt={true} />
              <Button
                text={serviceStore.favourite ? 'In your favourites' : 'Add to favourites'}
                icon="star"
                alt={true}
                onClick={() => serviceStore.addToFavourites()}
                disabled={serviceStore.favourite}
              />
            </div>
          </section>

          {/* <section className="flex-col flex-col--4  flex-col--mobile--12">
            <div className="body--l service__info__cost service__section">
              <div className="body--l service__info__cost--left">
                <FontAwesomeIcon icon="pound-sign" className="service__info__cost--icon" />
                <p className="service__info__cost--sub-heading">Cost</p>
              </div>
              <div className="service__info__cost--right">
                <p className="service__info__cost--header">{service.is_free ? 'Free' : 'Cost'}</p>
                <p>
                  {service.fees_text ? service.fees_text : `This ${service.type} costs no money`}
                </p>
                {service.fees_url && <a href={service.fees_url}>Further Pricing Details</a>}
              </div>
            </div>
            <div className="service__section">
              {service.video_embed && (
                <ReactPlayer
                  url={service.video_embed}
                  width={'100%'}
                  style={{ borderRadius: '19px' }}
                  light={true}
                />
              )}
            </div>

            <div className="service__section">
              <Button text="Print" icon="print" alt={true} />
              <Button
                text={serviceStore.favourite ? 'In your favourites' : 'Add to favourites'}
                icon="star"
                alt={true}
                onClick={() => serviceStore.addToFavourites()}
                disabled={serviceStore.favourite}
              />
            </div>

            <div className="service__section">
              Share page to social media
              {/* TODO */}
          {/* </div> */}
          {/* </section>  */}
        </section>
        {relatedServices && (
          <section className="service__related-services">
            <h2>Related Services</h2>
            {take(relatedServices, 3).map((service: IService) => (
              <p>{service.name}</p>
            ))}
          </section>
        )}
      </main>
    );
  }
}

export default inject('serviceStore')(observer(Service));
