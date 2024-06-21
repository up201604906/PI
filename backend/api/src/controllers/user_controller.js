const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const user_model = require('../models/user_model');

const signup = async (req, res) => {
    try {
        const { name, email, password, confPass, permission} = req.body;

        // Hash the password
        //const saltRounds = 10;  //
        const hashedPassword = await argon2.hash(password);

        if (await user_model.doesUserExist(name, email)) {
            return res.status(409).send("Name or email already exists.");
        }

        const user_id = await user_model.create_user(name, email, hashedPassword, permission);  
        res.json({ success: true, user_id });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user.");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await user_model.get_user_by_email(email);

        if (!user) {
            return res.status(404).send("Login failed! User not found.");
        }

        const passwordMatch = await verifyPassword(user.password, password);

        if (!passwordMatch) {
            return res.status(401).send("Invalid credentials.");
        }
        else{
            const token = jwt.sign(
                { userId: user.id, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.json({ success: true, token: token, user: user.id, permission: user.permission });
        }

    } catch (error) {
        res.status(500).send("Error during login." + error);
    }
};

async function verifyPassword(storedHash, submittedPass) {
    try {
        return await argon2.verify(storedHash, submittedPass); // returns true if it matches, false otherwise
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const logout = async (req, res) => {
    try {
        res.json({ success: true });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).send("Error logging out.");
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await user_model.get_user_by_id(userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await user_model.get_all_users();

        if(!users){
            return res.status(404).send("No users found.");
        }

        res.json(users);
    } catch (err) {
        res.status(500).send('Error retrieving User.');
        console.error(err.message);
    }
};

const getUserAreas = async (req, res) => {
    try {
        const userId = req.params.id;
        const areas = await user_model.get_user_areas(userId);

        res.json(areas);
    } catch (err) {
        res.status(500).send('Error retrieving User Areas.');
        console.error(err.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id, name, contact_email, personal_email, phone_number, password, permission, areas } = req.body;

        // Hash the password
        const hashedPassword = await argon2.hash(password);

        const updatedUser = await user_model.update_user(id, name, contact_email, personal_email, phone_number, hashedPassword, permission);

        if (!updatedUser) {
            return res.status(404).send("User not found.");
        }

        const updatedAreas = await user_model.update_user_areas(id, areas);

        const responseJson = {
            user: updatedUser,
            areas: updatedAreas
        };


        res.json(responseJson);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await user_model.delete_user(userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        res.json(user);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
};
const getUsersWithProjectTypes = async (req, res) => {
    try {
        const users = await user_model.getUsersWithProjectTypes();
        console.log("users!");
        res.json(users);
    } catch (error) {
        console.error("Error fetching users with project types:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { 
    signup,
    login,
    logout,
    getUserById,
    getUsers,
    getUserAreas,
    updateUser,
    deleteUser,
    getUsersWithProjectTypes
};