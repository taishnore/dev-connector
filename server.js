//how to bring express in.
const express = require("express");

//how to connect to DB -- look at the correct file
//does module.exports export a variable and function?
//then require either brings in a module or variable?
const connectDB = require("./config/db");

//this starts the server; running "npm run dev" starts the server
// with nodemon, which allows the server to process changes without
// having to restart the server manually.
const app = express();

//connect DB
connectDB();

//this is how i start the server; the domain for this would be
//localhost:5000/
app.get("/", (req, res) => {
  res.send("api running");
});

//Define Routes -- these are referring to the routes files,
//which are analogous to controllers, i think. maybe not though.
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

//for the sake of deploying this app.
const PORT = process.env.PORT || 5000;

//this function actually starts the server, and designates the port.
app.listen(PORT, () => console.log(`Server running on: ${PORT}`));
