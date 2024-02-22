const request = require('supertest');
const app = require('../../index'); 

// if they don't work its fine fow now, haven't tested anything
describe('User Authentication and Access', () => {
  let userToken; // To store the JWT token for accessing protected routes
  
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com',
        full_name: 'Test User'
      })
      .expect(200); 

  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        username: 'testuser',
        password: 'password123'
      })
      .expect(200); 
    
    expect(res.body).toHaveProperty('token');
    userToken = res.body.token; 
  });

  it('should access a protected route with the token', async () => {
    const userId = 'someUserId';  // fix this
    const res = await request(app)
      .get(`/api/users/user/${userId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200); 

    expect(res.body).toHaveProperty('id', userId);

  });
});
