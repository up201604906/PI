const resourcesController = require('../../src/controllers/resources_controller');
const resourcesModel = require('../../src/models/resources_model');

// Mock the resources model
jest.mock('../../src/models/resources_model');

describe('Resources Controller', () => {
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

  describe('getResources', () => {
    it('should return all resources', async () => {
      const mockResources = [{ id: 1, name: 'Resource 1' }, { id: 2, name: 'Resource 2' }];
      resourcesModel.get_resources.mockResolvedValue(mockResources);

      await resourcesController.getResources(req, res);

      expect(res.json).toHaveBeenCalledWith(mockResources);
    });

    it('should handle errors', async () => {
      resourcesModel.get_resources.mockRejectedValue(new Error('Database error'));

      await resourcesController.getResources(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('getResourceById', () => {
    it('should return resource by ID', async () => {
      const mockResource = { id: 1, name: 'Resource 1' };
      req.params.id = 1;
      resourcesModel.get_resource_by_id.mockResolvedValue(mockResource);

      await resourcesController.getResourceById(req, res);

      expect(res.json).toHaveBeenCalledWith(mockResource);
    });

    it('should return 404 if resource not found', async () => {
      req.params.id = 999;
      resourcesModel.get_resource_by_id.mockResolvedValue(null);

      await resourcesController.getResourceById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Resource not found.');
    });

    it('should handle errors', async () => {
      req.params.id = 1;
      resourcesModel.get_resource_by_id.mockRejectedValue(new Error('Database error'));

      await resourcesController.getResourceById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('getResourceByName', () => {
    it('should return resource by name', async () => {
      const mockResource = { id: 1, name: 'Resource 1' };
      req.params.name = 'Resource 1';
      resourcesModel.get_resource_by_name.mockResolvedValue(mockResource);

      await resourcesController.getResourceByName(req, res);

      expect(res.json).toHaveBeenCalledWith(mockResource);
    });

    it('should return 404 if resource not found', async () => {
      req.params.name = 'Nonexistent Resource';
      resourcesModel.get_resource_by_name.mockResolvedValue(null);

      await resourcesController.getResourceByName(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Resource not found.');
    });

    it('should handle errors', async () => {
      req.params.name = 'Resource 1';
      resourcesModel.get_resource_by_name.mockRejectedValue(new Error('Database error'));

      await resourcesController.getResourceByName(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('createResource', () => {
    it('should create a resource', async () => {
      const mockResourceId = 1;
      const mockResource = {
        name: 'Resource 1',
        description: 'Description 1',
        category: 'Category 1',
        quantity: 10,
        available: true,
        supplier: 'Supplier 1',
        room: 'Room 1',
        cabinet: 'Cabinet 1',
        shelf: 'Shelf 1',
        box: 'Box 1',
        price: 100,
        priority: 1
      };
      req.body = mockResource;
      resourcesModel.doesResourceExist.mockResolvedValue(false);
      resourcesModel.create_resource.mockResolvedValue(mockResourceId);

      await resourcesController.createResource(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true, resource_id: mockResourceId });
    });

    it('should return 409 if resource already exists', async () => {
      const mockResource = {
        name: 'Resource 1',
        description: 'Description 1',
        category: 'Category 1',
        quantity: 10,
        available: true,
        supplier: 'Supplier 1',
        room: 'Room 1',
        cabinet: 'Cabinet 1',
        shelf: 'Shelf 1',
        box: 'Box 1',
        price: 100,
        priority: 1
      };
      req.body = mockResource;
      resourcesModel.doesResourceExist.mockResolvedValue(true);

      await resourcesController.createResource(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.send).toHaveBeenCalledWith('Resource already exists.');
    });

    it('should handle errors', async () => {
      req.body = {
        name: 'Resource 1'
      };
      resourcesModel.doesResourceExist.mockRejectedValue(new Error('Database error'));

      await resourcesController.createResource(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error registering resource.');
    });
  });

  describe('updateResource', () => {
    it('should update a resource', async () => {
      req.params.id = 1;
      req.body = {
        name: 'Updated Resource',
        description: 'Updated Description',
        category: 'Updated Category',
        quantity: 20,
        available: false,
        supplier: 'Updated Supplier',
        room: 'Updated Room',
        cabinet: 'Updated Cabinet',
        shelf: 'Updated Shelf',
        box: 'Updated Box',
        price: 200,
        priority: 2
      };
      resourcesModel.update_resource.mockResolvedValue(true);

      await resourcesController.updateResource(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors', async () => {
      req.params.id = 1;
      req.body = {
        name: 'Updated Resource'
      };
      resourcesModel.update_resource.mockRejectedValue(new Error('Database error'));

      await resourcesController.updateResource(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('deleteResource', () => {
    it('should delete a resource', async () => {
      req.params.id = 1;
      resourcesModel.delete_resource.mockResolvedValue(true);

      await resourcesController.deleteResource(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors', async () => {
      req.params.id = 1;
      resourcesModel.delete_resource.mockRejectedValue(new Error('Database error'));

      await resourcesController.deleteResource(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('deleteResourceByName', () => {
    it('should delete a resource by name', async () => {
      req.params.name = 'Resource 1';
      resourcesModel.delete_resource_by_name.mockResolvedValue(true);

      await resourcesController.deleteResourceByName(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors', async () => {
      req.params.name = 'Resource 1';
      resourcesModel.delete_resource_by_name.mockRejectedValue(new Error('Database error'));

      await resourcesController.deleteResourceByName(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });
});
