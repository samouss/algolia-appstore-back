jest.mock('configuration', () => ({
  API_VERSION: 1,
  ALGOLIA_APP_ID: 'APP_ID',
  ALGOLIA_API_KEY: 'API_KEY',
  ALGOLIA_APPS_INDEX_NAME: 'indexName',
}), { virtual: true });
