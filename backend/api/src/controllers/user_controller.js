const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const user_model = require('../models/user_model');


const signup = async (req, res) => {
    try {
        const { name, email, password, permission, picture } = req.body;

        // Hash the password
        //const saltRounds = 10;  // or another number you prefer
        const hashedPassword = await argon2.hash(password);

        if (await user_model.doesUserExist(name, email)) {
            return res.status(409).send("Name or email already exists.");
        }

        const user_id = await user_model.create_user(name, email, hashedPassword, permission, picture);  // Note: passing hashedPassword instead of password
        res.json({ success: true, user_id });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user.");
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

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        
        
        const user = await user_model.get_user_by_name_or_email(name);

        if (!user) {
            return res.status(404).send("User not found.");
        }

    
        const passwordMatch = await argon2.verify(user.password, password);
        
        if (!passwordMatch) {
            return res.status(401).send("Invalid credentials.");
        }
        if(passwordMatch){
            
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_SECRET,  // TODO: replace with process.env.JWT_SECRET
                { expiresIn: '1h' } 
            );
            return res.json({ success: true, token });
        }


        res.json({ success: true, user_id: user.id });

    } catch (error) {
        res.status(500).send("Error during login.");
    }
};

module.exports = { 
    signup,
    login,
    getUserById
};