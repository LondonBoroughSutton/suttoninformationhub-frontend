import React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { apiBase } from '../../config/api';
import Breadcrumb from '../../components/Breadcrumb';
import pageIllo from '../../assets/images/mother-and-son-walking.svg';
import ButtonLink from '../../components/Button/ButtonLink';
import data from "../../components/RecursiveUl/file-structure";
import UnorderedList from "../../components/RecursiveUl";

import { IPage } from '../../types/types';

import './InformationPage.scss';

function InformationPage(props: any) {
  const getImg = (pageId: string) => {
    return `${apiBase}/pages/${pageId}/image.png?max_dimension=900`;
  };

  return (
    <div className="information-page">
      <Helmet>
        {props.content.title && <title>{`${props.content.title} | Sutton Information Hub`}</title>}
        {!props.content.title && <title>Information Page | Sutton Information Hub</title>}
      </Helmet>
      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          {
            text: props.content.parent.title ? props.content.parent.title : 'Information Page',
            url: '/' + props.content.parent.id,
          },
          { text: props.content.title ? props.content.title : 'Information Page', url: '' },
        ]}
      />
      <section className="information-page__overview">
        <div className="flex-container">
          <div className="cms--contact-card">
            <div className="flex-container flex-container--no-padding">
              <div className="flex-col flex-col--8 landing-page__intro">
                {props.content.title && (
                   <h1 className="information-page__heading">{props.content.title}</h1>
                 
                )}
                {props.content.excerpt && (
                  <ReactMarkdown
                    children={props.content.excerpt}
                    className="information-page__content"
                  />
                )}
              </div>

              <div className="flex-col flex-col--4 landing-page__image">
                <div className='parent-page-image'>
                  {props.content.parent.image && (
                    <img
                      alt={props.content.parent.title ? props.content.parent.title : ''}
                      className="image"
                      src={getImg(props.content.parent.id)}
                    />
                  )}
                  {props.content.parent.title && (
                    <Link to={`/${props.content.parent.id}`} className='parent-title'>{props.content.parent.title}</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-container">
          <div className="flex-col flex-col--8 landing-page__intro">
            {props.content.image && (
              <img
                alt={props.content.title ? props.content.title : ''}
                className="article-image"
                src={getImg(props.content.id)}
              />
            )}
            {props.content.content.introduction.copy && (
              <div>
                <ReactMarkdown
                  data-content='main'
                  children={props.content.content.introduction.copy[0]}
                  className="information-page__content markdown"
                />
              </div>
            )}

            {props.content.children.filter((child: IPage) => child.enabled).length > 0 && (
              <div>
                <h2 className="information-page__sub-heading">In this topic</h2>
                <div className="information-page__pages button__excerpt--peach">
                  {props.content.children
                    .filter((child: IPage) => child.enabled)
                    .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
                    .map((page: { id: string; title: string; icon: IconName; excerpt: string }) => {
                      return (
                        <ButtonLink
                          href={'/' + page.id}
                          text={page.title}
                          key={page.id}
                          category={true}
                          icon={page.icon}
                          excerpt={{
                            isExcerpt: true,
                            text: page.excerpt
                          }}
                        />
                      );
                    })}
                </div>
              </div>
            )}
          </div>
          <div className="flex-col flex-col--4">
            <div className="information-page__sitemap">
              {props.content.parent.title && (
                <div className='parent-title'>{props.content.parent.title}</div>
              )}
              <div className='list-recursive__wrapper'>
                {data.children.map(list => (
                  <UnorderedList key={list.id} list={list} />
                ))}
              </div>
              <Link to={`/${props.content.parent.id}`} className='information-page__sitemap__link'>
                <FontAwesomeIcon icon='arrow-left' className='button__icon' />
                Return to {props.content.parent.title}
              </Link>  
            </div>  
          </div>  
        </div>
        <div className="flex-container">
          <div className="flex-col flex-col--12 information-page__more">
            {pageIllo && (
              <div className="flex-col">
                <img
                  alt="Mum and child walking together"
                  className="information-page__illustration"
                  src={pageIllo}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default InformationPage;
