require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 5000;

const connectDb = require("./db/db");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

app.use("/api/user", require("./routes/userRoutes"));

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

connectDb()
  .then(() => {
    server.listen(port, () =>
      console.log(
        `Server is up and running on the port ${port}`.underline.magenta.bold
      )
    );
  })
  .catch((err) => console.log(err));
