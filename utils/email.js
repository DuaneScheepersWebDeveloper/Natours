const nodemailer = require('nodemailer');
const { resetPassword } = require('../controllers/authController');

const sendEmail = async options =>{
   //1.Create a transporter
   const transporter = nodemailer.createTransport({
      host:process.env.EMAIL_HOST,
      port:process.env.EMAIL_PORT,
      auth:{
         user:process.env.EMAIL_USERNAME,
         pass:process.env.EMAIL_PASSWORD
      }
      //Activate in gmail "less secure app" option
   });

   //2.Define the email options
   const mailOptions = {
      from:"Duane <admin6@admin.co.za>",
      to:options.email,
      subject:options.subject,
      text:options.message,
      //html:
   };
   //3.Actually send the email
   await transporter.sendMail(mailOptions);


}
module.exports = sendEmail;