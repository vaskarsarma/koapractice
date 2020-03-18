const request = require('supertest');
const server = require('../app');

beforeAll(async() => {
    console.log('Jest Starting');
});

afterAll(() => {
    server.close();
    console.log('Server Closed');
});

describe('basic route tests', () => {
    test('Test Get route', async() => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toContain(`Hello Vaskar Sarma!`);
    });
});

describe("dogs test", () => {
    test(`Get all the dog name`, async() => {
        const response = await request(server).get('/dogs');
        expect(response.status).toEqual(200);
        expect(response.text).toContain(`affenpinscher`);
    })
})

describe("failed dogs test", () => {
    test(`if failed to retieve dog name`, async() => {
        const response = await request(server).get('/dogs');
        if (response.status != 200) {
            expect(response.text).toContain(`error`);
        }
    })
})

describe("employee test", () => {
    test(`Get all the employee name`, async() => {
        const response = await request(server).get('/employee');
        expect(response.status).toEqual(200);
        expect(response.text).toContain(`Vaskar Sarma`);
    })
})

describe("employee add test", () => {
    test(`Test POST API`, async() => {
        const response = await request(server).post('/employee/add').send({ 'empname': 'Vaskar Sarma' });
        expect(response.status).toEqual(200);
        expect(response.text).toContain(`Vaskar Sarma`);
    })
})