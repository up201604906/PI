const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller');

router.get('/assigned/:userId', projectController.getAssignedProjects);

router.post('/create', projectController.createProject);
router.get("/types", projectController.getProjectTypes);
router.get("/statuses", projectController.getProjectStatuses);
router.get('/', projectController.getAllAProjects);
router.get('/:id', projectController.getProjectById);


module.exports = router;
