const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const menuItems = require("./routes/menuItems");
const ingredients = require("./routes/ingredients");
const categories = require("./routes/categories");
const express = require("express");
const app = express();
app.use(express.json());

//Connects to mongoDB
mongoose
  .connect("mongodb://localhost/helpingVers1", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Failed to connect to MongoDB..."));
//This removes a deprication warning see: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose.set("useFindAndModify", false);

//This makes sure that the server is actually running.
app.get("/", (req, res) => {
  res.send("Hello, mundo!");
});

//ROUTES
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/menuItems", menuItems);
app.use("/api/ingredients", ingredients);
app.use("/api/categories", categories);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
