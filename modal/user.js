const mongoose = require('mongoose')


//a mongoose schema for user 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dqxpziuie/image/upload/v1592814826/Deafult-Profile-Pitcher_wpc8fg.png"     
    },
    followers:[
        {
            type:String
        }
    ],
    following:[
        {
            type:String
        }
    ]
})

mongoose.model("User",userSchema)