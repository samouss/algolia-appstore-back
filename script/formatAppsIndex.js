import fs from 'fs';
import path from 'path';
import { flowRight } from 'lodash';
import { v4 } from 'uuid';

const getRawData = path => {
  try {
    return fs.readFileSync(path);
  } catch (e) {
    throw new Error('File "data.json" is expected to be on root folder.');
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

console.log('DONE.');
