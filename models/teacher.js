const mongoose = require('mongoose');
 
const teacherSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true
    },
    score:{
        type: [
            {
                quiz_id : String,
                fscore : Number,
            }
        ],
        default: null,
    },
    role:{
        type:String,
        default:"student",
    },
    batch:{
        type:String,
        default:"F1",
    }
},{
    timestamps : true
});
const Teacher = new mongoose.model('Teacher',teacherSchema);
module.exports = Teacher;