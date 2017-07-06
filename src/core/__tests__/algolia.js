import algoliasearch from 'algoliasearch';
import client from '../algolia';

jest.mock('algoliasearch', () => jest.fn(() => ({
  fakeApi: 'sample',
})));

jest.mock('configuration', () => ({
  ALGOLIA_APP_ID: 'APP_ID',
  ALGOLIA_API_KEY: 'API_KEY',
}));

describe('algolia', () => {
  it('expect to return an instance of algolia client', () => {
    const expectation = {
      fakeApi: 'sample',
    };

    expect(algoliasearch).toHaveBeenCalledWith('APP_ID', 'API_KEY');
    expect(client).toEqual(expectation);
  });
});
