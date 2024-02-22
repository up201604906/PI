const pool = require('./database');

async function create_user(username, email, full_name, password) {
    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, full_name, password) VALUES ($1, $2, $3, $4) RETURNING id',
            [username, email, full_name, password]
        );
        return result.rows[0].id;
    } catch (error) {
        console.error("Error inserting user:", error);
    }
}

// Check if a username or email already exists
const doesUserExist = async (username, email) => {
    const result = await pool.query(
        'SELECT COUNT(*) FROM users WHERE username = $1 OR email = $2',
        [username, email]
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

const get_user_by_username_or_email = async (usernameOrEmail) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $1',
            [usernameOrEmail]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user by username or email:", error);
        throw error;
    }
};


module.exports = {
    doesUserExist,
    create_user,
    get_user_by_id,
    get_user_by_username_or_email
};
