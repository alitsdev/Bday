import mongoose from 'mongoose';
import conf from '../config';

mongoose.connect(`mongodb://localhost:27017/${conf.dbName}`);

export default mongoose;
