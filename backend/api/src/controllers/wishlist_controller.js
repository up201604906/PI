const wishlist_model = require("../models/wishlist_model");

const getWishlist = async (req, res) => {
    try {
        const wishlist = await wishlist_model.get_wishlist();
        console.log("Wishlist:", wishlist);
        res.json(wishlist);
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
}


/*
async function update_item_in_wishlist(user_id, resource_id, potential_resource_id, name, description, category, supplier, price, priority, quantity) {
    try {
        if (resource_id) {
            await pool.query(
                `UPDATE resources SET name = $1, description = $2, category = $3, supplier = $4, price = $5, priority = $6 WHERE id = $7`,
                [name, description, category, supplier, price, priority, resource_id]
            );
        } else {
            await pool.query(
                `UPDATE potential_resources SET name = $1, description = $2, category = $3, supplier = $4, price = $5, priority = $6 WHERE id = $7`,
                [name, description, category, supplier, price, priority, potential_resource_id]
            );
        }
      }
          catch (error) {
              console.error("Error updating item in wishlist:", error);
              throw error;
          }
        
}

async function delete_item_from_wishlist(user_id, resource_id, potential_resource_id) {
    try {
        if (resource_id) {
            await pool.query(
                `DELETE FROM wishlist WHERE user_id = $1 AND resource_id = $2`,
                [user_id, resource_id]
            );
        }
        else {
            await pool.query(
                `DELETE FROM wishlist WHERE user_id = $1 AND potential_resource_id = $2`,
                [user_id, potential_resource_id]
            );
        }
    } catch (error) {
        console.error("Error deleting item from wishlist:", error);
        throw error;
    }
}
*/

const updateResourceInWishlist = async (req, res) => {
    try {
        const { user_id, resource_id, potential_resource_id, name, description, category, supplier, price, priority, quantity } = req.body;
        const result = await wishlist_model.update_item_in_wishlist(user_id, resource_id, potential_resource_id, name, description, category, supplier, price, priority, quantity);
        res.json({ success: result === 1 });
    } catch (error) {
        console.error("Error updating item in wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
}

const deleteResourceFromWishlist = async (req, res) => {
    try {
        const { user_name, resource_name, potencial_resource_name } = req.params;
        const result = await wishlist_model.delete_item_from_wishlist(user_name, resource_name, potencial_resource_name);
        res.json({ success: result === 1 });
    } catch (error) {
        console.error("Error deleting item from wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
};

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