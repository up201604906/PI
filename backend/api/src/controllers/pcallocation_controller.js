const pcallocation_model = require("../models/pcallocation_model");

const getPCAllocations = async (req, res) => {
    try {
        const pcallocations = await pcallocation_model.get_pcallocations();
        res.json(pcallocations);
    } catch (error) {
        console.error("Error fetching pc allocations:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getPCAllocationById = async (req, res) => {
    try {
        const pcAllocationId = req.params.id;
        const pcallocation = await pcallocation_model.get_pcallocation_by_id(pcAllocationId);

        if (!pcallocation) {
            return res.status(404).send("PC Allocation not found.");
        }

        res.json(pcallocation);
    } catch (error) {
        console.error("Error fetching pc allocation by ID:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updatePCAllocation = async (req, res) => {
    try {
        const pcAllocationId = req.params.id;
        const { user_name, name, serial_number, room } = req.body;

        await pcallocation_model.update_pcallocation(pcAllocationId, user_name, name, serial_number, room);
        res.json({ success: true });

    } catch (error) {
        console.error("Error updating pc allocation:", error);
        res.status(500).send("Internal Server Error");
    }
}

const createPCAllocation = async (req, res) => {
    try {
        const { user_name, name, serial_number, room } = req.body;

        await pcallocation_model.create_pcallocation(user_name, name, serial_number, room);
        res.json({ success: true });

    } catch (error) {
        console.error("Error creating pc allocation:", error);
        res.status(500).send("Internal Server Error");
    }
}

const deletePCAllocationById = async (req, res) => {
    try {
        const pcAllocationId = req.params.id;
        await pcallocation_model.delete_pcallocation(pcAllocationId);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting pc allocation:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getPCAllocations,
    getPCAllocationById,
    updatePCAllocation,
    createPCAllocation,
    deletePCAllocationById
};