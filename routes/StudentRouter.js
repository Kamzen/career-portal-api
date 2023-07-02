const { Router } = require('express');
const StudentController = require('../controllers/StudentController');
const AuthMid = require('../middlewares/AuthMid');

const StudentRouter = Router();

StudentRouter.post('/addAddress', AuthMid, StudentController.addStudentAddress);
StudentRouter.put('/editAddress/:addressId', AuthMid, StudentController.editStudentAddress);
StudentRouter.put('/editBasicInformation/:userId', AuthMid, StudentController.editStudentBasicInformation);
StudentRouter.post('/addBasicEducation', AuthMid, StudentController.addBasicEducation);
StudentRouter.put('/editBasicEducation/:basicEducationId', AuthMid, StudentController.editBasicEducation);
StudentRouter.post('/addTertiaryEducation', AuthMid, StudentController.addTertiaryEducation);
StudentRouter.put('/editTertiaryEducation/:tertiaryEducationId', AuthMid, StudentController.editTertiaryEducation);
StudentRouter.post('/addProfessionalSkill', AuthMid, StudentController.addProfessionalSkill);
StudentRouter.put('/editProfessionalSkill/:professionalSkillId', AuthMid, StudentController.editProfessionalSkill);

module.exports = StudentRouter;