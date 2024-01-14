var mongoose = require('mongoose')
var questionSchema = mongoose.Schema({
    quizid: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    questionText:{
        type: String, 
        required: true
    },
    response: {
        type: [
            {
                stu_id: String,
                answer: String
            }
        ],
        default: null,
    },
})
module.exports = mongoose.model('question',questionSchema);

