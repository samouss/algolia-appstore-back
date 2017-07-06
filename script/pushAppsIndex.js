import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import yargs from 'yargs';
import algoliasearch from 'algoliasearch';
import { APP_ID, API_KEY, APPS_INDEX_NAME } from '../config.json';

const { input } = yargs.argv;

// Input validation
if (!input) {
  throw new Error('Argument "input" must be specidied.');
}

if (!fs.existsSync(input)) {
  throw new Error('Argument "input" should be a path to an existing file.');
}

const inputPath = path.resolve(input);
const data = JSON.parse(fs.readFileSync(inputPath));
const client = algoliasearch(APP_ID, API_KEY);
const index = client.initIndex(APPS_INDEX_NAME);

console.log();
console.log(chalk`{blue > Progress!}`);
console.log(chalk`> Upload of "{bold ${APPS_INDEX_NAME}}" begin...`);
console.log();

index.addObjects(data).then(() => {
  console.log();
  console.log(chalk`{green > Success!}`);
  console.log(chalk`> Records of "{bold ${APPS_INDEX_NAME}}" will change in couple of seconds.`);
  console.log(`> ${inputPath}`);
  console.log();
}).catch(error => {
  console.log();
  console.log(chalk`{red > Error!}`);
  console.log(chalk`> Oops, an error has occurred during upload of "{bold ${APPS_INDEX_NAME}}".`);
  console.log();
  console.log(error);
  console.log();
});
