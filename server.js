const users = require("./routes/users");
const auth = require("./routes/auth");
const menuItems = require("./routes/menuItems");
const ingredients = require("./routes/ingredients");
const categories = require("./routes/categories");
const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

//This is CORS middleware (for development only?)
app.use(cors())
app.options('*', cors())
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

//This is what I added from MERN boilerplate
const path = require("path");
const PORT = process.env.PORT || 3001;

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


//Confirm that environmental variable is set for private keys
if (!config.get('jwtPrivateKey')){
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

//Connects to mongoDB
mongoose
  .connect("mongodb://localhost/helpingVers1", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Failed to connect to MongoDB..."));
//This removes a deprication warning see: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose.set("useFindAndModify", false);

//This makes sure that the server is actually running.
// app.get("/", (req, res) => {
//   res.send("Hello, mundo!");
// });

//API ROUTES
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/menuItems", menuItems);
app.use("/api/ingredients", ingredients);
app.use("/api/categories", categories);


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(PORT, () => console.log(`API server Listening on port ${PORT}...`));
