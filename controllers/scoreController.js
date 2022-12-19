const { Types } = require('mongoose')
const Score = require('../models/scoreModel')

const addScore = async (req,res) => {
    const {turn,time} = req.body
    const user_id = req.user
    if(turn || time){
        const exists = await Score.find({user: new Types.ObjectId(user_id)}).select('_id')         
        if(exists.length>0){           
            try {
                const oldTrun = await Score.find({user: new Types.ObjectId(user_id)}).select('turn') 
                if(turn < oldTrun[0].turn) {         
                    const score = await Score.findOneAndUpdate({user: new Types.ObjectId(user_id)},{turn,time})
                    return res.status(200).json({action:"update",score})    
                }   
                else{
                    return res.status(200).json({action:"Score not sufficient"})                 
                }                
            } catch (error) { 
                return res.status(401).json({error:error.message})
            }
        }
        else{          
            try { 
                const score = await Score.create({turn,time,user:user_id}) 
                return res.status(200).json({action:"create",score})
            } catch (error) {
                return res.status(401).json({error:error.message})
            }
        }
    }
    else return res.status(401).json({error:'All fileds required'})
}

const getScores = async (req,res) => {  
    const scores = await Score.find().populate('user','username').select(['turn','time','updatedAt']).sort({'turn':1})
    return res.status(200).json(scores)   
}

const updateScore = async (req,res) => {
    const user_id = req.user
    const {updatedScore} = req.body

    const exists = await Score.find({user: new Types.ObjectId(user_id)}).select('_id')  

    if (exists.length>0) {           
        try {
            const score = await Score.findOneAndUpdate({user: new Types.ObjectId(user_id)},{turn: 2,time: "00:56", score: updatedScore})
            return res.status(200).json({action:"update",score})   
        } catch (error) { 
            return res.status(401).json({error:error.message})
        }
    } else {
        try { 
            const score = await Score.create({turn: 1, time: '00:55', user: user_id, score: updatedScore}) 
            return res.status(200).json({action:"create",score})
        } catch (error) {
            return res.status(401).json({error:error.message})
        }
    }
}

const getMyScore = async (req,res) => {  
    const user_id = req.user

    const scores = await Score.find({user: user_id}).populate('user','username')
    return res.status(200).json(scores)   
}

module.exports = {
    addScore,
    getScores,
    updateScore,
    getMyScore
}