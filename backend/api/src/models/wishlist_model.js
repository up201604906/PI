/*
CREATE TYPE users_permissions_enum AS ENUM ('student', 'collaborator', 'admin');
CREATE TYPE resources_priority_enum AS ENUM ('low', 'medium', 'high');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    permission users_permissions_enum NOT NULL,
    picture BYTEA
);

CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    category VARCHAR NOT NULL,
    quantity INTEGER NOT NULL,
    available INTEGER NOT NULL,
    supplier VARCHAR,
    room VARCHAR,
    cabinet VARCHAR,
    shelf VARCHAR,
    box VARCHAR,
    price FLOAT,
    priority resources_priority_enum
);

CREATE TABLE potential_resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    category VARCHAR NOT NULL,
    supplier VARCHAR,
    price FLOAT,
    priority resources_priority_enum
);

CREATE TABLE wishlist (
    user_id INTEGER NOT NULL,
    resource_id INTEGER,
    potential_resource_id INTEGER,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (resource_id) REFERENCES resources(id),
    FOREIGN KEY (potential_resource_id) REFERENCES potential_resources(id),
    CHECK ((resource_id IS NOT NULL AND potential_resource_id IS NULL) OR 
          (resource_id IS NULL AND potential_resource_id IS NOT NULL))
);

My wishlist needs to work like so:

If i have a resource and I want more of it, I add that resource with a specific quantity to my wishlist. Then, when i buy it, the resource is deleted from the wishlist and it's quantity is updated.

If I want a new resource, I add it to my wishlist as a potential resource and then, after I buy it, I create a new resource with it

*/

const pool = require("./database");

async function get_wishlist() {
    try {
        const result = await pool.query(
            `SELECT users.name AS user_name, 
                    resources.id AS resource_id, 
                    resources.name AS resource_name, 
                    resources.description AS resource_description, 
                    resources.category AS resource_category, 
                    resources.supplier AS resource_supplier, 
                    resources.price AS resource_price, 
                    resources.priority AS resource_priority, 
                    NULL AS potential_resource_id,
                    NULL AS potential_resource_name,
                    NULL AS potential_resource_description,
                    NULL AS potential_resource_category,
                    NULL AS potential_resource_supplier,
                    NULL AS potential_resource_price,
                    NULL AS potential_resource_priority,
                    wishlist.quantity AS quantity,
                    wishlist.added_at 
             FROM wishlist 
             LEFT JOIN users ON wishlist.user_id = users.id 
             LEFT JOIN resources ON wishlist.resource_id = resources.id 
             WHERE wishlist.resource_id IS NOT NULL
             UNION ALL
             SELECT users.name AS user_name, 
                    NULL AS resource_id, 
                    NULL AS resource_name, 
                    NULL AS resource_description, 
                    NULL AS resource_category, 
                    NULL AS resource_supplier, 
                    NULL AS resource_price, 
                    NULL AS resource_priority, 
                    potential_resources.id AS potential_resource_id,
                    potential_resources.name AS potential_resource_name,
                    potential_resources.description AS potential_resource_description,
                    potential_resources.category AS potential_resource_category,
                    potential_resources.supplier AS potential_resource_supplier,
                    potential_resources.price AS potential_resource_price,
                    potential_resources.priority AS potential_resource_priority,
                    wishlist.quantity AS quantity,
                    wishlist.added_at 
             FROM wishlist 
             LEFT JOIN users ON wishlist.user_id = users.id 
             LEFT JOIN potential_resources ON wishlist.potential_resource_id = potential_resources.id
             WHERE wishlist.potential_resource_id IS NOT NULL`
        );
        return result.rows;
    }
    catch (error) {
        console.error("Error fetching wishlist:", error);
        throw error;
    }
}

async function update_item_in_wishlist(user_name, resource_name, potential_resource_name, name, description, category, supplier, price, priority, quantity) {
    try {
        if (resource_name !== "null") {
            console.log('RESOURCE NAME:', resource_name);
            const user_id = (await pool.query(`SELECT id FROM users WHERE name = $1`, [user_name])).rows[0].id;
            const resource_id = (await pool.query(`SELECT id FROM resources WHERE name = $1`, [resource_name])).rows[0].id;
            await pool.query(`UPDATE resources SET name = $1, description = $2, category = $3, supplier = $4, price = $5, priority = $6 WHERE id = $7`, [name, description, category, supplier, price, priority, resource_id]);
            await pool.query(`UPDATE wishlist SET user_id = $1, quantity = $2 WHERE resource_id = $3`, [user_id, quantity, resource_id]);
        } else {
            console.log('potential RESOURCE NAME:', potential_resource_name);
            const user_id = (await pool.query(`SELECT id FROM users WHERE name = $1`, [user_name])).rows[0].id;
            const potential_resource_id = (await pool.query(`SELECT id FROM potential_resources WHERE name = $1`, [potential_resource_name])).rows[0].id;
            await pool.query(`UPDATE potential_resources SET name = $1, description = $2, category = $3, supplier = $4, price = $5, priority = $6 WHERE id = $7`, [name, description, category, supplier, price, priority, potential_resource_id]);
            await pool.query(`UPDATE wishlist SET user_id = $1, quantity = $2 WHERE potential_resource_id = $3`, [user_id, quantity, potential_resource_id]);
        }
    } catch (error) {
        console.error("Error updating item in wishlist:", error);
        throw error;
    } 
}

async function delete_item_from_wishlist(user_name, resource_name, potential_resource_name) {
    try {
        if (resource_name !== "null") {
            console.log('RESOURCE NAME:', resource_name);
            await pool.query(
                `DELETE FROM wishlist 
                 WHERE user_id = (SELECT id FROM users WHERE name = $1) 
                 AND resource_id = (SELECT id FROM resources WHERE name = $2)`,
                [user_name, resource_name]
            );
        }
        else {
            await pool.query(
                `DELETE FROM wishlist 
                 WHERE user_id = (SELECT id FROM users WHERE name = $1) 
                 AND potential_resource_id = (SELECT id FROM potential_resources WHERE name = $2)`,
                [user_name, potential_resource_name]
            );
            await pool.query(
                `DELETE FROM potential_resources WHERE name = $1`,
                [potential_resource_name]
            );
        }
    } catch (error) {
        console.error("Error deleting item from wishlist:", error);
        throw error;
    }
}

async function add_item_to_wishlist(user_name, resource_name, potential_resource_name, description, category, supplier, price, priority, quantity) {
    try {
        if (resource_name !== null) {
            const user_id = (await pool.query(`SELECT id FROM users WHERE name = $1`, [user_name])).rows[0].id;
            const resource_id = (await pool.query(`SELECT id FROM resources WHERE name = $1`, [resource_name])).rows[0].id;
            await pool.query(`UPDATE resources SET supplier = $1, price = $2, priority = $3 WHERE id = $4`, [supplier, price, priority, resource_id]);
            await pool.query(`INSERT INTO wishlist (user_id, resource_id, quantity) VALUES ($1, $2, $3)`, [user_id, resource_id, quantity]);
        } else {
            const user_id = (await pool.query(`SELECT id FROM users WHERE name = $1`, [user_name])).rows[0].id;
            const potential_resource_id = (await pool.query(`INSERT INTO potential_resources (name, description, category, supplier, price, priority) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [potential_resource_name, description, category, supplier, price, priority])).rows[0].id;
            await pool.query(`INSERT INTO wishlist (user_id, potential_resource_id, quantity) VALUES ($1, $2, $3)`, [user_id, potential_resource_id, quantity]);
        }
    } catch (error) {
        console.error("Error adding item to wishlist:", error);
        throw error;
    }
}

module.exports = {
    get_wishlist,
    update_item_in_wishlist,
    delete_item_from_wishlist,
    add_item_to_wishlist
}