const { application } = require("express");
const express = require("express");
require ("dotenv").config();
const { dbConnection } = require("./database/config");
const cors = require("cors");


//Create express server
const app = express();

//database connection
dbConnection();

//CORS
app.use(cors());

//Publid folder
app.use(express.static("public"));

//define environment variables
const PORT = process.env.PORT || 8081;

//Read and body parse
app.use( express.json() );

//define root route
//DEFINE USER ROUTES
app.use("/api/auth", require("./routes/auth"));

//CRUD: events
app.use("/api/events", require("./routes/events"));





//listen on port 8080
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
