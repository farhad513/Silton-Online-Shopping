const mongoose = require('mongoose');



const dataBaseConnection = () => {
    mongoose.connect(process.env.DB_URI)
        .then(() => console.log("Database Connection Successfully"))
    // .catch(() => console.log("Connection Failed"))
}

module.exports = dataBaseConnection;