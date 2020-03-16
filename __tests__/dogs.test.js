const request = require('supertest');
const server = require('../app');

describe("dogs test", ()=>
{
    test(`Get all th dog name`, async()=>{
        const response = await request(server).get('/dogs');
        expect(response.status).toEqual(200);
        expect(response.text).toContain(`affenpinscher`);
    })
})