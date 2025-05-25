const UserModel = require('../models/userModel')


exports.getAllUsers = async (req, res) => {
    try{
        const users = await UserModel.find()
        res.status(200).json(users)
    }
    catch (err){
        res.status(500).json({message: err.message}) 
    }
}

exports.getUserById = async(req, res) => {
    try{
        const user = await UserModel.findById(req.params.id)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json(user)
    }
    catch (err){
        res.status(500).json({message: err.message}) 
    }
}

// Get users by role
exports.getUsersByRole = async (req, res) => {
  try {
    const role = req.params.role;
    const users = await UserModel.find({ role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.updateProfile = async(req, res) => {
    try{
        const user = await UserModel.findById(req.params.id)
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        // update if the new one is different from the old one
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.bio = req.body.bio || user.bio
        user.profile_image_url = req.body.profile_image_url || user.profile_image_url
        user.role = req.body.role || user.role
        user.updated_at = new Date()
        await user.save()
        res.status(200).json(user)
    }
    catch (err){
        res.status(500).json({message: err.message}) 
    }
}
