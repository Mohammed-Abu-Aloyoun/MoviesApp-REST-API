const nodemailer = require("nodemailer");


const sendEmail = async (subject,href,email)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.sendEmail, // generated ethereal user
          pass: process.env.sendEmailPassword, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'MovieSite', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
       html : `<a href="${href}">confirmEmail</a>`
   
      });
}

module.exports = sendEmail;