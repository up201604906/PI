const projectsModel = require('../models/projects_model');

const getAssignedProjects = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10); // Ensure userId is an integer
        if (isNaN(userId)) {
            res.status(400).send("Invalid user ID");
            return;
        }
        const projects = await projectsModel.getProjectsByUser(userId);
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getProjectById = async (req, res) => {
    try {
        const projectId = parseInt(req.params.id, 10); // Ensure projectId is an integer
        if (isNaN(projectId)) {
            res.status(400).send("Invalid project ID");
            return;
        }
        const project = await projectsModel.getProjectById(projectId);
        if (!project) {
            res.status(404).send("Project not found");
            return;
        }
        res.json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).send("Internal Server Error");
    }
};

const createProject = async (req, res) => {
    try {
        const projectData = req.body;
        if (!projectData.userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const project = await projectsModel.createProject(projectData);
        await projectsModel.associateUserWithProject(project.id, projectData.userId);
        res.status(201).json(project);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

module.exports = {
    getAssignedProjects,
    getProjectById,
    createProject
};
