import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDatabase from "./database/connectDatabase.js";
import testRoute from "./routes/test.route.js";
import customerRoute from "./routes/customer.route.js";
import projectTypeRoute from "./routes/projectType.route.js";
import projectCategoryRoute from "./routes/projectCategory.route.js";
import projectStatusRoute from "./routes/projectStatus.route.js";
import projectRoute from "./routes/project.route.js";
import teamRoute from "./routes/team.route.js";
import projectTimingRoute from "./routes/projectTiming.route.js";
import roleRoute from "./routes/role.route.js";
import designationRoute from "./routes/designation.route.js";
import projectPriorityRoute from "./routes/projectPriority.route.js";

const __dirname = path.resolve();

// Configuration
dotenv.config();

// Connect MongoDB database
connectDatabase();

// REST API object
const server = express();

// Middleware
server.use(express.json());
server.use(cors());

// Test route
server.use("/api/v1", testRoute);
// Customer route
server.use("/api/v1/customer", customerRoute);
// Project type route
server.use("/api/v1/projectType", projectTypeRoute);
// Project category route
server.use("/api/v1/projectCategory", projectCategoryRoute);
// Project Status route
server.use("/api/v1/projectStatus", projectStatusRoute);
// Team member route
server.use("/api/v1/team", teamRoute);
// Project route
server.use("/api/v1/project", projectRoute);
// Project timing route
server.use("/api/v1/projectTiming", projectTimingRoute);
// Role route
server.use("/api/v1/role", roleRoute);
// Designation route
server.use("/api/v1/designation", designationRoute);
// Project priority route
server.use("/api/v1/projectPriority", projectPriorityRoute);

// Middleware for serving client static file
server.use(express.static(path.join(__dirname, "/client/dist")), (req, res, next) => next());

// Route for serving client index.html file
server.get("*", (req, res) => res.sendFile(path.join(__dirname, "/client/dist", "index.html")));

// Environment variable
const port = process.env.PORT || 8080;
const mode = process.env.NODE_MODE;

// Server listen 
server.listen(port, () => console.log(`Server is successfully running in ${mode} on port number ${port}`));