import algoliasearch from 'algoliasearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY } from 'configuration';

export const handleError = (client, error) => {
  client.destroy();

  return Promise.reject({
    name: 'AlgoliaError',
    details: error,
  });
};

export default algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
