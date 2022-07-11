import mongoose from './';
const Schema = mongoose.Schema;
const templateSchema = new Schema({
	host: String,
	stickers: [],
	name: String,
	age: Number,
	date: Date,
	time: String,
	address: String,
});
const Template = mongoose.model('Template', templateSchema);

export default Template;
