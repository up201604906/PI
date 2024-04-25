const pool = require("./database");

/*
CREATE TABLE licenses (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  equipment TEXT NOT NULL,
  login VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);
*/

async function create_license(description, equipment, login, password) {
    try {
        const result = await pool.query(
            'INSERT INTO licenses (description, equipment, login, password) VALUES ($1, $2, $3, $4) RETURNING id',
            [description, equipment, login, password]
        );
        return result.rows[0].id;
    } catch (error) {
        console.error("Error inserting license:", error);
    }
}

const doesLicenseExist = async (equipment, login) => {
    const result = await pool.query(
        'SELECT COUNT(*) FROM licenses WHERE equipment = $1 AND login = $2',
        [equipment, login]
    );
    return result.rows[0].count > 0;
}

const get_license_by_id = async (licenseId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM licenses WHERE id = $1',
            [licenseId]
        );

        // If no license found, return null
        if (result.rows.length === 0) {
            return null;
        }

        // Return the found license
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching license by ID:", error);
        throw error;  // re-throw the error so it can be caught and handled elsewhere
    }
}

const get_licenses = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM licenses'
        );

        return result.rows;
    } catch (error) {
        console.error("Error fetching licenses:", error);
        throw error;  // re-throw the error so it can be caught and handled elsewhere
    }
}

const delete_license = async (licenseId) => {
    try {
        await pool.query(
            'DELETE FROM licenses WHERE id = $1',
            [licenseId]
        );
    } catch (error) {
        console.error("Error deleting license:", error);
        throw error;
    }
}

const update_license = async (licenseId, description, equipment, login, password) => {
    try {
        await pool.query(
            'UPDATE licenses SET description = $1, equipment = $2, login = $3, password = $4 WHERE id = $5',
            [description, equipment, login, password, licenseId]
        );
    } catch (error) {
        console.error("Error updating license:", error);
        throw error;
    }
}

module.exports = {
    create_license,
    doesLicenseExist,
    get_license_by_id,
    get_licenses,
    delete_license,
    update_license,
};