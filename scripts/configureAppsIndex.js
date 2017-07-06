import chalk from 'chalk';
import algoliasearch from 'algoliasearch';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_APPS_INDEX_NAME } from '../config.json';

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_APPS_INDEX_NAME);

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
  console.log(chalk`{green > Success!}`);
  console.log(chalk`> Settings of "{bold ${ALGOLIA_APPS_INDEX_NAME}}" will change in couple of seconds.`);
  console.log();
}).catch(error => {
  console.log();
  console.log(chalk`{red > Error!}`);
  console.log(chalk`> Oops, an error has occurred during configuration of "{bold ${ALGOLIA_APPS_INDEX_NAME}}".`);
  console.log();
  console.log(error);
  console.log();
});
