const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function signup(req ,res) {
    try {
        const {username, email, password} =  req.body;

        const userExist = await User.findOne({email});

        if (userExist) {
            res.status(400).json({ message : 'Account already exists...' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = new User({ username: username, email: email, password: hashedPassword });

            const newUser = await userData.save();

            const token = jwt.sign(
                { userId: newUser._id, email: newUser.email},
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )
            res.status(201).json({ message:"Account created successfully...", token });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}

async function login(req ,res) {
    try {
        const {email, password} = req.body;
        const userData = await User.findOne({email});

        if (userData) {
            const passwordMatch = await bcrypt.compare(password,userData.password)
            if (passwordMatch) {
                const token = jwt.sign(
                    { userId:userData._id, email:userData.email },
                    'secret key',
                    { expiresIn: '1h' }
                    
                )
                res.status(200).json({ message: 'Login successful...', token });
            } else {
                res.status(400).json({ message: 'Invalid password...' });
            }
        } else {
            res.status(400).json({ message: 'Account does not exist...' });
        }



    } catch (error) {
        res.status(500).json({ message: error.message })
        
    }
}


module.exports = {
    signup,
    login

}