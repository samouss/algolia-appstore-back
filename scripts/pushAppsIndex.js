import 'src/env';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import yargs from 'yargs';
import algoliasearch from 'algoliasearch';

const { input } = yargs.argv;

const appId = process.env.ALGOLIA_APP_ID || 'APP_ID';
const apiKey = process.env.ALGOLIA_API_KEY || 'API_KEY';
const appsIndexDesc = 'apps_rating_desc';

// Input validation
if (!input) {
  throw new Error('Argument "input" must be specidied.');
}

if (!fs.existsSync(input)) {
  throw new Error('Argument "input" should be a path to an existing file.');
}

const inputPath = path.resolve(input);
const data = JSON.parse(fs.readFileSync(inputPath));
const client = algoliasearch(appId, apiKey);
const index = client.initIndex(appsIndexDesc);

console.log();
console.log(chalk`{blue > Progress!}`);
console.log(chalk`> Upload of "{bold ${appsIndexDesc}}" begin...`);
console.log();

index.addObjects(data).then(() => {
  console.log();
  console.log(chalk`{green > Success!}`);
  console.log(chalk`> Records of "{bold ${appsIndexDesc}}" will change in couple of seconds.`);
  console.log(`> ${inputPath}`);
  console.log();
}).catch(error => {
  console.log();
  console.log(chalk`{red > Error!}`);
  console.log(chalk`> Oops, an error has occurred during upload of "{bold ${appsIndexDesc}}".`);
  console.log();
  console.log(error);
  console.log();
}).then(() => {
  client.destroy();
});
