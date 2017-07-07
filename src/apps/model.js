import Joi from 'joi';
import { v4 } from 'uuid';
import { ALGOLIA_APPS_INDEX_NAME } from 'configuration';
import { validateSchemaToPromise } from 'core/validation';
import client, { handleError } from 'core/algolia';

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

export const create = (body, idx = index) => {
  return idx.addObject(body, v4())
    .then(pending => {
      client.destroy();

      return pending.objectID;
    })
    .catch(error => handleError(client, error));
};

export const remove = (id, idx = index) => {
  return idx.deleteObject(id)
    .then(() => {
      client.destroy();
    })
    .catch(error => handleError(client, error));
};
