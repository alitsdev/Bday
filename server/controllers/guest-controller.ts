import { Request, Response } from 'express';
import Guest from '../model/guest';
import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
async function main() {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
}

const getGuestList = async (req: Request, res: Response) => {
	try {
		const hostId = req.params.userId;
		const guests = await Guest.find({ host: hostId });
		res.send(guests);
	} catch (error) {
		res.status(500);
		res.end();
	}
};
const postGuest = async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const guest = req.body;
		if ((guest.host && guest.name && guest.email) !== '') {
			const savedGuest = await Guest.create(guest);
			let testAccount = await nodemailer.createTestAccount();

			// create reusable transporter object using the default SMTP transport
			let transporter = nodemailer.createTransport({
				host: 'smtp.ethereal.email',
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: testAccount.user, // generated ethereal user
					pass: testAccount.pass, // generated ethereal password
				},
			});

			// send mail with defined transport object
			let info = await transporter.sendMail({
				from: '"Fred Foo 👻" <foo@example.com>', // sender address
				to: `${savedGuest.email}`, // list of receivers
				subject: 'Hello ✔', // Subject line
				text: 'http://localhost:3000/alicia/invitation', // plain text body
				html: "<a href='http://localhost:3000/alicia/invitation'>you have an invite</a>", // html body
			});

			console.log('Message sent: %s', info.messageId);
			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
			res.status(201);
			res.send(savedGuest);
		} else {
			res.status(400);
			res.end();
		}
	} catch (error) {
		res.status(500);
		res.end();
	}
};

export default { getGuestList, postGuest };
