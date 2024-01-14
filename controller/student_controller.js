// const Student = require('../models/student');

const Student = require('../models/teacher');
const Quiz=require('../models/quiz');
const Question = require('../models/questions')
const db = require('../config/mongoose');
const { model } = require('mongoose');
const bcrypt=require('bcryptjs');
const Teacher = require('../models/teacher');

module.exports.home = function(req,res){
    if(req.isAuthenticated() && req.user.role=='teacher'){
        console.log('ok');
        return res.redirect('/teacher/logout');
    }
    if(req.isAuthenticated()){
        return res.redirect('/student/studentinrt');
    }
    else if(!req.isAuthenticated){
        return res.render('Alert');
    }
    else
     return res.render("studentlogin");
}

module.exports.signup = function(req,res){
    return res.render("studentlogin");
}
module.exports.livequiz = function(req,res){
    //return res.render("playquiz");
    let id = req.query.id;
    console.log(req.user.id);

    const getquiz = async ()=>{
        try{
        const ress = await Question.find({quizid : id});
        const res2 = await Quiz.findOne({_id:id});
        const result = await Teacher.updateOne(
            { _id: req.user.id },
            {
                $push: {
                    score: {
                        quiz_id: id,
                        fscore : 0
                    }
                }
            }
        );
        await Quiz.updateOne(
            {_id:id},
            {
                $push:{
                    attempted:req.user.id
                }
            }
        )
        return res.render('playquiz',{
            past_quiz:ress,
            quizname:res2.quizname,
            timer:res2.time
        }
        );
        }catch(err){
            console.log(err);
            return ;
        }
    }
    getquiz();
}
module.exports.nextpage=function(req,res){
    return res.render("studentinterface");
}

module.exports.logout = function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
}


module.exports.viewquiz = function(req,res){
    var batch = req.user.batch;

    console.log(batch);
    const getquiz = async ()=>{
        const ress = await Quiz.find({
            $and: [
                { upload: true },
                { batches: {$in:[batch]} },
                { 'attempted': { $nin: [req.user.id] } }
            ]
        });
        
        //const ress = await Quiz.find({ upload: true, batches: { $in: [batch] } });
        //console.log(ress);
        return res.render('viewquizstudent',{
            title : "Past Quiz!",
            past_quiz: ress
        });
    }
    getquiz();
}


module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_pass){
        return res.redirect('back');
    }
    const find = async()=>{
        try{
            const user = await Student.findOne({email : req.body.email});

            if(!user || user.role!="student"){
                req.body.role = "student";
                console.log(req.body);
                const data = new Student(req.body);
                const salt=await bcrypt.genSalt(10);
                let pass=await bcrypt.hash(req.body.password,salt);
               // let rol="teacher";
                Student.create({
                    email:req.body.email,
                    password:pass,
                    name:req.body.name,
                    batch : req.body.batch
                })
                //data.save();
                console.log("data");
                console.log("I am Here");
                return res.redirect('/student');
            }
            else{
                return res.redirect('Alert');
            }
        }
        catch(err){
            console.log(err);
        }
    }
    find();
};
module.exports.saveanswer= async function(req,res){
    console.log(req.body);
    console.log(req.user.id);
    try {
        const { questionId, answer } = req.body;
        var f=0;
        for (let i = 0; i < questionId.length; i++) {
            const currentQuestionId = questionId[i];
            if(currentQuestionId>=0&&currentQuestionId<10){f=1;break;}
            console.log(currentQuestionId)
            const currentAnswer = answer[i];
            const studentId = req.user.id;
            const result = await Question.updateOne(
                { _id: currentQuestionId },
                {
                    $push: {
                        response: {
                            stu_id: studentId,
                            answer: currentAnswer
                        }
                    }
                }
            );
        }
        if(f==1){
            const currentQuestionId = questionId;
            console.log(currentQuestionId)
            const currentAnswer = answer;
            const studentId = req.user.id;
            const result = await Question.updateOne(
                { _id: currentQuestionId },
                {
                    $push: {
                        response: {
                            stu_id: studentId,
                            answer: currentAnswer
                        }
                    }
                }
            );
        }
        
    } catch (error) {
        console.error('Error submitting quiz:', error);
    }
    return res.redirect('/student');
}
module.exports.createSession = function(req,res){
    return res.redirect('/student/studentinrt');
}
module.exports.changepassword = function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('Alert');
    }
    return res.render("Studentchangepassword");
}