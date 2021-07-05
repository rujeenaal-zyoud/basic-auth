
'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server.js');
const request = supergoose(server);

let users = {
    username: 'Rujeena',
    password: '12345123',
};

describe('Basic Auth testing', () => {
    it('Can successfully siginup up and create a new user ', async () => {
        let users = {
            username: 'Rujeena',
            password: '12345123',
        };
        const response = await request.post('/signup').send(users);

        expect(response.status).toBe(200);
        expect(response.body.username).toEqual(users.username);
    });
})
it('Can successfully signin to login as a user (use basic auth)', async () => {
    let users = {
        username: 'Rujeena',
        password: '12345123',
    };
    const response = await request.post('/signin').auth(users.username, users.password);

    expect(response.status).toBe(200);
    expect(response.body.username).toEqual(users.username);
    expect(response.body.password.length).toBeGreaterThan(0);



});



describe('Having missing', () => {


it('Should return 403 status when the username  is not correct', async() => {

    let credentials = {
      username: 'hadell',
      password: '123',
    };
    const response = await request.post('/signin').auth(credentials.username,credentials.password);

    expect(response.status).toBe(403);

  });

  it('Should return 403 status when password is missing', async() => {

    let credentials = {
      username: 'Tamara',
    };
    const response = await request.post('/signup').send(credentials);
 
    expect(response.status).toBe(403);

  }); 
});