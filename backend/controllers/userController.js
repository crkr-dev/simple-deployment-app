const userService = require("../services/userService");

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();

        res.status(200).json({
            users
        });
    } catch (error) {
        console.error("Get users error:", error);

        res.status(500).json({
            message: "Failed to fetch users"
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const user = await userService.createUser({
            name,
            email
        });

        res.status(201).json({
            user
        });
    } catch (error) {
        console.error("Create user error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            message: "Failed to create user"
        });
    }
};

module.exports = {
    getUsers,
    createUser
};