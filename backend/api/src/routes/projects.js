const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller');
const userController = require('../controllers/user_controller');
const auth = require('../middlewares/auth');

router.put('/:id', projectController.updateProject);
router.get('/users',auth, userController.getUsersWithProjectTypes);
router.get('/assigned/:userId',auth, projectController.getAssignedProjects);
router.post('/create', auth, projectController.createProject);
router.get("/types", auth, projectController.getProjectTypes);
router.get("/statuses",auth, projectController.getProjectStatuses);
router.get('/', projectController.getAllAProjects);
router.get('/:id', auth,projectController.getProjectById);
router.get('/recent/:limit',auth, projectController.getRecentProjects);

router.put('/assignments/:id',auth, projectController.updateAssignment);
router.delete('/assignments/:id',auth, projectController.deleteAssignment);
router.put('/sharingLinks/:id',auth, projectController.updateSharingLink);
router.delete('/sharingLinks/:id',auth, projectController.deleteSharingLink);
router.delete('/teamMembers/:id',auth, projectController.removeTeamMember);
router.post('/assignments',auth, projectController.createAssignment);
router.post('/sharingLinks',auth, projectController.createSharingLink);
router.post('/teamMembers',auth, projectController.createTeamMember);
router.delete('/:id',auth, projectController.deleteProject);



module.exports = router;
