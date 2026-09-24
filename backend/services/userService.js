const User = require("../models/User");

const getUsers = async () => {
    const users = await User.find().sort({ createdAt: -1 });

    return users;
};

const createUser = async (userData) => {
    const user = await User.create({
        name: userData.name,
        email: userData.email
    });

    return user;
};

module.exports = {
    getUsers,
    createUser
};