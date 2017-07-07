import client from 'core/algolia';
import * as model from '../model';

jest.mock('core/algolia', () => ({
  handleError: jest.fn(),
  initIndex: jest.fn(),
  destroy: jest.fn(),
}));

jest.mock('configuration', () => ({
  ALGOLIA_APPS_INDEX_NAME: 'indexName',
}));

jest.mock('uuid', () => ({
  v4: () => 'SOME_RANDOM_ID',
}));

describe('apps', () => {
  describe('model', () => {
    it('expect to call initIndex', () => {
      expect(client.initIndex).toHaveBeenCalledWith('indexName');
    });

    describe('create', () => {
      it('expect to return a resolved promise with created objectID', () => {
        expect.assertions(3);

        const body = {
          name: 'Sample App',
        };

        const index = {
          addObject: jest.fn(() => Promise.resolve({
            objectID: 'SOME_RANDOM_ID',
          })),
        };

        const expectation = 'SOME_RANDOM_ID';

        return model.create(body, index).then(actual => {
          expect(actual).toBe(expectation);
          expect(client.destroy).toHaveBeenCalledTimes(1);
          expect(index.addObject).toHaveBeenCalledWith(body, 'SOME_RANDOM_ID');

          client.destroy.mockClear();
        });
      });

      it('expect to return a rejected promise with error', () => {
        expect.assertions(3);

        const body = {
          name: 'Sample App',
        };

        const error = {
          name: 'AlgoliaUnknownError',
          message: 'Oops, an error has occurred',
        };

        const index = {
          addObject: jest.fn(() => Promise.reject(error)),
        };

        const expectation = {
          name: 'AlgoliaError',
          details: error,
        };

        client.handleError.mockImplementationOnce(() => Promise.reject(expectation));

        return model.create(body, index).catch(actual => {
          expect(actual).toEqual(expectation);
          expect(client.handleError).toHaveBeenCalledWith(client, error);
          expect(index.addObject).toHaveBeenCalledWith(body, 'SOME_RANDOM_ID');

          client.handleError.mockClear();
        });
      });
    });

    describe('remove', () => {
      it('expect to return a resolved promise without value', () => {
        expect.assertions(3);

        const index = {
          deleteObject: jest.fn(() => Promise.resolve()),
        };

        const id = 'SOME_RANDOM_ID';

        return model.remove(id, index).then(actual => {
          expect(actual).toBeUndefined();
          expect(client.destroy).toHaveBeenCalledTimes(1);
          expect(index.deleteObject).toHaveBeenCalledWith(id);

          client.destroy.mockClear();
        });
      });

      it('expect to return a rejected promise with error', () => {
        expect.assertions(3);

        const id = 'SOME_RANDOM_ID';

        const error = {
          name: 'AlgoliaUnknownError',
          message: 'Oops, an error has occurred',
        };

        const index = {
          deleteObject: jest.fn(() => Promise.reject(error)),
        };

        const expectation = {
          name: 'AlgoliaError',
          details: error,
        };

        client.handleError.mockImplementationOnce(() => Promise.reject(expectation));

        return model.remove(id, index).catch(actual => {
          expect(actual).toEqual(expectation);
          expect(client.handleError).toHaveBeenCalledWith(client, error);
          expect(index.deleteObject).toHaveBeenCalledWith(id);

          client.destroy.mockClear();
        });
      });
    });
  });
});
