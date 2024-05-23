const areaModel = require('../models/area_model');


const getAreas = async (req, res) => {
    try {
        const areas = await areaModel.getAreas();
        res.json(areas);
    } catch (error) {
        console.error("Error fetching areas:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getAreas
}