const projectsModel = require('../models/projects_model');

// Create a new project
const createProject = async (req, res) => {
    const { user_id, ...projectData } = req.body;
    try {
        const project = await projectsModel.createProject({ ...projectData, created_by: user_id });
        await projectsModel.associateUserWithProject(project.id, user_id);
        res.status(201).json(project);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).send("Internal Server Error");
    }
};


// Get a project by ID
const getProjectById = async (req, res) => {
    const projectId = req.params.id;
    try {
        const project = await projectsModel.getProjectById(projectId);
        if (!project) {
            res.status(404).send("Project not found");
            return;
        }

        // Fetch related data
        const teamMembers = await projectsModel.getTeamMembersByProject(projectId);
        const assignments = await projectsModel.getAssignmentsByProject(projectId);
        const sharingLinks = await projectsModel.getSharingCommunicationByProject(projectId);

        // Add related data to project object
        project.teamMembers = teamMembers;
        project.assignments = assignments;
        project.sharingLinks = sharingLinks;

        res.json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Get all project types
const getProjectTypes = async (req, res) => {
    try {
        const types = await projectsModel.getProjectTypes();
        res.json(types);
    } catch (error) {
        console.error("Error fetching project types:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Get all project statuses
const getProjectStatuses = async (req, res) => {
    try {
        const statuses = await projectsModel.getProjectStatuses();
        res.json(statuses);
    } catch (error) {
        console.error("Error fetching project statuses:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllAProjects = async (req, res) => {
    try {
        const projects = await projectsModel.getAllProjects();
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).send("Internal Server Error");
    }
};const getAssignedProjects = async (req, res) => {
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

module.exports = {
    createProject,
    getProjectById,
    getProjectTypes,
    getProjectStatuses,
    getAllAProjects,
    getAssignedProjects
};
