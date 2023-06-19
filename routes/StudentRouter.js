const {Router} = require('express');
const StudentController = require('../controllers/StudentController');
const AuthMid = require('../middlewares/AuthMid');

const StudentRouter = Router();

StudentRouter.post('/addAddress', AuthMid, StudentController.addStudentAddress);
StudentRouter.post('/editAddress/:addressId', AuthMid, StudentController.editStudentAddress);
StudentRouter.post('/editBasicInformation/:userId', AuthMid, StudentController.editStudentBasicInformation);
StudentRouter.post('/addBasicEducation', AuthMid, StudentController.addBasicEducation);

module.exports = StudentRouter;