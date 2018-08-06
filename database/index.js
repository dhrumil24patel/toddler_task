const { Mongoose } = require('mongoose');

let connection = null;

const connectToDB = async () => {
    const mongoose = new Mongoose();
    mongoose.Promise = global.Promise;

    let mongoUserCredentials = '';
    if (process.env.MONGO_USER && process.env.MONGO_PASSWORD) {
        mongoUserCredentials = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`;
    }
    else{
      mongoUserCredentials = 'dhrumil:dhrumil3@';
    }

    // const MONGO_URL = process.env.MONGO_URL || 'localhost:27017';
    const MONGO_URL = process.env.MONGO_URL || 'ds147011.mlab.com:47011';
    // const DB_NAME = process.env.MONGO_DB_NAME || 'sample-db';
    const DB_NAME = process.env.MONGO_DB_NAME || 'heroku_c2699pc2';
    const MONGO_CONNECTION_STRING = `mongodb://${mongoUserCredentials}${MONGO_URL}/${DB_NAME}`;

    await mongoose.connect(MONGO_CONNECTION_STRING);
    connection = mongoose;
};

const getDB = () => {
    if (!connection) {
        throw new Error('Call connectToDB first');
    }
    return connection;
};

module.exports = {
    connectToDB,
    getDB,
};
