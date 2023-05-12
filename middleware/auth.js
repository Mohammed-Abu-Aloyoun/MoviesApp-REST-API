const jwt = require('jsonwebtoken');

const auth =  _=>{

        return (req,res,next)=>{
            const { token } = req.headers;
            if(!token.startsWith("soso__"))
                res.json({msg:"barer token not correct"});
            else {
                try {
                    const decode = jwt.verify(token.split("__")[1],process.env.tokenLogin);
                        req.userId = decode._id;
                            next();
                }catch(error){
                        res.json({msg:error});
                }
            }
        }
}


module.exports = auth;
