import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import map from 'lodash/map';
import { withRouter, RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchStore from '../../stores/searchStore';

import './Search.scss';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import WindowSizeStore from '../../stores/windowSizeStore';
import CMSStore from '../../stores/CMSStore';

interface IProps extends RouteComponentProps {
  windowSizeStore?: WindowSizeStore;
  cmsStore?: CMSStore;
}

@inject('windowSizeStore', 'cmsStore')
@observer
class Search extends React.Component<IProps> {
  componentWillUnmount() {
    SearchStore.clear();
  }

  render() {
    const { windowSizeStore, cmsStore, history } = this.props;

    // injected stores must be typed as optional, but will always be there if injected. Allows workound for destructuring values from store
    if (!windowSizeStore || !cmsStore) {
      return null;
    }

    const { isMobile } = windowSizeStore;

    let options: any = [{ value: '', text: 'Select category' }];
    let covidOptions: any = [{ value: '', text: 'Select category' }];

    options = [
      ...options,
      ...map(SearchStore.categories, ({ name, id }) => ({ value: id, text: name })),
    ];
    covidOptions = [
      ...covidOptions,
      ...map(SearchStore.covidCategories, ({ name, id }) => ({ value: id, text: name })),
    ];

    return (
      <Fragment>
        <section className="search__container">
          <div className="flex-container flex-container--justify">
            <div className="flex--col--12 search__container__inner">
              <div className="flex-container flex-container--align-center flex-container--no-padding search__input--row">
                {cmsStore.home?.search_title && (
                  <h2 className="search__heading">{cmsStore.home.search_title}</h2>
                )}
                <form className="search__container__form">
                  <div className="flex-col flex-col--mobile--12">
                    <label
                      className="sr-only"
                      htmlFor="search"
                      aria-label="Search for services, groups and activities"
                    >
                      Search for services, groups and activities
                    </label>
                    <Input
                      placeholder="Search for services, groups and activities"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        SearchStore.onChange(e, 'search')
                      }
                      className="search__filter-keyword__input"
                      id="search"
                      value={SearchStore.search}
                    />
                  </div>
                  <div className="search__filter-location">
                    <label
                      className="search__filter-location__label"
                      htmlFor="location"
                      aria-label="Location"
                    >
                      in
                    </label>
                    <Input
                      id="location"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        SearchStore.onChange(e, 'postcode')
                      }
                      className="search__filter-location__input"
                      placeholder="Postcode or town"
                      value={SearchStore.postcode}
                    />
                  </div>
                  {isMobile && (
                    <Fragment>
                      <p className="search__category-subtitle">
                        {get(cmsStore, 'home.categories_title')}
                      </p>
                      <Select
                        options={options}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          if (e.target.value !== '') {
                            SearchStore.setCategory(e);
                            history.push({
                              pathname: '/results',
                              search: `?category=${e.target.value}`,
                            });
                          }
                        }}
                        className="search__category--mobile"
                        placeholder="Category List"
                        id="category"
                      />
                    </Fragment>
                  )}
                  <div className="flex-col flex-col--mobile--12">
                    <Button
                      text="Search"
                      icon="search"
                      type="submit"
                      onClick={(e: React.FormEvent) => {
                        e.preventDefault();
                        history.push({
                          pathname: '/results',
                          search: `?query=${SearchStore.search}&postcode=${SearchStore.postcode}`,
                        });
                      }}
                    />
                  </div>
                </form>
              </div>
              {!!SearchStore.covidCategories.length && (
                <div className="flex-col flex-col--12">
                  <Fragment>
                    <label className="search__heading" htmlFor="category">
                      <h2>
                        COVID-19 <FontAwesomeIcon icon="virus" />
                      </h2>
                    </label>
                    <div className="flex-col--6 flex-col--mobile--12">
                      <p className="search__category-subtitle">
                        Find up to date information and support in Sutton to help you take care of
                        yourself and your community.
                      </p>
                    </div>

                    {isMobile && (
                      <Fragment>
                        <Select
                          options={covidOptions}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            if (e.target.value !== '') {
                              SearchStore.setCategory(e);
                              history.push({
                                pathname: '/results',
                                search: `?category=${e.target.value}`,
                              });
                            }
                          }}
                          className="search__category--mobile"
                          placeholder="Category List"
                          id="category"
                        />
                      </Fragment>
                    )}
                  </Fragment>
                </div>
              )}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(Search);
