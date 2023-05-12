const userModel = require("../../../db/model/user.model");
const bcrypt = require('bcryptjs');
const sendEmail = require("../../../services/email");
const jwt = require('jsonwebtoken');
const {nanoid} = require('nanoid');
const home =(req,res)=>{
        const code = nanoid(4);
        res.json({msg:"main",code:code});
}
// register
 const register = async (req,res)=>{
                res.json("sucss");
        const { name,email,password,age } = req.body;
                const checkEmail = await userModel.findOne({email});
        if(checkEmail)
                res.json({msg:"email already exist"});
        else {
                const hashpassword = await bcrypt.hash(password,+process.env.hashSalt);
                const newUser = await new userModel({name,email,age,password:hashpassword});
                const saveUser =  await newUser.save();
                        if(saveUser) {
                                const userId = jwt.sign({_id:saveUser._id},process.env.tokenConfirmEmail);
                                sendEmail("Confirm Email",`${req.protocol}://${req.headers.host}/auth/confirmEmail/${userId}`,"mohmadjhad49@gmail.com");
                                res.json({msg:"user has been added"});
                        }else
                                res.json({msg:'something wrong in add user'})
        }
}
// confirm email

const confirmEmail = async (req,res)=>{
        const { token } = req.params;
         
                try{
                        const decode = jwt.verify(token,process.env.tokenConfirmEmail);
                             const user = await userModel.findById({_id:decode._id});
                        if(user.confirmEmail == false){
                                const updateConfirmEmail = await userModel.findByIdAndUpdate(user._id,{confirmEmail:true});
                                        res.json({msg:"email confirmed"});
                        }else {
                                        res.json({msg:"email already confirmed"});
                        }
                                   
                }catch(error){
                        res.json({msg:error});
                }
       
         

}
// login 

const login = async (req,res) =>{
        const { email,password } = req.body;
               
                const checkEmail = await userModel.findOne({email});
                        if(!checkEmail)
                                res.json({msg:'email not exist'});
                        else {  
                                if(!checkEmail.confirmEmail)
                                        res.json({msg:"the email not confirm"});
                                else{
                                const match = await bcrypt.compare(password,checkEmail.password);
                                        if(!match)
                                                res.json({msg:'the passwrod or email not correct'});
                                        else{
                                                const token = jwt.sign({_id:checkEmail._id},process.env.tokenLogin);
                                                        res.json({msg:"login sucss",token});
                                        }
                        }         }
}

module.exports = { home,register,confirmEmail,login };
