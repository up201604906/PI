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
                    wishlist.added_at,
                    wishlist.state 
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
                    wishlist.added_at,
                    wishlist.state 
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

async function update_item_in_wishlist(user_name, resource_name, potential_resource_name, name, description, category, supplier, price, priority, quantity, state) {
    try {
        if (resource_name !== "null") {
            const user_id = (await pool.query(`SELECT id FROM users WHERE name = $1`, [user_name])).rows[0].id;
            const resource_id = (await pool.query(`SELECT id FROM resources WHERE name = $1`, [resource_name])).rows[0].id;
            await pool.query(`UPDATE resources SET name = $1, description = $2, category = $3, supplier = $4, price = $5, priority = $6 WHERE id = $7`, [name, description, category, supplier, price, priority, resource_id]);
            await pool.query(`UPDATE wishlist SET user_id = $1, quantity = $2, state = $3 WHERE resource_id = $4`, [user_id, quantity, state, resource_id]);
        } else {
            const user_id = (await pool.query(`SELECT id FROM users WHERE name = $1`, [user_name])).rows[0].id;
            const potential_resource_id = (await pool.query(`SELECT id FROM potential_resources WHERE name = $1`, [potential_resource_name])).rows[0].id;
            await pool.query(`UPDATE potential_resources SET name = $1, description = $2, category = $3, supplier = $4, price = $5, priority = $6 WHERE id = $7`, [name, description, category, supplier, price, priority, potential_resource_id]);
            await pool.query(`UPDATE wishlist SET user_id = $1, quantity = $2, state = $3 WHERE potential_resource_id = $4`, [user_id, quantity, state, potential_resource_id]);
        }
    } catch (error) {
        console.error("Error updating item in wishlist:", error);
        throw error;
    } 
}

async function delete_item_from_wishlist(user_name, resource_name, potential_resource_name) {
    try {
        if (resource_name !== "null") {
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
            await pool.query(`UPDATE resources SET description = $1, category = $2, supplier = $3, price = $4, priority = $5 WHERE id = $6`, [description, category, supplier, price, priority, resource_id]);
            await pool.query(`INSERT INTO wishlist (user_id, resource_id, quantity, state) VALUES ($1, $2, $3, 'open')`, [user_id, resource_id, quantity]);
        } else {
            const user_id = (await pool.query(`SELECT id FROM users WHERE name = $1`, [user_name])).rows[0].id;
            const potential_resource_id = (await pool.query(`INSERT INTO potential_resources (name, description, category, supplier, price, priority) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [potential_resource_name, description, category, supplier, price, priority])).rows[0].id;
            await pool.query(`INSERT INTO wishlist (user_id, potential_resource_id, quantity, state) VALUES ($1, $2, $3, 'open')`, [user_id, potential_resource_id, quantity]);
        }
    } catch (error) {
        console.error("Error adding item to wishlist:", error);
        throw error;
    }
}

async function move_to_resources(user_name, resource_name, potential_resource_name, room, cabinet, shelf, box, quantity) {
    try {
        const user_id = (await pool.query(`SELECT id FROM users WHERE name = $1`, [user_name])).rows[0].id;

        if (resource_name !== null) {
            const resource_id = (await pool.query(`SELECT id FROM resources WHERE name = $1`, [resource_name])).rows[0].id;
            const resource_quantity = (await pool.query(`SELECT quantity FROM wishlist WHERE user_id = $1 AND resource_id = $2`, [user_id, resource_id])).rows[0].quantity;
            await pool.query(`UPDATE resources SET available = available + $1 WHERE id = $2`, [quantity, resource_id]);
            await pool.query(`UPDATE resources SET quantity = quantity + $1 WHERE id = $2`, [quantity, resource_id]);
            
            // if you bought less than the quantity in the wishlist, update the wishlist quantity and state
            if (quantity < resource_quantity){
                await pool.query(`UPDATE wishlist SET quantity = quantity - $1 WHERE user_id = $2 AND resource_id = $3`, [quantity, user_id, resource_id]);
                await pool.query(`UPDATE wishlist SET state = 'open' WHERE user_id = $1 AND resource_id = $2`, [user_id, resource_id]);
                await pool.query(`UPDATE wishlist SET added_at = CURRENT_TIMESTAMP WHERE user_id = $1 AND resource_id = $2`, [user_id, resource_id]);
            }
            // if you bought the whole quantity in the wishlist, delete the item from the wishlist
            else {
                await pool.query(`DELETE FROM wishlist WHERE user_id = $1 AND resource_id = $2`, [user_id, resource_id]);
            }
            return 1;
        }
        else {
            const potential_resource_id = (await pool.query(`SELECT id FROM potential_resources WHERE name = $1`, [potential_resource_name])).rows[0].id;
            const potential_resource_quantity = (await pool.query(`SELECT quantity FROM wishlist WHERE user_id = $1 AND potential_resource_id = $2`, [user_id, potential_resource_id])).rows[0].quantity;

            // create the resource with the bought quantity
            await pool.query(`INSERT INTO resources (name, description, category, quantity, available, supplier, room, cabinet, shelf, box, price, priority) 
                              SELECT name, description, category, $1, $1, supplier, $2, $3, $4, $5, price, priority 
                              FROM potential_resources 
                              WHERE id = $6`, [quantity, room, cabinet, shelf, box, potential_resource_id]);

            // if you bought less than the quantity in the wishlist, update the wishlist quantity and state
            if (quantity < potential_resource_quantity){
                // add the resource to the wishlist with the remaining quantity
                await pool.query(`INSERT INTO wishlist (user_id, resource_id, quantity, state) 
                                  SELECT $1, id, $2, 'open' 
                                  FROM resources 
                                  WHERE name = $3`, [user_id, potential_resource_quantity - quantity, potential_resource_name]);
            }
            await pool.query(`DELETE FROM wishlist WHERE user_id = $1 AND potential_resource_id = $2`, [user_id, potential_resource_id]);
            await pool.query(`DELETE FROM potential_resources WHERE id = $1`, [potential_resource_id]);
            return 1;
        }
    } catch (error) {
        console.error("Error moving item to resources:", error);
        throw error;
    }
}

module.exports = {
    get_wishlist,
    update_item_in_wishlist,
    delete_item_from_wishlist,
    add_item_to_wishlist,
    move_to_resources
}