import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { flowRight } from 'lodash';
import { v4 } from 'uuid';
import { APPS_INDEX_NAME } from '../config.json';

const getRawData = path => {
  try {
    return fs.readFileSync(path);
  } catch (error) {
    console.log();
    console.log(chalk`{red Oops, file "data.json" is expected to be in root folder.}`);
    console.log();
    console.log(error);
    console.log();
    process.exit(1);
  }
};

const formatDataWith = (...args) => data => {
  const mapper = flowRight(...args);

  return data.map(mapper);
};

const addObjectIDToRecord = record => ({
  ...record,
  objectID: v4(),
});

const formatter = formatDataWith(
  addObjectIDToRecord,
);

const filePath = path.join(__dirname, '..', 'data.json');
const destPath = path.join(__dirname, '..', 'data_formatted.json');

const initialData = JSON.parse(getRawData(filePath));
const formattedData = formatter(initialData);

fs.writeFileSync(
  destPath,
  JSON.stringify(formattedData, null, 2),
);

console.log();
console.log(chalk`{green JSON file has been formatted for "{bold ${APPS_INDEX_NAME}}" index.}`);
console.log();
