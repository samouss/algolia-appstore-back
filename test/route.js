export const createFakeRequest = x => x;

export const createFakeResponse = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
});
