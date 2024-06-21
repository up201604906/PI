const userController = require('../../src/controllers/user_controller');
const userModel = require('../../src/models/user_model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Mock the user model and other dependencies
jest.mock('../../src/models/user_model');
jest.mock('argon2');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    next = jest.fn();
  });

  describe('signup', () => {
    it('should create a new user successfully', async () => {
      req.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        permission: 'user'
      };
      userModel.doesUserExist.mockResolvedValue(false);
      argon2.hash.mockResolvedValue('hashedPassword');
      userModel.create_user.mockResolvedValue(1);

      await userController.signup(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true, user_id: 1 });
    });

    it('should return 409 if user already exists', async () => {
      req.body = {
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'password123',
        permission: 'user'
      };
      userModel.doesUserExist.mockResolvedValue(true);

      await userController.signup(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.send).toHaveBeenCalledWith("Name or email already exists.");
    });
  });

  describe('login', () => {
    it('should login successfully with correct credentials', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };
      const mockUser = { id: 1, name: 'Test User', password: 'hashedPassword', permission: 'user' };
      userModel.get_user_by_email.mockResolvedValue(mockUser);
      argon2.verify.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockedToken');

      await userController.login(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'mockedToken',
        user: 1,
        permission: 'user'
      });
    });

    it('should return 404 if user not found', async () => {
      req.body = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };
      userModel.get_user_by_email.mockResolvedValue(null);

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("Login failed! User not found.");
    });

    it('should return 401 for invalid credentials', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };
      const mockUser = { id: 1, name: 'Test User', password: 'hashedPassword', permission: 'user' };
      userModel.get_user_by_email.mockResolvedValue(mockUser);
      argon2.verify.mockResolvedValue(false);

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith("Invalid credentials.");
    });
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
      userModel.get_all_users.mockResolvedValue(mockUsers);

      await userController.getUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should return 404 if no users found', async () => {
      userModel.get_all_users.mockResolvedValue(null);

      await userController.getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("No users found.");
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      req.params.id = '1';
      const mockUser = { id: 1, name: 'Test User' };
      userModel.get_user_by_id.mockResolvedValue(mockUser);

      await userController.getUserById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 if user not found', async () => {
      req.params.id = '999';
      userModel.get_user_by_id.mockResolvedValue(null);

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("User not found.");
    });
  });

  // Add more tests for other routes (getUserAreas, updateUser, deleteUser) following the same pattern
});