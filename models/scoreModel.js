const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scoreSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true
    },
    turn : {
        type:Number,
        required:false
    },
    score : {
        type:Number,
        required:false
    },
    time : {
        type:String,
        required:false
    }
},{timestamps:true})


module.exports = mongoose.model('Score',scoreSchema)