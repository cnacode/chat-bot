import mongoose from 'mongoose';

const URL = process.env.DB_URL || '';

if(URL === '') console.error('MongoDB connection error: DB URL is empty');

mongoose.connect(URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected to MongoDB database")
});

export default db;