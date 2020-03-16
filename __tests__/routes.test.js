const request = require('supertest');
const server = require('../app');

beforeAll(async () => {
    console.log('Jest Starting');
});

afterAll(() => {
    server.close();
    console.log('Server Closed');
});

describe('basic route tests', () => {
    test('Test Get route', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toContain(`Hello Vaskar Sarma!`);
    });
});