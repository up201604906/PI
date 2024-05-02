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



/*
async function update_item_in_wishlist(user_name, resource_name, potential_resource_name, name, description, category, supplier, price, priority, quantity) {
    try {
        if (resource_name !== "null") {
            const user_id = (await pool.query(`SELECT id FROM users WHERE name = $1`, [user_name])).rows[0].id;
            const resource_id = (await pool.query(`SELECT id FROM resources WHERE name = $1`, [resource_name])).rows[0].id;
            await pool.query(`UPDATE resources SET name = $1, description = $2, category = $3, supplier = $4, price = $5, priority = $6 WHERE id = $7`, [name, description, category, supplier, price, priority, resource_id]);
            await pool.query(`UPDATE wishlist SET user_id = $1, quantity = $2 WHERE resource_id = $3`, [user_id, quantity, resource_id]);
        } else {
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
*/

const updateResourceInWishlist = async (req, res) => {
    try {
        const { user_name, resource_name, potential_resource_name } = req.params;
        const { name, description, category, supplier, price, priority, quantity } = req.body;

        console.log('req.params:', req.params); // Add this line
        console.log('req.body:', req.body); // Add this line

        const result = await wishlist_model.update_item_in_wishlist(user_name, resource_name, potential_resource_name, name, description, category, supplier, price, priority, quantity);
        res.json({ success: result === 1 });
    }
    catch (error) {
        console.error("Error updating item in wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
}

/*
const addResourceToWishlist = async (req, res) => {
    try {
        const { user_id, resource_id } = req.body;
        const result = await wishlist_model.add_resource_to_wishlist(user_id, resource_id);
        res.json({ success: result === 1 });
    } catch (error) {
        console.error("Error adding resource to wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
}
*/

module.exports = {
    getWishlist,
    updateResourceInWishlist,
    deleteResourceFromWishlist
    /*,
    addResourceToWishlist,
    deleteResourceFromWishlist,
    updateResourceInWishlist*/
}