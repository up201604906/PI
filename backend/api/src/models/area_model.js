const pool = require("./database");  // Ensure you have a configured database connection

const getAreas = async () => {
    const query = 'SELECT type_name FROM project_types';
    const result = await pool.query(query);
    return result.rows;
}

module.exports = {
    getAreas
}
