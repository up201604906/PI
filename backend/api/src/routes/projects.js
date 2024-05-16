const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller');

router.get('/assigned/:userId', projectController.getAssignedProjects);


router.get('/:id', projectController.getProjectById);
router.post('/create', projectController.createProject);

module.exports = router;
