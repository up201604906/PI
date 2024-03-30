const pool = require("./database");

/*

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  available INTEGER NOT NULL,
  supplier VARCHAR NOT NULL,
  room VARCHAR NOT NULL,
  cabinet VARCHAR,
  shelf VARCHAR,
  box VARCHAR,
  price DOUBLE,
  priority resources_priority_enum
);

*/

async function create_resource(name, description, quantity, available, supplier, room, cabinet, shelf, box, price = null, priority = null) {
    try {
        const result = await pool.query(
            'INSERT INTO resources (name, description, quantity, available, supplier, room, cabinet, shelf, box, price, priority) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
            [name, description, quantity, available, supplier, room, cabinet, shelf, box, price, priority]
        );
        return result.rows[0].id;
    } catch (error) {
        console.error("Error inserting resource:", error);
    }
}

const doesResourceExist = async (name) => {
    const result = await pool.query(
        'SELECT COUNT(*) FROM resources WHERE name = $1',
        [name]
    );
    return result.rows[0].count > 0;
};

const get_resource_by_id = async (resourceId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM resources WHERE id = $1',
            [resourceId]
        );

        // If no resource found, return null
        if (result.rows.length === 0) {
            return null;
        }

        // Return the found resource
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching resource by ID:", error);
        throw error;  // re-throw the error so it can be caught and handled elsewhere
    }
}

const get_resource_by_name = async (name) => {
    try {
        const result = await pool.query(
            'SELECT * FROM resources WHERE name = $1',
            [name]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching resource by name:", error);
        throw error;
    }
}

const get_resources = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM resources'
        );
        return result.rows;
    } catch (error) {
        console.error("Error fetching resources:", error);
        throw error;
    }
}

const delete_resource = async (resourceId) => {
    try {
        await pool.query(
            'DELETE FROM resources WHERE id = $1',
            [resourceId]
        );
    } catch (error) {
        console.error("Error deleting resource:", error);
        throw error;
    }
}

const update_resource = async (resourceId, name, description, quantity, available, supplier, room, cabinet, shelf, box, price, priority) => {
    try {
        await pool.query(
            'UPDATE resources SET name = $1, description = $2, quantity = $3, available = $4, supplier = $5, room = $6, cabinet = $7, shelf = $8, box = $9, price = $10, priority = $11 WHERE id = $12',
            [name, description, quantity, available, supplier, room, cabinet, shelf, box, price, priority, resourceId]
        );
    } catch (error) {
        console.error("Error updating resource:", error);
        throw error;
    }
}

module.exports = {
    doesResourceExist,
    create_resource,
    get_resource_by_id,
    get_resource_by_name,
    get_resources,
    delete_resource,
    update_resource
};