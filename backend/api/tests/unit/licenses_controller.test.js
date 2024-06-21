const licensesController = require('../../src/controllers/licenses_controller');
const licensesModel = require('../../src/models/licenses_model');

// Mock the licenses model
jest.mock('../../src/models/licenses_model');

describe('Licenses Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error after each test
  });

  describe('getLicenses', () => {
    it('should return all licenses', async () => {
      const mockLicenses = [{ id: 1, description: 'License 1' }, { id: 2, description: 'License 2' }];
      licensesModel.get_licenses.mockResolvedValue(mockLicenses);

      await licensesController.getLicenses(req, res);

      expect(res.json).toHaveBeenCalledWith(mockLicenses);
    });

    it('should handle errors', async () => {
      licensesModel.get_licenses.mockRejectedValue(new Error('Database error'));

      await licensesController.getLicenses(req, res);

      expect(console.error).toHaveBeenCalledWith('Error fetching licenses:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('getLicenseById', () => {
    it('should handle errors', async () => {
      req.params.id = '1';
      licensesModel.get_license_by_id.mockRejectedValue(new Error('Database error'));

      await licensesController.getLicenseById(req, res);

      expect(console.error).toHaveBeenCalledWith('Error fetching license by ID:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('createLicense', () => {
    it('should create a license successfully', async () => {
      req.body = { description: 'New License', equipment: 'Equipment', login: 'user', password: 'pass' };
      licensesModel.create_license.mockResolvedValue();

      await licensesController.createLicense(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors when creating a license', async () => {
      req.body = { description: 'New License', equipment: 'Equipment', login: 'user', password: 'pass' };
      licensesModel.create_license.mockRejectedValue(new Error('Database error'));

      await licensesController.createLicense(req, res);

      expect(console.error).toHaveBeenCalledWith('Error creating license:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  // Add more tests for updateLicense and deleteLicenseById...
});
