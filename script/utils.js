import { flowRight } from 'lodash';

export const formatDataWith = (...args) => data => {
  return data.map(flowRight(...args));
};
