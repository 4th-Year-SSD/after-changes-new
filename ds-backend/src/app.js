require("dotenv").config();
const express = require("express");
import cors from "cors";
import routes from "./routes/index.routes.js";
import connectDB from "./database";
import { generateToken } from "./middleware/csrf.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import https from 'https';
import fs from 'fs';
import path from "path";

const app = express();

app.use(express.json({ limit: "1mb" }));

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  })
);

app.use(
  session({
    secret: "some-secret-key", // Change this to a real secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Set secure to true in production if using HTTPS
  })
);

app.use(cookieParser(process.env.COOKIES_SECRET));

app.get("/csrf", (req, res) => {
  const token = generateToken(req, res);

  res.status(200).json({
    message: "csrf received successfully",
    token: token,
  });
});

app.use("/api", routes);

connectDB();

// Auth service is runiing on port 3001
const port = process.env.PORT || 3001;

const options = {
  key: Buffer.from(process.env.PVT_KEY,"base64").toString("ascii"),
  cert: Buffer.from(process.env.CERTIFICATE,"base64").toString("ascii")
}

const sslServer = https.createServer(options,app)

sslServer.listen(port, () => {
  console.log(`Herbie Auth server successfully started on port ${port}`);
});
