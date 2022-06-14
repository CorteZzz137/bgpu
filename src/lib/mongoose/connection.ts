import mongoose from 'mongoose';
import { mongoUri } from '$lib/config/dotenv';

const uri = mongoUri || 'mongodb://127.0.0.1:27017/testtest';

mongoose
	.connect(uri)
	.catch((error) => console.error(error))
	.then(() => console.log('Mongoose connected'));

mongoose.connection.on('error', (err) => {
	console.error(err);
});
