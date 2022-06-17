import mongoose from 'mongoose';
import conf from '../config';

mongoose.connect(`mongodb://localhost:27017/${conf.dbName}`);

// mongoose.connect(
// 	`mongodb+srv://xfortunyi:Benages01@cluster0.yi5lf.mongodb.net/?retryWrites=true&w=majority`
// );

export default mongoose;
