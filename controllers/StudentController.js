const { Op } = require('sequelize');
const { Address } = require('../models');
const { ApiError, ApiResp } = require('../utils/Response');

const StudentController = {

  editStudentBasicInformation: (req, res, next) => {
    
  },

  addStudentAddress: async (req, res, next) => {

    try{

      const address = await Address.create({...req.body, userId: req.user.id});

      if(!address) throw new ApiError('Error saving address', 404);

      return res.status(201).json(ApiResp('Address saved successfully'))

    }catch(e){
      console.log(e)
      next(e)
    }

  },

  editStudentAddress: async (req, res, next) => {

    const { addressId } = req.params;

    const address = await Address.findOne({
      where: {[Op.and]: [
        { id: addressId },
        { userId: req.user.id }
      ]}
    })

    if(!address) throw new ApiError('Address edit error', 404);

    await address.update({...req.body});

    return res.status(200).json(ApiResp('Address updated successfully'))

  },
  
}

module.exports = StudentController;