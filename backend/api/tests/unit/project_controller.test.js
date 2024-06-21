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
  });

  describe('createProject', () => {
    it('should create a project successfully', async () => {
      const mockProject = { id: 1, name: 'Test Project' };
      req.body = { user_id: 1, name: 'Test Project' };
      projectsModel.createProject.mockResolvedValue(mockProject);
      projectsModel.associateUserWithProject.mockResolvedValue();

      await projectController.createProject(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProject);
    });

    it('should handle errors when creating a project', async () => {
      req.body = { user_id: 1, name: 'Test Project' };
      projectsModel.createProject.mockRejectedValue(new Error('Database error'));

      await projectController.createProject(req, res);

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
  });

  // Add more tests for other methods...
});