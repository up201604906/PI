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
      pcAllocationModel.create_pcallocation.mockRejectedValue();

      await pcAllocationController.createPCAllocation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  // Add more tests for updatePCAllocation and deletePCAllocationById...
});