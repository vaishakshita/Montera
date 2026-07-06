const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                message: "user already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        user.password = undefined;
        res.status(201).json({
            message: "User registered successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

const loginUser = async(req, res)=>{
    try{
        const{email, password} = req.body
        console.log("Email received:", email);
        const user = await User.findOne({email})
        console.log("User found:", user);

        //check if user exist in db
        if(!user){
            return res.status(400).json({message: "user not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        //chcek whether the password is correct
        if(!isMatch){
            return res.status(400).json({message: "invalid credentials"})
        }

        const token = jwt.sign(
            {id: user._id},
            "secretkey",
            {expiresIn: "1d"}
        )

        //user registered successfully
        user.password = undefined;
        res.status(200).json({
            message: "Login successful",
            token
        })
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { signupUser, loginUser }