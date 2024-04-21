const pool = require('./database');

async function create_user(name, email, password, permission) {
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password, permission) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, email, password, permission]
        );
        return result.rows[0].id;
    } catch (error) {
        console.error("Error inserting user:", error);
    }
}

// Check if a username or email already exists
const doesUserExist = async (name, email) => {
    const result = await pool.query(
        'SELECT COUNT(*) FROM users WHERE name = $1 OR email = $2',
        [name, email]
    );
    return result.rows[0].count > 0;
};

const get_user_by_id = async (userId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [userId]
        );

        // If no user found, return null
        if (result.rows.length === 0) {
            return null;
        }

        // Return the found user
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;  // re-throw the error so it can be caught and handled elsewhere
    }
};

const get_user_by_name_or_email = async (email) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user by name or email:", error);
        throw error;
    }
};

module.exports = {
    doesUserExist,
    create_user,
    get_user_by_id,
    get_user_by_email
};
