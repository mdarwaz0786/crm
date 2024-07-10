import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDatabase from "./database/connectDatabase.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import customerRoute from "./routes/customer.route.js";
import projectTypeRoute from "./routes/projectType.route.js";
import projectCategoryRoute from "./routes/projectCategory.route.js";
import projectStatusRoute from "./routes/projectStatus.route.js";
import projectRoute from "./routes/project.route.js";
import teamRoute from "./routes/team.route.js";
import projectTimingRoute from "./routes/projectTiming.route.js";
import roleRoute from "./routes/role.route.js";

const __dirname = path.resolve();

// configuration
dotenv.config();

// connect MongoDB database
connectDatabase();

// rest object
const server = express();

// middleware
server.use(express.json());
server.use(cors());

// test route
server.use("/api/v1", testRoute);
// user route
server.use("/api/v1/user", userRoute);
// customer route
server.use("/api/v1/customer", customerRoute);
// projectType route
server.use("/api/v1/projectType", projectTypeRoute);
// projectCategory route
server.use("/api/v1/projectCategory", projectCategoryRoute);
// projectStatus route
server.use("/api/v1/projectStatus", projectStatusRoute);
// team member route
server.use("/api/v1/team", teamRoute);
// project route
server.use("/api/v1/project", projectRoute);
// project timing route
server.use("/api/v1/projectTiming", projectTimingRoute);
// role route
server.use("/api/v1/role", roleRoute);

// Middleware for serving client static files
server.use(express.static(path.join(__dirname, "/client/dist")), (req, res, next) => next());

// Route for serving client index.html
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist", "index.html"));
});

// environment variable
const port = process.env.PORT || 8080;
const mode = process.env.NODE_MODE;

// server listen 
server.listen(port, () => {
  console.log(`server is successfully running in ${mode} on port number ${port}`);
});