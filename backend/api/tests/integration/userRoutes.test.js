const request = require('supertest');
const { app, server } = require('../../index');

describe('User Authentication and Access', () => {
  afterAll((done) => {
    server.close(done);
  });

  let userToken; // To store the JWT token for accessing protected routes
  let userId; // To store the user ID for protected route access

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        confPass: 'password123',
        permission: 'student'
      })
      .expect(200);

    expect(res.body).toHaveProperty('user_id');
    userId = res.body.user_id; // Store user ID for later use
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    userToken = res.body.token;
  });

  it('should access a protected route with the token', async () => {
    const res = await request(app)
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', userId);
  });
});
