const wishlist_model = require("../models/wishlist_model");

const getWishlist = async (req, res) => {
    try {
        const wishlist = await wishlist_model.get_wishlist();
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
        const { name, description, category, supplier, price, priority, quantity, state } = req.body;

        const result = await wishlist_model.update_item_in_wishlist(user_name, resource_name, potential_resource_name, name, description, category, supplier, price, priority, quantity, state);
        res.json({ success: result === 1 });
    }
    catch (error) {
        console.error("Error updating item in wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
}

const addResourceToWishlist = async (req, res) => {
    try {
        const { user_name, resource_name, potential_resource_name, description, category, supplier, price, priority, quantity } = req.body;
        const result = await wishlist_model.add_item_to_wishlist(user_name, resource_name, potential_resource_name, description, category, supplier, price, priority, quantity);
        res.json({ success: result === 1 });
    } catch (error) {
        console.error("Error adding item to wishlist:", error);
        res.status(500).send("Internal Server Error");
    }
}

const moveToResources = async (req, res) => {
    try {
        const { userName, resourceName, potentialResourceName, room, cabinet, shelf, box, quantity } = req.body;

        const result = await wishlist_model.move_to_resources(userName, resourceName, potentialResourceName, room, cabinet, shelf, box, quantity);

        res.json({ success: result === 1 });
    } catch (error) {
        console.error("Error moving item to resources:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getWishlist,
    updateResourceInWishlist,
    deleteResourceFromWishlist,
    addResourceToWishlist,
    moveToResources
}