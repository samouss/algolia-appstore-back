import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import yargs from 'yargs';
import { v4 } from 'uuid';
import { formatDataWith } from './utils';
import { APPS_INDEX_NAME } from '../config.json';

const { input, output } = yargs.argv;

// Input validation
if (!input) {
  throw new Error('Argument "input" must be specidied.');
}

if (!fs.existsSync(input)) {
  throw new Error('Argument "input" should be a path to an existing file.');
}

// Output validation
if (!output) {
  throw new Error('Argument "output" must be specidied.');
}

const addObjectIDToRecord = record => ({
  ...record,
  objectID: v4(),
});

const formatter = formatDataWith(
  addObjectIDToRecord,
);

const inputPath = path.resolve(input);
const outputPath = path.resolve(output);
const initialData = JSON.parse(fs.readFileSync(inputPath));
const formattedData = formatter(initialData);

fs.writeFileSync(
  outputPath,
  JSON.stringify(formattedData, null, 2),
);

console.log();
console.log(chalk`{green > Success!}`);
console.log(chalk`> The JSON file for "{bold ${APPS_INDEX_NAME}}" has correctly be generated:`);
console.log(`> ${outputPath}`);
console.log();
