const resources_model = require('../models/resources_model');

const getResources = async (req, res) => {
    try {
        const resources = await resources_model.get_resources();
        res.json(resources);
    } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getResourceById = async (req, res) => {
    try {
        const resourceId = req.params.id;
        const resource = await resources_model.get_resource_by_id(resourceId);

        if (!resource) {
            return res.status(404).send("Resource not found.");
        }

        res.json(resource);
    } catch (error) {
        console.error("Error fetching resource by ID:", error);
        res.status(500).send("Internal Server Error");
    }
};

const createResource = async (req, res) => {
    try {
        const { name, description, quantity, available, supplier, room, cabinet, shelf, box, price, priority } = req.body;

        if (await resources_model.doesResourceExist(name)) {
            return res.status(409).send("Resource already exists.");
        }

        const resource_id = await resources_model.create_resource(name, description, quantity, available, supplier, room, cabinet, shelf, box, price, priority);
        res.json({ success: true, resource_id });

    } catch (error) {
        console.error("Error registering resource:", error);
        res.status(500).send("Error registering resource.");
    }
};

const deleteResource = async (req, res) => {
    try {
        const resourceId = req.params.id;
        await resources_model.delete_resource(resourceId);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateResource = async (req, res) => {
    try {
        const resourceId = req.params.id;
        const { name, description, quantity, available, supplier, room, cabinet, shelf, box, price, priority } = req.body;

        await resources_model.update_resource(resourceId, name, description, quantity, available, supplier, room, cabinet, shelf, box, price, priority);
        res.json({ success: true });

    } catch (error) {
        console.error("Error updating resource:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getResources,
    getResourceById,
    createResource,
    deleteResource,
    updateResource
};


