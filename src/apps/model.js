import Joi from 'joi';
import { v4 } from 'uuid';
import { ALGOLIA_APPS_INDEX_NAME } from 'configuration';
import client from 'core/algolia';
import { validateSchemaToPromise } from 'core/validation';

const index = client.initIndex(ALGOLIA_APPS_INDEX_NAME);

const schema = Joi.object({
  category: Joi.string().required(),
  rating: Joi.number().min(0).max(5).required(),
  name: Joi.string().required(),
  image: Joi.string().uri().required(),
  link: Joi.string().uri().required(),
  ratingCount: Joi.number().min(0).required(),
  price: Joi.string().required(),
});

export const validate = validateSchemaToPromise(schema, {
  abortEarly: false,
});

export const create = body => {
  return index.addObject(body, v4()).then(pending => pending.objectID);
};
