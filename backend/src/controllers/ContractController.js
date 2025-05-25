const JobModel = require('../models/JobModel');
const ContractModel = require('../models/ContractModel');
const PaymentModel = require('../models/PaymentModel');

exports.getAllContracts = async (req, res) => {
  try{
    const contracts = await ContractModel.find();
    res.status(200).json(contracts)
  }
  catch(err){
    res.status(500).json({message: err})
  }
}

exports.getContractById = async (req, res) => {
  try{
    const contract = await ContractModel.findById(req.params.id);
    res.status(200).json(contract)
  }
  catch(err){
    res.status(500).json({message: err})
  }
}

exports.getUserContracts = async (req, res) => {
  try{
    const contracts = await ContractModel.find({user_id: req.params.id});
    res.status(200).json(contracts)
  }
  catch(err){
    res.status(500).json({message: err})
  }
}

exports.deleteContract = async (req, res) => {
  try{
    const contract = await ContractModel.find({contract_id: req.params.id}).deleteOne()
    res.status(200).json(contract + 'has been deleted')
  }
  catch(err){
    res.status(500).json({message: err})
  }
}

exports.updateContract = async (req, res) => {
  try{
    const contract = await ContractModel.findOneAndUpdate(
      { contract_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.status(200).json(contract);
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: 'Error updating contract',
      error: err.message
    });
  }
}

