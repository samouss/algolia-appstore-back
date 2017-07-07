import * as model from '../model';
import * as routes from '../routes';

jest.mock('../model', () => ({
  validate: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
}));

const createFakeRequest = x => x;
const createFakeResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
});

describe('apps', () => {
  describe('routes', () => {
    describe('createApp', () => {
      it('expect to create an app', () => {
        expect.assertions(3);

        const body = {
          name: 'My Sample App',
        };

        const objectID = 'SOME_RANDOM_ID';

        const req = createFakeRequest({ body });
        const res = createFakeResponse();

        model.validate.mockImplementationOnce(() => Promise.resolve(body));
        model.create.mockImplementationOnce(() => Promise.resolve(objectID));

        return routes.createApp(req, res).then(() => {
          expect(model.validate).toHaveBeenCalledWith(req.body);
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.json).toHaveBeenCalledWith({ objectID });
        });
      });

      it('expect to not create an app due to validation failure', () => {
        expect.assertions(3);

        const body = {
          name: 'My Sample App',
        };

        const error = {
          name: 'ValidationError',
        };

        const req = createFakeRequest({ body });
        const res = createFakeResponse();

        model.validate.mockImplementationOnce(() => Promise.reject(error));

        return routes.createApp(req, res).then(() => {
          expect(model.validate).toHaveBeenCalledWith(req.body);
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith(error);
        });
      });

      it('expect to not create an app due to creation failure', () => {
        expect.assertions(3);

        const body = {
          name: 'My Sample App',
        };

        const error = {
          name: 'AlgoliaError',
        };

        const req = createFakeRequest({ body });
        const res = createFakeResponse();

        model.validate.mockImplementationOnce(() => Promise.resolve(body));
        model.create.mockImplementationOnce(() => Promise.reject(error));

        return routes.createApp(req, res).then(() => {
          expect(model.validate).toHaveBeenCalledWith(req.body);
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith(error);
        });
      });
    });

    describe('removeApp', () => {
      it('expect to remove an app', () => {
        expect.assertions(2);

        const id = 'SOME_RANDOM_ID';

        const req = createFakeRequest({ params: { id } });
        const res = createFakeResponse();

        model.remove.mockImplementationOnce(() => Promise.resolve());

        return routes.removeApp(req, res).then(() => {
          expect(res.status).toHaveBeenCalledWith(204);
          expect(res.send).toHaveBeenCalled();
        });
      });

      it('expect to not remove an app due to remove failure', () => {
        expect.assertions(2);

        const id = 'SOME_RANDOM_ID';

        const error = {
          name: 'AlgoliaError',
        };

        const req = createFakeRequest({ params: { id } });
        const res = createFakeResponse();

        model.remove.mockImplementationOnce(() => Promise.reject(error));

        return routes.removeApp(req, res).then(() => {
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith(error);
        });
      });
    });
  });
});
