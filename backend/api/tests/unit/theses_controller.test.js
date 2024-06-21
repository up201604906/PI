const thesesController = require('../../src/controllers/theses_controller');
const thesesModel = require('../../src/models/theses_model');

// Mock the theses model
jest.mock('../../src/models/theses_model');

describe('Theses Controller', () => {
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
  });

  describe('getTheses', () => {
    it('should return all theses', async () => {
      const mockTheses = [{ id: 1, title: 'Thesis 1' }, { id: 2, title: 'Thesis 2' }];
      thesesModel.get_theses.mockResolvedValue(mockTheses);

      await thesesController.getTheses(req, res);

      expect(res.json).toHaveBeenCalledWith(mockTheses);
    });

    it('should handle errors', async () => {
      thesesModel.get_theses.mockRejectedValue(new Error('Database error'));

      await thesesController.getTheses(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('getThesisById', () => {
    it('should return a thesis by id', async () => {
      const mockThesis = { id: 1, title: 'Thesis 1' };
      req.params.id = '1';
      thesesModel.get_thesis_by_id.mockResolvedValue(mockThesis);

      await thesesController.getThesisById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockThesis);
    });

    it('should return 404 if thesis not found', async () => {
      req.params.id = '999';
      thesesModel.get_thesis_by_id.mockResolvedValue(null);

      await thesesController.getThesisById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Thesis not found.');
    });
  });

  describe('updateThesis', () => {
    it('should update a thesis successfully', async () => {
      req.params.id = '1';
      req.body = {
        course: 'Course',
        title: 'Updated Thesis',
        mentor: 'Mentor',
        // ... other fields ...
      };
      thesesModel.update_thesis.mockResolvedValue();

      await thesesController.updateThesis(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors when updating a thesis', async () => {
      req.params.id = '1';
      req.body = {
        course: 'Course',
        title: 'Updated Thesis',
        mentor: 'Mentor',
        // ... other fields ...
      };
      thesesModel.update_thesis.mockRejectedValue(new Error('Database error'));

      await thesesController.updateThesis(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('createThesis', () => {
    it('should create a thesis successfully', async () => {
      req.body = {
        course: 'Course',
        title: 'New Thesis',
        mentor: 'Mentor',
        // ... other fields ...
      };
      thesesModel.create_thesis.mockResolvedValue();

      await thesesController.createThesis(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors when creating a thesis', async () => {
      req.body = {
        course: 'Course',
        title: 'New Thesis',
        mentor: 'Mentor',
        // ... other fields ...
      };
      thesesModel.create_thesis.mockRejectedValue(new Error('Database error'));

      await thesesController.createThesis(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('deleteThesisById', () => {
    it('should delete a thesis successfully', async () => {
      req.params.id = '1';
      thesesModel.delete_thesis.mockResolvedValue();

      await thesesController.deleteThesisById(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors when deleting a thesis', async () => {
      req.params.id = '1';
      thesesModel.delete_thesis.mockRejectedValue(new Error('Database error'));

      await thesesController.deleteThesisById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });
});