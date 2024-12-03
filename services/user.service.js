const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { sendEmail } = require('../emails/user.email');


module.exports.signUp = async (req, res) => {
    const { name, email, password, age } = req.body;
    const user =  await userModel.findOne({email})
    if (user){
        return res.json ({message: 'Account already exists' })
    }else{
        bcrypt.hash(password, 4, async function(err, hash) {
            try {
                await userModel.insertMany({ name, email, password:hash , age });
                sendEmail({email,message:"hello"})
                res.json({ message: 'success' });
            } catch (error) {
                res.status(500).json({ message: 'Server Error', error: error.message });
            }// Store hash in your password DB.
        });
        
    }

    
};

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        const match = await bcrypt.compare(password, user.password);
        if (user) {
            if (match) {
                let token = jwt.sign({userId:user._id,name:user.name,emailConfirm:user.emailConfirm},'khankah')
                res.json({ message: 'success', token });
            } else {
                res.json({ message: 'login failed: incorrect password' });
            }
        } else {
            res.json({ message: 'login failed: user not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports.emailVerify = async(req,res)=>{
    const {email}=req.params
    let user = await userModel.findOne({email})
    if(user){
        await userModel.findOneAndUpdate({email},{emailConfirm:true})
        res.json({message:'Email verified'})
    }else{
      res.json({message:'Email not found'})
    }
};