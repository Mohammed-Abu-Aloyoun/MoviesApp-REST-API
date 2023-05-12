const { array, valid } = require("joi");

/*
const valdiation = (schema)=>{
        return (req,res,next)=>{
                const valdiationResult = schema.body.validate(req.body,{abortEarly:false});
                        if(valdiationResult.error){
                            const error = valdiationResult.error.details;
                            res.json({msg:error})
                        }else {
                                next();
                        }
                      
                        }

        }
*/
const validArray = ['body','params','headers'];
const valdiation = (schema)=>{
                return (req,res,next)=>{
                        validArray.forEach( key=>{
                                if(schema[key]){
                                  const result = schema[key].validate(req[key]);
                                                if(result?.error){
                                                        validArray.push(result.error.details);
                                                }
                                }
                 })
                        if(validArray.length > 0)
                                res.json({msg:validArray})
                        else   
                                next()
        }
}


module.exports = valdiation;
