const jwt = require('jsonwebtoken');
const userModel = require('../../../db/model/user.model');
const bcrypt = require('bcryptjs');
const sendEmail = require("../../../services/email");
const home = (req,res)=>{
    res.json({msg:"main user"});
}

const updatePassword = async (req,res)=>{
        const { oldPassword,newPassword } = req.body; 
        const _id = req.userId;
                            const user = await userModel.findById({_id});
                            const match = await bcrypt.compare(oldPassword,user.password);
                                if(!match)
                                    res.json({msg:"the password not correct"});
                                else {
                        
                                    const hashpassword = await bcrypt.hash(newPassword,+process.env.hashSalt);
                                    const updatePassword = await userModel.findByIdAndUpdate(_id,{password:hashpassword});
                                        if(!updatePassword)
                                            res.json({msg:'faild update your password'});
                                        else
                                            res.json({msg:'your password been updated'});    
                                } 
                    }
     
     
   
    // forget password
    const forgetPassword = async (req,res)=>{
            const { email } = req.body;
                const user =  await userModel.findOne({email});
                    if(!user)
                        res.json({msg:'the email not exist'});
                    else{
                        const userId = jwt.sign({_id:user._id},process.env.tokenRecoverAccount);
                        sendEmail("recover your account",`${req.protocol}://${req.headers.host}/user/recoverAccount/${userId}`,"mohmadjhad49@gmail.com");
                        res.json({msg:"we send the link for recover in your email"});
                    }        

            
                        
                        
    }

    const recoverAccount = async (req,res)=>{
            const { id } = req.params;
                const { newPassword,confirmPassword } = req.body;

            try{
                const decode = jwt.verify(id,process.env.tokenRecoverAccount);
                        if(newPassword != confirmPassword)
                            res.json({msg:"not match"});
                        else{
                            
                                const hashPassword = await bcrypt.hash(newPassword,+process.env.hashSalt);
                                    
                                const updatePassword = await userModel.findByIdAndUpdate(decode._id,{password:hashPassword})
                                    if(!updatePassword)
                                        res.json({msg:"we have a problem"});
                                    else
                                        res.json({msg:"your password has been update"});
                        }     
            }catch(error){
                    res.json({msg:error});
            }
                
    }


module.exports = { home,updatePassword,forgetPassword,recoverAccount };
