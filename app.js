const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const { Server } = require("socket.io");

const topicRoutes = require("./routes/topicRoutes.js");
const questionRoutes = require("./routes/questionRoutes.js");
const answerRoutes = require("./routes/answerRoutes.js");
const moduleRoutes = require("./routes/moduleRoutes.js");
const userAuthRoutes = require("./routes/userAuthRoutes.js");
const adminCmsRoutes = require("./routes/adminCmsRoutes");
const adminRoutes = require("./routes/adminroutes.js");
const userRoutes = require("./routes/userRoutes.js");

require("dotenv").config();

const app = express();

let corsOptions = {
  origin: ["http://localhost:3000", "https://www.cpslaboratory.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layout");

// Routes
app.use("/discussion", topicRoutes);
app.use("/discussion", questionRoutes);
app.use("/discussion", answerRoutes);

app.use("/api", moduleRoutes);
app.use("/user", userAuthRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set("layout", "layout");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", userAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/cms", adminCmsRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Server and Socket.io setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

// Socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("newQuestion", (questionData) => {
    io.emit("questionBroadcast", questionData);
  });

  socket.on("newAnswer", (answerData) => {
    io.emit("answerBroadcast", answerData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Export the app and server
module.exports = { app, server };
