import mongoose from 'mongoose';
import conf from '../config';

mongoose.connect(
	`mongodb+srv://${process.env.REACT_APP_MONGO_NAME}:${process.env.REACT_APP_MONGO_PASSWORD}@db-codeworks.rl4fowb.mongodb.net/${process.env.REACT_APP_MONGO_DATABASE}`
);

export default mongoose;
