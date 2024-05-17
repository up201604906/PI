/*
CREATE TABLE pc_allocation (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  serial_number VARCHAR NOT NULL,
  room VARCHAR NOT NULL
);

CREATE TABLE user_pc_allocation (
  user_id INTEGER REFERENCES users(id),
  pc_allocation_id INTEGER REFERENCES pc_allocation(id),
  PRIMARY KEY (user_id, pc_allocation_id)
);
*/

const pool = require("./database");

async function create_pcallocation(user_name, name, serial_number, room) {
    try {
        const result = await pool.query(
            'INSERT INTO pc_allocation (name, serial_number, room) VALUES ($1, $2, $3) RETURNING id',
            [name, serial_number, room]
        );
        await pool.query('INSERT INTO user_pc_allocation (user_id, pc_allocation_id) VALUES ((SELECT id FROM users WHERE name = $1), $2)', [user_name, result.rows[0].id]);
        return result.rows[0].id;
    } catch (error) {
        console.error("Error inserting pc allocation:", error);
    }
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

// get user names and pc allocations
const get_pcallocations = async () => {
    try {
        const result = await pool.query(
            'SELECT pc_allocation.id, users.name AS user_name, pc_allocation.name, pc_allocation.serial_number, pc_allocation.room FROM users JOIN user_pc_allocation ON users.id = user_pc_allocation.user_id JOIN pc_allocation ON user_pc_allocation.pc_allocation_id = pc_allocation.id'
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
            'DELETE FROM user_pc_allocation WHERE pc_allocation_id = $1',
            [pcAllocationId]
        );
        await pool.query(
            'DELETE FROM pc_allocation WHERE id = $1',
            [pcAllocationId]
        );
    } catch (error) {
        console.error("Error deleting pc allocation:", error);
        throw error;
    }
}

const update_pcallocation = async (pcAllocationId, user_name, name, serial_number, room) => {
    try {
        const { rows } = await pool.query(
            'SELECT id FROM users WHERE name = $1',
            [user_name]
        );
        const userId = rows[0].id;

        await pool.query(
            'UPDATE user_pc_allocation SET user_id = $1 WHERE pc_allocation_id = $2',
            [userId, pcAllocationId]
        );
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
    get_pcallocation_by_id,
    get_pcallocations,
    delete_pcallocation,
    update_pcallocation,
};
