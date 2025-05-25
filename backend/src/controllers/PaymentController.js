const JobModel = require('../models/JobModel');
const ContractModel = require('../models/ContractModel');
const PaymentModel = require('../models/PaymentModel');

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await PaymentModel.find();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserPayments = async (req, res) => {
    try{
        const payments = await PaymentModel.find({user_id: req.params.id});
        res.status(200).json(payments);
    }
    catch (err){
        res.status(500).json({message: err.message}) 
    }
}

