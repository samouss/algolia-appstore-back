import client from 'core/algolia';
import * as model from '../model';

jest.mock('core/algolia', () => ({
  initIndex: jest.fn(),
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
        expect.assertions(2);

        const index = {
          addObject: jest.fn(() => Promise.resolve({
            objectID: 'SOME_RANDOM_ID',
          })),
        };

        const body = {
          name: 'Sample App',
        };

        const expectation = 'SOME_RANDOM_ID';

        return model.create(body, index).then(actual => {
          expect(actual).toBe(expectation);
          expect(index.addObject).toHaveBeenCalledWith(body, 'SOME_RANDOM_ID');
        });
      });
    });

    describe('remove', () => {
      it('expect to return a resolved promise without value', () => {
        expect.assertions(2);

        const index = {
          deleteObject: jest.fn(() => Promise.resolve()),
        };

        const id = 'SOME_RANDOM_ID';

        return model.remove(id, index).then(actual => {
          expect(actual).toBeUndefined();
          expect(index.deleteObject).toHaveBeenCalledWith(id);
        });
      });
    });
  });
});
