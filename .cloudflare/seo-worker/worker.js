'use strict';

/**
 * Cloudflare Worker script to render SEO meta data into main pages
 * Ref: https://developers.cloudflare.com/workers/
 * See ticket https://app.shortcut.com/helpyourselfsutton/story/942/frontend-deployment-seo-friendly-route
 */

import render from './server';

// Fetch event listener
addEventListener('fetch', (event) => {
  try {
    return event.respondWith(handleRequest(event));
  } catch (e) {
    return event.respondWith(new Response('Error thrown ' + e.message));
  }
});

async function handleRequest(event) {
  const request = event.request;
  const url = new URL(request.url);

  // Check if this is an asset request
  const assetRegex = /(?:\/static\/)+|(?:\.png)+|(?:\.jpg)+|(?:\.svg)+|(?:\.ico)+/g;
  if (url.pathname.search(assetRegex) !== -1) {
    // Development workaround
    // return await fetch(
    //   new URL(`https://staging.suttoninformationhub.org.uk${url.pathname}${url.search}`).toString()
    // );
    // Return response via fetch. This will be cached by Cloudflare
    return fetch(request);
  }

  // Construct the cache key from the cache URL
  const cacheKey = new Request(url.toString(), request);
  const cache = caches.default;

  // Check whether the value is already available in the cache
  // if not, you will need to fetch it from origin, and store it in the cache
  // for future access
  let response = await cache.match(cacheKey);

  if (!response) {
    console.log(
      `Response for request url: ${request.url} not present in cache. Fetching and caching request.`
    );
    // If not in cache, get it from origin
    response = await render(request);

    // Must use Response constructor to inherit all of response's fields
    response = new Response(response.body, response);

    // Cache API respects Cache-Control headers. Setting s-max-age to 10
    // will limit the response to be in cache for 10 seconds max

    // Any changes made to the response here will be reflected in the cached value
    response.headers.append('Cache-Control', 's-maxage=86400');

    // Store the fetched response as cacheKey
    // Use waitUntil so you can return the response without blocking on
    // writing to cache
    event.waitUntil(cache.put(cacheKey, response.clone()));
  } else {
    console.log(`Cache hit for: ${request.url}.`);
  }
  return response;
}
