import 'src/env';
import chalk from 'chalk';
import algoliasearch from 'algoliasearch';

const appId = process.env.ALGOLIA_APP_ID || 'APP_ID';
const apiKey = process.env.ALGOLIA_API_KEY || 'API_KEY';
const appsIndexDesc = 'apps_rating_desc';

const client = algoliasearch(appId, apiKey);

client.deleteIndex(appsIndexDesc).then(() => {
  console.log();
  console.log(chalk`{green > Success!}`);
  console.log(chalk`> Index "{bold ${appsIndexDesc}}" will be deleted in couple of seconds.`);
  console.log();
}).catch(error => {
  console.log();
  console.log(chalk`{red > Error!}`);
  console.log(chalk`> Oops, an error has occurred during the deletion of "{bold ${appsIndexDesc}}".`);
  console.log();
  console.log(error);
  console.log();
}).then(() => {
  client.destroy();
});
