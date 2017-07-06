import chalk from 'chalk';
import algoliasearch from 'algoliasearch';
import { APP_ID, API_KEY, APPS_INDEX_NAME } from '../config.json';

const client = algoliasearch(APP_ID, API_KEY);
const index = client.initIndex(APPS_INDEX_NAME);

index.setSettings({
  searchableAttributes: [
    'name',
  ],
  attributesForFaceting: [
    'filterOnly(category)',
    'filterOnly(rating)',
  ],
  customRanking: [
    'desc(rating)',
    'desc(ratingCount)',
  ],
  attributesToHighlight: [
    'name',
  ],
}).then(() => {
  console.log();
  console.log(chalk`{green A change for the settings of {bold ${APPS_INDEX_NAME}} has been registered...}`);
  console.log();
}).catch(error => {
  console.log();
  console.log(chalk`{red Oops, an error has occurred during configuration of {bold ${APPS_INDEX_NAME}} index.}`);
  console.log();
  console.log(error);
  console.log();
});
