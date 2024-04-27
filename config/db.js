const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            dbName: "room-booking1"
        })
        console.log(`connected to Mongodb database ${mongoose.connection.host}`.bgMagenta
            .white);
    }
    catch (error) {
        console.log(`mongdb error ${error}`);
    }
};

module.exports = connectDB;