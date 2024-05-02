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
  resource_id INTEGER NOT NULL,
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

If I want a new resource, I add it to my wishlist as a potencial resource and then, after I buy it, I create a new resource with it

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

module.exports = {
    get_wishlist
}