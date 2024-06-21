const wishlistController = require('../../src/controllers/wishlist_controller');
const wishlistModel = require('../../src/models/wishlist_model');

// Mock the wishlist model
jest.mock('../../src/models/wishlist_model');

describe('Wishlist Controller', () => {
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
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe('getWishlist', () => {
    it('should return wishlist items', async () => {
      const mockWishlist = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
      wishlistModel.get_wishlist.mockResolvedValue(mockWishlist);

      await wishlistController.getWishlist(req, res);

      expect(res.json).toHaveBeenCalledWith(mockWishlist);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      wishlistModel.get_wishlist.mockRejectedValue(new Error(errorMessage));

      await wishlistController.getWishlist(req, res);

      expect(console.error).toHaveBeenCalledWith('Error fetching wishlist:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('deleteResourceFromWishlist', () => {
    it('should delete item from wishlist', async () => {
      req.params = { user_name: 'user1', resource_name: 'resource1', potential_resource_name: 'potential1' };
      wishlistModel.delete_item_from_wishlist.mockResolvedValue(1);

      await wishlistController.deleteResourceFromWishlist(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle deletion failure', async () => {
      req.params = { user_name: 'user1', resource_name: 'resource1', potential_resource_name: 'potential1' };
      wishlistModel.delete_item_from_wishlist.mockResolvedValue(0);

      await wishlistController.deleteResourceFromWishlist(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: false });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      req.params = { user_name: 'user1', resource_name: 'resource1', potential_resource_name: 'potential1' };
      wishlistModel.delete_item_from_wishlist.mockRejectedValue(new Error(errorMessage));

      await wishlistController.deleteResourceFromWishlist(req, res);

      expect(console.error).toHaveBeenCalledWith('Error deleting item from wishlist:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('updateResourceInWishlist', () => {
    it('should update an item in the wishlist', async () => {
      req.params = { user_name: 'user1', resource_name: 'resource1', potential_resource_name: 'potential1' };
      req.body = {
        name: 'Updated Resource',
        description: 'Updated Description',
        category: 'Updated Category',
        supplier: 'Updated Supplier',
        price: 200,
        priority: 2,
        quantity: 5,
        state: 'Updated State'
      };
      wishlistModel.update_item_in_wishlist.mockResolvedValue(1);

      await wishlistController.updateResourceInWishlist(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      req.params = { user_name: 'user1', resource_name: 'resource1', potential_resource_name: 'potential1' };
      req.body = {
        name: 'Updated Resource'
      };
      wishlistModel.update_item_in_wishlist.mockRejectedValue(new Error(errorMessage));

      await wishlistController.updateResourceInWishlist(req, res);

      expect(console.error).toHaveBeenCalledWith('Error updating item in wishlist:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('addResourceToWishlist', () => {
    it('should add an item to the wishlist', async () => {
      req.body = {
        user_name: 'user1',
        resource_name: 'resource1',
        potential_resource_name: 'potential1',
        description: 'Description 1',
        category: 'Category 1',
        supplier: 'Supplier 1',
        price: 100,
        priority: 1,
        quantity: 10
      };
      wishlistModel.add_item_to_wishlist.mockResolvedValue(1);

      await wishlistController.addResourceToWishlist(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      req.body = {
        user_name: 'user1',
        resource_name: 'resource1',
        potential_resource_name: 'potential1',
        description: 'Description 1',
        category: 'Category 1',
        supplier: 'Supplier 1',
        price: 100,
        priority: 1,
        quantity: 10
      };
      wishlistModel.add_item_to_wishlist.mockRejectedValue(new Error(errorMessage));

      await wishlistController.addResourceToWishlist(req, res);

      expect(console.error).toHaveBeenCalledWith('Error adding item to wishlist:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });

  describe('moveToResources', () => {
    it('should move an item to resources', async () => {
      req.body = {
        userName: 'user1',
        resourceName: 'resource1',
        potentialResourceName: 'potential1',
        room: 'Room 1',
        cabinet: 'Cabinet 1',
        shelf: 'Shelf 1',
        box: 'Box 1',
        quantity: 10
      };
      wishlistModel.move_to_resources.mockResolvedValue(1);

      await wishlistController.moveToResources(req, res);

      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      req.body = {
        userName: 'user1',
        resourceName: 'resource1',
        potentialResourceName: 'potential1',
        room: 'Room 1',
        cabinet: 'Cabinet 1',
        shelf: 'Shelf 1',
        box: 'Box 1',
        quantity: 10
      };
      wishlistModel.move_to_resources.mockRejectedValue(new Error(errorMessage));

      await wishlistController.moveToResources(req, res);

      expect(console.error).toHaveBeenCalledWith('Error moving item to resources:', expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Internal Server Error');
    });
  });
});
