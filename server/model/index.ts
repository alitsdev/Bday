import mongoose from 'mongoose';
import conf from '../config';

mongoose.connect(
  `mongodb+srv://joanmarc:mongo1234@db-codeworks.rl4fowb.mongodb.net/bday`
);

// mongoose.connect(
// 	`mongodb+srv://xfortunyi:Benages01@cluster0.yi5lf.mongodb.net/?retryWrites=true&w=majority`
// );

export default mongoose;
