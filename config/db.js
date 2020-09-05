const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Main goal is to call mongoose.connect and pass int
        // URI
        // Other configurations
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology :true,
            useFindAndModify : false
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

}

// Outside of function
// This line allows us to run connectDB in the app.js file
module.exports = connectDB;
