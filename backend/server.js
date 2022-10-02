const app = require('./app');
const dataBaseConnection = require("./config/database");


// Configeration port number
require('dotenv').config({ path: "backend/config/.env" })

// handleing uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled uncaught exception`);
    process.exit(1)
})

dataBaseConnection();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})


// Unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
})