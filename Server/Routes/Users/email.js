const nodemailer = require('nodemailer');

// mail transporter infos

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'officialef@hotmail.com',
        pass: '#####'
    }
})

const sendEmail = (name,email) =>{
    const mailOptions = {
        from: 'officialef@hotmail.com',
        to: `${email}`,
        subject: 'welcome to 9ossNet',
        text: `Mr/Mrs ${name}, we are pleased to have you in our platform, we want to tell you, feel free to contact us if you encounter any issue.Yours 9ossNet team.`
    };
    
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log(`Email is sent: ${info}`)
        }
    });
};

module.exports = {
    sendEmail
}
