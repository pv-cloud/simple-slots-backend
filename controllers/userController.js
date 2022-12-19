
const User = require('../models/userModel')
const Score = require('../models/scoreModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

const loginUser = async (req,res) => {
    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        const username = user.username
        const token = createToken(user._id)

        res.status(200).json({username,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// const loginNew = async (req,res) => {
//     const {username,password} = req.body
//     try {
//         const user = await User.login(user, password)
//         const token = createToken(user._id)

//         res.status(200).json({username,token})
//     } catch (error) {
//         res.status(400).json({error:error.message})
//     }
// }

const signupUser = async (req,res) => {
    const {email,password,username} = req.body
    try {
        const user = await User.signup(email,password,username)
        const score = await Score.create({score: 10, user:user.id}) 

        const token = createToken(user._id)
        res.status(200).json({username:user.username,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    signupUser,
    loginUser
}