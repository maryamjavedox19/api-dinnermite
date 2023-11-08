const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    // incorrect email
    if (err.message === "incorrect email") {
        errors.email = "Email/Password is incorrect";
    }

    // incorrect password
    if (err.message === "incorrect password") {
        errors.password = "Email/Password is incorrect";
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};

module.exports.admin_register = async (req, res) => {
    const { name, email, password, address, profilePic } = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password,
            address,
            profilePic,
        });

        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({
            isAdmin: user.isAdmin,
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address
        });
    } catch (err) {
        const errors = handleErrors(err);
        const errorsText = Object.values(errors).join(" ");
        res.status(400).send(errorsText);
    }
};


module.exports.admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email && !password) {
            return res
                .status(400)
                .send("email and password are required");
        }

        if (!email) {
            return res
                .status(400)
                .send("email is required");
        }

        if (!password) {
            return res
                .status(400)
                .send("password is required");
        }
        const user = await User.login(email, password);
        if (!user) {
            return res.status(400).send("User not found");
        }
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({
            token,
            isAdmin: user.isAdmin,
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            role : user.role
        });
    } catch (err) {
        const errors = handleErrors(err);
        const errorsText = Object.values(errors).join(" ");
        res.status(400).send(errorsText);
    }
};


module.exports.admin_logout = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200);
        res.cookie("jwt", "", { maxAge: 1 });
        res.send("user logged out");
    } else {
        res.status(400).send("user not found");
    }
};

// delete user
module.exports.admin_delete_user = async (req, res) => {
    try {
        const user = User.findById(req.params.id);
        if (!user) {
            res.status(404).send("user not found");
        }

        else {
            await user.deleteOne();
            res.send('user deleted')
        }
    }

    catch (err) {
        res.status(500).send("Internal server error");

    }

}