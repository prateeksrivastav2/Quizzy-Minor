const express = require('express');
const router  = express.Router();
const passport = require('passport');
const teacher_controller = require('../controller/teacher_controller');


router.get("/", teacher_controller.home);
router.get("/alert", teacher_controller.alert);
router.get("/alert2", teacher_controller.alert2);
router.get("/signup", teacher_controller.signup);
router.get("/quizmaker", teacher_controller.quizmaker);
router.get('/logout',teacher_controller.logout);
router.get('/changepassword',teacher_controller.changepassword);
router.get('/pastquiz',teacher_controller.pastquiz);
router.get('/viewquiz',teacher_controller.viewquiz);
router.get('/viewres',teacher_controller.viewres);
router.get('/eval',teacher_controller.evaluate);
router.get('/deletequiz',teacher_controller.deletequiz);
router.get('/endquiz',teacher_controller.endquiz);
router.get('/completed',teacher_controller.completed);
router.get('/deleteques',teacher_controller.deleteques);
router.post('/changepass',passport.checkAuthentication,teacher_controller.changepass);
router.post('/createquiz',teacher_controller.createQuiz);
router.get('/addquestion',teacher_controller.addQuestion);
router.get('/upload',teacher_controller.upload);
router.post('/addnewquestion',teacher_controller.addnewQuestion);
router.get('/viewres',teacher_controller.viewres)
router.get('/sign-up',teacher_controller.signup);
router.post('/create',teacher_controller.create);
router.post('/addbatch',teacher_controller.addbatch);
router.get('/teacherinrt',passport.checkAuthentication,teacher_controller.nextpage);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/teacher/alert'},
),teacher_controller.createSession);

module.exports = router;