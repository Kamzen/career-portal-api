const { Op } = require("sequelize");
const { 
  Address, 
  sequelize, 
  User, 
  StudentInformation, 
  BasicEducation,
  TertiaryEducation 
} = require("../models");
const { ApiError, ApiResp } = require("../utils/Response");

const StudentController = {

  editStudentBasicInformation: async (req, res, next) => {

    const t = await sequelize.transaction();

    try {
      const { userId } = req.params;

      const user = await User.findOne( 
        { where: { id: userId }}, 
        { transaction: t }
      );
      const studentInfo = await StudentInformation.findOne(
        { where: { userId: userId }},
        { transaction: t }
      )

      if(!user || !studentInfo) throw new ApiError('Error saving user basic information', 404);

      await user.update({...req.body}, { transaction: t });
      await studentInfo.update({...req.body}, { transaction: t })

      console.log(user)
      console.log(studentInfo)

      await t.commit()

      return res.status(200).json(ApiResp('User basic information updated successfully'))

    } catch (e) {

      console.log(e);
      await t.rollback();
      next(e);

    }
  },

  addStudentAddress: async (req, res, next) => {

    try {

      const address = await Address.create({
        ...req.body,
        userId: req.user.id
      });

      if (!address) throw new ApiError("Error saving address", 404);

      return res.status(201).json(ApiResp("Address saved successfully"));

    } catch (e) {

      console.log(e);
      next(e);

    }
  },

  editStudentAddress: async (req, res, next) => {
    
    try{

      const { addressId } = req.params;

      const address = await Address.findOne({
        where: { [Op.and]: [{ id: addressId }, { userId: req.user.id }] }
      });

      if (!address) throw new ApiError("Address edit error", 404);

      await address.update({ ...req.body });

      return res.status(200).json(ApiResp("Address updated successfully"));

    }catch(e){
      
      console.log(e)
      next(e)

    }

  },

  addBasicEducation: async (req, res, next) => {

    try{

      const basicEducation = await BasicEducation.create(req.body);

      if(!basicEducation) throw new ApiError('Error saving basic aducation info', 404);

      return res.status(201).json(ApiResp('Basic education saved successfully'));

    }catch(e){

      console.log(e)
      next(e)

    }
  },

  editBasicEducation: async (req, res, next) => {

    try{

      const { basicEducationId } = req.params; 

      const basicEducation = await BasicEducation.findOne({where: { id : basicEducationId }});

      if(!basicEducation) throw new ApiError('Error updating basic education info', 404);

      await basicEducation.update({ ...req.body });

      return res.status(200).json(ApiResp('Basic education info updated successfully'));

    }catch(e){

      console.log(e)
      next(e)

    }
  },

  addTertiaryEducation: async (req, res, next) => {

    try{

      const tertiaryEducation = await TertiaryEducation.create({ ...req.body });

      if(!tertiaryEducation) throw new ApiError('Error saving tertiary education info', 404);

      return res.status(201).json(ApiResp('Tertiary education info saved successfully'));

    }catch(e){

      console.log(e)
      next(e)

    }

  },

  editTertiaryEducation: async (req, res, next) => {

    try{

      const { tertiaryEducationId } = req.params;

      const tertiaryEducation = await TertiaryEducation.findOne({ where: { id: tertiaryEducationId } });

      if(!tertiaryEducation) throw new ApiError('Error updating tertiary education info');

      await tertiaryEducation.update({ ...req.body });

      return res.status(200).json(ApiResp('Tertiary education info updated successfully'));


    }catch(e){

      console.log(e)
      next(e)

    }

  }

};

module.exports = StudentController;
