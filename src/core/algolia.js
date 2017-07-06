import algoliasearch from 'algoliasearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY } from 'configuration';

export default algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
