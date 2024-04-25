/*
CREATE TABLE pc_allocation (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  serial_number VARCHAR NOT NULL,
  room VARCHAR NOT NULL
);
*/

const pool = require("./database");

async function create_pcallocation(name, serial_number, room) {
    try {
        const result = await pool.query(
            'INSERT INTO pc_allocation (name, serial_number, room) VALUES ($1, $2, $3) RETURNING id',
            [name, serial_number, room]
        );
        return result.rows[0].id;
    } catch (error) {
        console.error("Error inserting pc allocation:", error);
    }
}

const doesPCAllocationExist = async (name, serial_number) => {
    const result = await pool.query(
        'SELECT COUNT(*) FROM pc_allocation WHERE name = $1 AND serial_number = $2',
        [name, serial_number]
    );
    return result.rows[0].count > 0;
}

const get_pcallocation_by_id = async (pcAllocationId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM pc_allocation WHERE id = $1',
            [pcAllocationId]
        );

        // If no pc allocation found, return null
        if (result.rows.length === 0) {
            return null;
        }

        // Return the found pc allocation
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching pc allocation by ID:", error);
        throw error;  // re-throw the error so it can be caught and handled elsewhere
    }
}

const get_pcallocations = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM pc_allocation'
        );

        return result.rows;
    } catch (error) {
        console.error("Error fetching pc allocations:", error);
        throw error;  // re-throw the error so it can be caught and handled elsewhere
    }
}

const delete_pcallocation = async (pcAllocationId) => {
    try {
        await pool.query(
            'DELETE FROM pc_allocation WHERE id = $1',
            [pcAllocationId]
        );
    } catch (error) {
        console.error("Error deleting pc allocation:", error);
        throw error;
    }
}

const update_pcallocation = async (pcAllocationId, name, serial_number, room) => {
    try {
        await pool.query(
            'UPDATE pc_allocation SET name = $1, serial_number = $2, room = $3 WHERE id = $4',
            [name, serial_number, room, pcAllocationId]
        );
    } catch (error) {
        console.error("Error updating pc allocation:", error);
        throw error;
    }
}

module.exports = {
    create_pcallocation,
    doesPCAllocationExist,
    get_pcallocation_by_id,
    get_pcallocations,
    delete_pcallocation,
    update_pcallocation,
};
