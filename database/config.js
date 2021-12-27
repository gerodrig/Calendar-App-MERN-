const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB connection successful');

    } catch (error) {
        console.log(error);
        throw new Error('There was an error when trying to initiliaze the database');
    }


}

module.exports = {
    dbConnection
}
