// import
const express = require("express");
const server = express();
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const tweetsRouter = require("./tweets/tweets-router");
const commentsRouter = require("./comments/comments-router");
const { restricted } = require("./auth/auth-middleware");

// global mw
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

// routers
server.get("/", (req,res)=>{
    res.send("<h1>Backend-Challenge Projesi(Twitter clone), server ayakta...</h1>")
})

server.use("/api/auth", authRouter);
server.use("/api/users", restricted, usersRouter);
server.use("/api/tweets", restricted, tweetsRouter);
server.use("/api/comments", restricted, commentsRouter);


// error mw
server.use((err,req,res,next)=>{
    res.status(err.status || 500).json({message: err.message || "Server Error!"});
})

// export
module.exports = server;