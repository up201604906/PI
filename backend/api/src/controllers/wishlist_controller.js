const wishlist_model = require("../models/wishlist_model");

const getWishlist = async (req, res) => {
    try {
        const wishlist = await wishlist_model.get_wishlist();
        //console.log("Wishlist:", wishlist);
        res.json(wishlist);
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteResourceFromWishlist = async (req, res) => {
    try {
        const { user_name, resource_name, potential_resource_name } = req.params;
        const result = await wishlist_model.delete_item_from_wishlist(user_name, resource_name, potential_resource_name);
        res.json({ success: result === 1 });
    } catch (error) {
        console.error("Error deleting item from wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
};

const updateResourceInWishlist = async (req, res) => {
    try {
        const { user_name, resource_name, potential_resource_name } = req.params;
        const { name, description, category, supplier, price, priority, quantity } = req.body;

        const result = await wishlist_model.update_item_in_wishlist(user_name, resource_name, potential_resource_name, name, description, category, supplier, price, priority, quantity);
        res.json({ success: result === 1 });
    }
    catch (error) {
        console.error("Error updating item in wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
}

/*
async function add_item_to_wishlist(user_name, resource_name, potential_resource_name, description, category, supplier, price, priority, quantity) {
    try {
        if (resource_name !== "null") {
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
*/

const addResourceToWishlist = async (req, res) => {
    try {
        const { user_name, resource_name, potential_resource_name, description, category, supplier, price, priority, quantity } = req.body;
        console.log('req.body:', req.body);
        const result = await wishlist_model.add_item_to_wishlist(user_name, resource_name, potential_resource_name, description, category, supplier, price, priority, quantity);
        res.json({ success: result === 1 });
    } catch (error) {
        console.error("Error adding item to wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getWishlist,
    updateResourceInWishlist,
    deleteResourceFromWishlist,
    addResourceToWishlist
}