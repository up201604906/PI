const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller');
const userController = require('../controllers/user_controller')

router.get('/users', userController.getUsersWithProjectTypes);
router.get('/assigned/:userId', projectController.getAssignedProjects);
router.post('/create', projectController.createProject);
router.get("/types", projectController.getProjectTypes);
router.get("/statuses", projectController.getProjectStatuses);
router.get('/', projectController.getAllAProjects);
router.get('/:id', projectController.getProjectById);
router.get('/recent/:limit', projectController.getRecentProjects);


router.put('/assignments/:id', projectController.updateAssignment);
router.delete('/assignments/:id', projectController.deleteAssignment);
router.put('/sharingLinks/:id', projectController.updateSharingLink);
router.delete('/sharingLinks/:id', projectController.deleteSharingLink);
router.delete('/teamMembers/:id', projectController.removeTeamMember);
router.post('/assignments', projectController.createAssignment);
router.post('/sharingLinks', projectController.createSharingLink);
router.post('/teamMembers', projectController.createTeamMember);




module.exports = router;
