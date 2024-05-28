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

const updateAssignment = async (req, res) => {
    const assignmentId = req.params.id;
    const { description, assignee_id } = req.body;
    try {
        await projectsModel.updateAssignment(assignmentId, description, assignee_id);
        res.status(204).send();
    } catch (error) {
        console.error("Error updating assignment:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deleteAssignment = async (req, res) => {
    const assignmentId = req.params.id;
    try {
        await projectsModel.deleteAssignment(assignmentId);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting assignment:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateSharingLink = async (req, res) => {
    const linkId = req.params.id;
    const { link_type, link_url } = req.body;
    try {
        await projectsModel.updateSharingLink(linkId, link_type, link_url);
        res.status(204).send();
    } catch (error) {
        console.error("Error updating sharing link:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deleteSharingLink = async (req, res) => {
    const linkId = req.params.id;
    try {
        await projectsModel.deleteSharingLink(linkId);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting sharing link:", error);
        res.status(500).send("Internal Server Error");
    }
};

const removeTeamMember = async (req, res) => {
    const memberId = req.params.id;
    try {
        await projectsModel.removeTeamMember(memberId);
        res.status(204).send();
    } catch (error) {
        console.error("Error removing team member:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getRecentProjects = async (req, res) => {
    const limit = parseInt(req.params.limit, 10); // Get the limit from the request parameters
    try {
        const recentProjects = await projectsModel.getRecentProjects(limit);
        res.json(recentProjects);
    } catch (error) {
        console.error("Error fetching recent projects:", error);
        res.status(500).send("Internal Server Error");
    }
};
const createAssignment = async (req, res) => {
    const { project_id, description, assignee_id, due_date, status } = req.body;
    try {
        const assignment = await projectsModel.createAssignment({ project_id, description, assignee_id, due_date, status });
        res.status(201).json(assignment);
    } catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).send("Internal Server Error");
    }
};

const createSharingLink = async (req, res) => {
    const { project_id, link_type, link_url } = req.body;
    try {
        const link = await projectsModel.createSharingLink({ project_id, link_type, link_url });
        res.status(201).json(link);
    } catch (error) {
        console.error("Error creating sharing link:", error);
        res.status(500).send("Internal Server Error");
    }
};

const createTeamMember = async (req, res) => {
    const { project_id, name, field, user_id } = req.body;
    try {
        const member = await projectsModel.createTeamMember({ project_id, name, field, user_id });
        res.status(201).json(member);
    } catch (error) {
        console.error("Error creating team member:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createProject,
    getProjectById,
    getProjectTypes,
    getProjectStatuses,
    getAllAProjects,
    getAssignedProjects,
    deleteAssignment,
    deleteSharingLink,
    removeTeamMember,
    updateAssignment,
    updateSharingLink,
    getRecentProjects,
    createAssignment,
    createSharingLink,
    createTeamMember
};
