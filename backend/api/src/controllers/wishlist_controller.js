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

const deleteResourceFromWishlist = async (req, res) => {
    try {
        const { user_id, resource_id } = req.body;
        const result = await wishlist_model.delete_resource_from_wishlist(user_id, resource_id);
        res.json({ success: result === 1 });
    } catch (error) {
        console.error("Error deleting resource from wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
}

const updateResourceInWishlist = async (req, res) => {
    try {
        const { user_id, resource_id, new_resource_id } = req.body;
        const result = await wishlist_model.update_resource_in_wishlist(user_id, resource_id, new_resource_id);
        res.json({ success: result === 1 });
    } catch (error) {
        console.error("Error updating resource in wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
}*/

module.exports = {
    getWishlist/*,
    addResourceToWishlist,
    deleteResourceFromWishlist,
    updateResourceInWishlist*/
}