const articlesController = require('../../src/controllers/articles_controller');
const articlesModel = require('../../src/models/articles_model');

// Mock the articles model
jest.mock('../../src/models/articles_model');

describe('Articles Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      locals: {}
    };
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
  });

  afterEach(() => {
    console.error.mockRestore(); // Restore console.error after each test
  });

  describe('getArticlesByUser', () => {
    it('should return articles for a user', async () => {
      const mockArticles = [{ id: 1, title: 'Test Article' }];
      req.params.id = '1';
      articlesModel.getArticlesByUser.mockResolvedValue(mockArticles);

      await articlesController.getArticlesByUser(req, res);

      expect(res.json).toHaveBeenCalledWith(mockArticles);
    });

    it('should handle errors when fetching articles', async () => {
      req.params.id = '1';
      articlesModel.getArticlesByUser.mockRejectedValue(new Error('Database error'));

      await articlesController.getArticlesByUser(req, res);

      expect(console.error).toHaveBeenCalledWith('Error fetching articles:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  

  // Add more tests for other methods...
});

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
    it('should return a license by id', async () => {
      const mockLicense = { id: 1, description: 'License 1' };
      req.params.id = '1';
      licensesModel.get_license_by_id.mockResolvedValue(mockLicense);

      await licensesController.getLicenseById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockLicense);
    });

    it('should return 404 if license not found', async () => {
      req.params.id = '999';
      licensesModel.get_license_by_id.mockResolvedValue(null);

      await licensesController.getLicenseById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('License not found.');
    });

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

const pcAllocationController = require('../../src/controllers/pcallocation_controller');
const pcAllocationModel = require('../../src/models/pcallocation_model');

// Mock the pcallocation model
jest.mock('../../src/models/pcallocation_model');

describe('PC Allocation Controller', () => {
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

  describe('getPCAllocations', () => {
    it('should return all PC allocations', async () => {
      const mockAllocations = [{ id: 1, user_name: 'User 1' }, { id: 2, user_name: 'User 2' }];
      pcAllocationModel.get_pcallocations.mockResolvedValue(mockAllocations);

      await pcAllocationController.getPCAllocations(req, res);

      expect(res.json).toHaveBeenCalledWith(mockAllocations);
    });

    it('should handle errors', async () => {
      pcAllocationModel.get_pcallocations.mockRejectedValue(new Error('Database error'));

      await pcAllocationController.getPCAllocations(req, res);

      expect(console.error).toHaveBeenCalledWith('Error fetching pc allocations:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('getPCAllocationById', () => {
    it('should return a PC allocation by id', async () => {
      const mockAllocation = { id: 1, user_name: 'User 1' };
      req.params.id = '1';
      pcAllocationModel.get_pcallocation_by_id.mockResolvedValue(mockAllocation);

      await pcAllocationController.getPCAllocationById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockAllocation);
    });

    it('should return 404 if PC allocation not found', async () => {
      req.params.id = '999';
      pcAllocationModel.get_pcallocation_by_id.mockResolvedValue(null);

      await pcAllocationController.getPCAllocationById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('PC Allocation not found.');
    });

    it('should handle errors', async () => {
      req.params.id = '1';
      pcAllocationModel.get_pcallocation_by_id.mockRejectedValue(new Error('Database error'));

      await pcAllocationController.getPCAllocationById(req, res);

      expect(console.error).toHaveBeenCalledWith('Error fetching pc allocation by ID:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('createPCAllocation', () => {
    it('should create a PC allocation successfully', async () => {
      req.body = { user_name: 'User 1', name: 'PC1', serial_number: '123', room: 'Room A' };
      pcAllocationModel.create_pcallocation.mockResolvedValue();

      await pcAllocationController.createPCAllocation(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors when creating a PC allocation', async () => {
      req.body = { user_name: 'User 1', name: 'PC1', serial_number: '123', room: 'Room A' };
      pcAllocationModel.create_pcallocation.mockRejectedValue(new Error('Database error'));

      await pcAllocationController.createPCAllocation(req, res);

      expect(console.error).toHaveBeenCalledWith('Error creating pc allocation:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  // Add more tests for updatePCAllocation and deletePCAllocationById...
});

const projectController = require('../../src/controllers/project_controller');
const projectsModel = require('../../src/models/projects_model');

// Mock the projects model
jest.mock('../../src/models/projects_model');

describe('Project Controller', () => {
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

  describe('createArticle', () => {
    it('should create an article successfully', async () => {
        const mockArticle = { id: 1, title: 'New Article' };
        req.body = {
            title: 'New Article',
            year: 2021,
            type: 'Journal',
            journal: 'Test Journal',
            booktitle: 'Test Booktitle',
            publisher: 'Test Publisher',
            address: 'Test Address',
            pages: '1-10',
            volume: '1',
            number: '1',
            series: 'Test Series',
            month: 'January',
            note: 'Test Note',
            url: 'http://testurl.com',
            doi: '10.1000/testdoi',
            isbn: '123-456-789',
            howpublished: 'Test HowPublished',
            organization: 'Test Organization',
            reference: 'Test Reference',
            abstract: 'Test Abstract',
            keywords: 'Test Keywords',
            cite: 'Test Cite',
            userId: 1,
            authors:'Author',
            editors: 'editor'
        };
        articlesModel.createArticle.mockResolvedValue(mockArticle);

        await articlesController.createArticle(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockArticle);
    });

    it('should handle errors when creating an article', async () => {
        req.body = {
            title: 'New Article',
            year: 2021,
            type: 'Journal',
            journal: 'Test Journal',
            booktitle: 'Test Booktitle',
            publisher: 'Test Publisher',
            address: 'Test Address',
            pages: '1-10',
            volume: '1',
            number: '1',
            series: 'Test Series',
            month: 'January',
            note: 'Test Note',
            url: 'http://testurl.com',
            doi: '10.1000/testdoi',
            isbn: '123-456-789',
            howpublished: 'Test HowPublished',
            organization: 'Test Organization',
            reference: 'Test Reference',
            abstract: 'Test Abstract',
            keywords: 'Test Keywords',
            cite: 'Test Cite',
            userId: 1,
            authors: ['Author 1'],
            editors: ['Editor 1']
        };
        articlesModel.createArticle.mockRejectedValue(new Error('Database error'));

        await articlesController.createArticle(req, res);

        expect(console.error).toHaveBeenCalledWith('Error creating article:', expect.any(Error));
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
});

  describe('getProjectById', () => {
    it('should return a project by id', async () => {
      const mockProject = { id: 1, name: 'Test Project' };
      req.params.id = '1';
      projectsModel.getProjectById.mockResolvedValue(mockProject);
      projectsModel.getTeamMembersByProject.mockResolvedValue([]);
      projectsModel.getAssignmentsByProject.mockResolvedValue([]);
      projectsModel.getSharingCommunicationByProject.mockResolvedValue([]);

      await projectController.getProjectById(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        ...mockProject,
        teamMembers: [],
        assignments: [],
        sharingLinks: []
      }));
    });

    it('should return 404 if project not found', async () => {
      req.params.id = '999';
      projectsModel.getProjectById.mockResolvedValue(null);

      await projectController.getProjectById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Project not found');
    });

    it('should handle errors', async () => {
      req.params.id = '1';
      projectsModel.getProjectById.mockRejectedValue(new Error('Database error'));

      await projectController.getProjectById(req, res);

      expect(console.error).toHaveBeenCalledWith('Error fetching project:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  // Add more tests for other methods...
});
