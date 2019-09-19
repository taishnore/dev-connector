//how to bring express in.
const express = require("express");

//todo what does path do?
const path = require("path");

//todo how does this work?
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

//todo what does this do? how does it work?
//Init Middleware -- this allows us to get the data in
//req.body in the User post("/") request/route
//req, remember, is coming from the users.
//res is what the server sends back.
//I can imagine that there'll be conditionals and shit.
app.use(express.json({ extended: false }));

//this is how i start the server; the domain for this would be
//localhost:5000/
// app.get("/", (req, res) => {
//   res.send("api running");
// });

//todo where is the port defined? .env?
//this is how the endpoints are defined
//Define Routes -- these are referring to the routes files,
//which are analogous to controllers, i think. maybe not though.
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// serve static assets in production
//this had to do with deployment
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//for the sake of deploying this app.
const PORT = process.env.PORT || 5000;

//this function actually starts the server, and designates the port.
app.listen(PORT, () => console.log(`Server running on: ${PORT}`));
