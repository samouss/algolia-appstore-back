export const validateSchemaToPromise = (schema, options) => body => {
  return new Promise((resolve, reject) => {
    const { error, value } = schema.validate(body, options);

    if (error) {
      return reject({
        name: error.name,
        details: error.details,
      });
    }

    return resolve(value);
  });
};
