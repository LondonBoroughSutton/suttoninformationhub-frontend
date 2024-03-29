import { IServiceLocation, IService } from '../types/types';
import get from 'lodash/get';
import { apiBase } from '../config/api';

export const queryRegex = (key: string) => new RegExp('([?&])' + key + '=.*?(&|$)', 'i');

export const querySeparator = (query: string) => (query.includes('?') ? '&' : '?');

export const getLocationName = (locations: IServiceLocation[]) =>
  locations.map((location: IServiceLocation) =>
    location.name ? location.name : get(location, 'location.address_line_1', '')
  );

export const removeQuotesRegex = new RegExp(/^["']|["']$|["]/, 'g');

export const capitalise = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Used to get the image path where there is a fallback image
 * @param pageId
 * @param max_dimension
 * @returns
 */
export const getImg = (pageId: string, max_dimension = 900) =>
  `${apiBase}/pages/${pageId}/image.png?max_dimension=${max_dimension}`;

/**
 * Used to get image path, where it first checks whether the image exists before returning the path
 * @param pageId
 * @param max_dimension
 * @returns
 */
export const getResolvedImg = (pageId: string, max_dimension = 900) =>
  new Promise((resolve) => {
    const path = `${apiBase}/pages/${pageId}/image.png?max_dimension=${max_dimension}`;
    const http = new XMLHttpRequest();

    http.open('HEAD', path, false);
    http.send();

    http.status !== 404 ? resolve(path) : resolve(null);
  });

export const getServiceImg = (service: IService) => {
  if (service.has_logo) {
    return `${apiBase}/services/${service.id}/logo.png?`;
  } else {
    if (get(service, 'organisation_id'))
      return `${apiBase}/organisations/${get(service, 'organisation_id')}/logo.png?v=${get(
        service,
        'organisation_id'
      )}`;
    if (get(service, 'organisation.id'))
      return `${apiBase}/organisations/${get(service, 'organisation.id')}/logo.png?v=${get(
        service,
        'organisation.id'
      )}`;
    return '';
  }
};
