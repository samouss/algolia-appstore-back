import algoliasearch from 'algoliasearch';

const appId = process.env.ALGOLIA_APP_ID || 'APP_ID';
const apiKey = process.env.ALGOLIA_API_KEY || 'API_KEY';

export const handleError = (client, error) => {
  client.destroy();

  return Promise.reject({
    name: 'AlgoliaError',
    details: error,
  });
};

export default algoliasearch(appId, apiKey);
