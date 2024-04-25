const licenses_model = require("../models/licenses_model");

const getLicenses = async (req, res) => {
    try {
        const licenses = await licenses_model.get_licenses();
        res.json(licenses);
    } catch (error) {
        console.error("Error fetching licenses:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getLicenseById = async (req, res) => {
    try {
        const licenseId = req.params.id;
        const license = await licenses_model.get_license_by_id(licenseId);

        if (!license) {
            return res.status(404).send("License not found.");
        }

        res.json(license);
    } catch (error) {
        console.error("Error fetching license by ID:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateLicense = async (req, res) => {
    try {
        const licenseId = req.params.id;
        const { description, equipment, login, password } = req.body;

        await licenses_model.update_license(licenseId, description, equipment, login, password);
        res.json({ success: true });

    } catch (error) {
        console.error("Error updating license:", error);
        res.status(500).send("Internal Server Error");
    }
}

const createLicense = async (req, res) => {
    try {
        const { description, equipment, login, password } = req.body;

        await licenses_model.create_license(description, equipment, login, password);
        res.json({ success: true });

    } catch (error) {
        console.error("Error creating license:", error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteLicenseById = async (req, res) => {
    try {
        const licenseId = req.params.id;
        await licenses_model.delete_license(licenseId);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting license:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getLicenses,
    getLicenseById,
    updateLicense,
    createLicense,
    deleteLicenseById
};