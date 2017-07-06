import * as validation from '../validation';

describe('validation', () => {
  describe('validateSchemaToPromise', () => {
    it('expect to return a promise resolved with value', () => {
      expect.assertions(2);

      const value = {
        name: 'John',
        age: 21,
      };

      const options = {
        abortEarly: false,
      };

      const schema = {
        validate: jest.fn(() => ({
          error: null,
          value,
        })),
      };

      const expectation = {
        name: 'John',
        age: 21,
      };

      const validator = validation.validateSchemaToPromise(
        schema,
        options,
      );

      return validator(value).then(actual => {
        expect(schema.validate).toHaveBeenCalledWith(value, options);
        expect(actual).toEqual(expectation);
      });
    });

    it('expect to return a promise rejected with error', () => {
      expect.assertions(2);

      const value = {
        name: 'John',
        age: 21,
      };

      const options = {
        abortEarly: false,
      };

      const error = {
        name: 'ValidationError',
        details: ['detail1', 'detail2'],
      };

      const schema = {
        validate: jest.fn(() => ({
          error,
          value,
        })),
      };

      const expectation = {
        name: 'ValidationError',
        details: ['detail1', 'detail2'],
      };

      const validator = validation.validateSchemaToPromise(
        schema,
        options,
      );

      return validator(value).catch(actual => {
        expect(schema.validate).toHaveBeenCalledWith(value, options);
        expect(actual).toEqual(expectation);
      });
    });
  });
});
