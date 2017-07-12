import 'src/env';
import chalk from 'chalk';
import algoliasearch from 'algoliasearch';

const appId = process.env.ALGOLIA_APP_ID || 'APP_ID';
const apiKey = process.env.ALGOLIA_API_KEY || 'API_KEY';
const appsIndexDesc = 'apps_rating_desc';
const appsIndexAsc = 'apps_rating_asc';

const client = algoliasearch(appId, apiKey);
const indexDesc = client.initIndex(appsIndexDesc);

indexDesc.setSettings({
  replicas: [
    'apps_rating_asc',
  ],
}).then(() => {
  return indexDesc.setSettings({
    searchableAttributes: [
      'name',
    ],
    attributesForFaceting: [
      'category',
      'rating',
    ],
    customRanking: [
      'desc(rating)',
      'desc(ratingCount)',
    ],
    attributesToHighlight: [
      'name',
    ],
  }, {
    forwardToReplicas: true,
  });
}).then(() => {
  const indexAsc = client.initIndex(appsIndexAsc);

  return indexAsc.setSettings({
    customRanking: [
      'asc(rating)',
      'desc(ratingCount)',
    ],
  });
}).then(() => {
  console.log();
  console.log(chalk`{green > Success!}`);
  console.log(chalk`> Settings of "{bold ${appsIndexDesc}}" will change in couple of seconds.`);
  console.log();
}).catch(error => {
  console.log();
  console.log(chalk`{red > Error!}`);
  console.log(chalk`> Oops, an error has occurred during configuration of "{bold ${appsIndexDesc}}".`);
  console.log();
  console.log(error);
  console.log();
}).then(() => {
  client.destroy();
});
