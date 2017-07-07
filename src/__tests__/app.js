import supertest from 'supertest';
import * as model from 'apps/model';
import app from '../app';

jest.mock('apps/model', () => ({
  validate: jest.fn(),
  create: jest.fn(),
  remove: jest.fn(),
}));

describe('app', () => {
  describe('/apps', () => {
    describe('POST - /', () => {
      it('expect to return a success response', () => {
        expect.assertions(2);

        const body = {
          category: 'Games',
          rating: 3,
        };

        const expectation = {
          objectID: 'SOME_RANDOM_ID',
        };

        model.validate.mockImplementationOnce(body => Promise.resolve(body));
        model.create.mockImplementationOnce(() => Promise.resolve('SOME_RANDOM_ID'));

        return supertest(app)
          .post('/api/1/apps')
          .send(body)
          .set('Accept', 'application/json')
          .then(res => {
            expect(res.status).toBe(201);
            expect(res.body).toEqual(expectation);
          });
      });

      it('expect to return a fail response', () => {
        expect.assertions(2);

        const body = {
          category: 'Games',
          rating: 3,
        };

        const error = {
          name: 'AlgoliaError',
          message: 'Oops, an error has occurred',
        };

        model.validate.mockImplementationOnce(() => Promise.reject(error));

        return supertest(app)
          .post('/api/1/apps')
          .send(body)
          .set('Accept', 'application/json')
          .then(res => {
            expect(res.status).toBe(400);
            expect(res.body).toEqual(error);
          });
      });
    });

    describe('DELETE - /:id', () => {
      it('expect to return a success response', () => {
        expect.assertions(1);

        const id = 'SOME_RANDOM_ID';

        model.remove.mockImplementationOnce(() => Promise.resolve());

        return supertest(app)
          .delete(`/api/1/apps/${id}`)
          .set('Accept', 'application/json')
          .then(res => {
            expect(res.status).toBe(204);
          });
      });

      it('expect to return a fail response', () => {
        expect.assertions(2);

        const id = 'SOME_RANDOM_ID';

        const error = {
          name: 'AlgoliaError',
          message: 'Oops, an error has occurred',
        };

        model.remove.mockImplementationOnce(() => Promise.reject(error));

        return supertest(app)
          .delete(`/api/1/apps/${id}`)
          .set('Accept', 'application/json')
          .then(res => {
            expect(res.status).toBe(400);
            expect(res.body).toEqual(error);
          });
      });
    });
  });
});
