const express = require('express');
const router  = express.Router();
const passport = require('passport');
const student_controller = require('../controller/student_controller');
router.get("/", student_controller.home);
router.get("/signup", student_controller.signup);
router.get('/changepassword',student_controller.changepassword);
router.get("/viewquizstudent", student_controller.viewquiz);
router.post('/saveanswer',student_controller.saveanswer);
router.get("/displaylive",student_controller.livequiz);
router.get("/logout", student_controller.logout);
router.post('/create',student_controller.create);
router.get('/studentinrt',passport.checkAuthentication,student_controller.nextpage);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/teacher/alert'},
),student_controller.createSession);

module.exports = router;