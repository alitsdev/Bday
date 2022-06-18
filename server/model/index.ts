import mongoose from 'mongoose';
import conf from '../config';

mongoose.connect(
	`mongodb+srv://joanmarc:mongo1234@db-codeworks.rl4fowb.mongodb.net/bday`
);

export default mongoose;
