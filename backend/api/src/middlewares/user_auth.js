const saveUser = (req, res, next) => {
    const {name, email, password, permission} = req.body;

    // Check for missing fields
    if (!name || !email || !password || !permission) {
        return res.status(400).send("All fields are required.");
    }

    if (is_email_valid(email)) {
        return res.status(400).send("Invalid email format.");
    }

    // Check for password strength (simple validation, will be extended)
    if (password.length < 8) {
        return res.status(400).send("Password must be at least 8 characters long.");
    }

    next();
};


const is_email_valid = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
}

// implement a middleware that checks if the user is logged in

module.exports = {
    saveUser,
    is_email_valid
};