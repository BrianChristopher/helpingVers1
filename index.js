const users = require("./routes/users");
const express = require("express");
const app = express();
app.use(express.json());

//This makes sure that the server is actually running.
app.get("/", (req, res) => {
  res.send("Hello, mundo!");
});

//ROUTES
app.use("/api/users/", users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
