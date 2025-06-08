import { createTransport } from 'nodemailer';

const sendMail = async (email, subject, text) => {
    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text
    });
};

export default sendMail;