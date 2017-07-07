import 'src/env';
import chalk from 'chalk';
import algoliasearch from 'algoliasearch';

const appId = process.env.ALGOLIA_APP_ID || 'APP_ID';
const apiKey = process.env.ALGOLIA_API_KEY || 'API_KEY';
const indexName = 'apps';

const client = algoliasearch(appId, apiKey);
const index = client.initIndex(indexName);

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
  console.log(chalk`> Settings of "{bold ${indexName}}" will change in couple of seconds.`);
  console.log();
}).catch(error => {
  console.log();
  console.log(chalk`{red > Error!}`);
  console.log(chalk`> Oops, an error has occurred during configuration of "{bold ${indexName}}".`);
  console.log();
  console.log(error);
  console.log();
}).then(() => {
  client.destroy();
});
