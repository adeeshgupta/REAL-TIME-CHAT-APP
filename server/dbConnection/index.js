const mongoose = require("mongoose");

const DB_CONNECTION_URL = `mongodb+srv://adeesh:mongopass@cluster0.yxt6y.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = () => {
    console.log("DB trying to connect on " + new Date());

    const options = {
        keepAlive: true,
        maxPoolSize: 10,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    return mongoose.connect(DB_CONNECTION_URL, options);
};

module.exports = connectDB;