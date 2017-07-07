import algoliasearch from 'algoliasearch';
import client, * as module from '../algolia';

jest.mock('algoliasearch', () => jest.fn(() => ({
  fakeApi: 'sample',
})));

jest.mock('configuration', () => ({
  ALGOLIA_APP_ID: 'APP_ID',
  ALGOLIA_API_KEY: 'API_KEY',
}));

describe('algolia', () => {
  describe('singleton', () => {
    it('expect to return an instance of algolia client', () => {
      const expectation = {
        fakeApi: 'sample',
      };

      expect(algoliasearch).toHaveBeenCalledWith('APP_ID', 'API_KEY');
      expect(client).toEqual(expectation);
    });
  });

  describe('handleError', () => {
    it('expect to close the client and return normalize error', () => {
      expect.assertions(2);

      const client = {
        destroy: jest.fn(),
      };

      const error = {
        name: 'AlgoliaUnknownError',
        message: 'Oops, an error has occured',
      };

      const expectation = {
        name: 'AlgoliaError',
        details: error,
      };

      return module.handleError(client, error).catch(actual => {
        expect(actual).toEqual(expectation);
        expect(client.destroy).toHaveBeenCalled();
      });
    });
  });
});
