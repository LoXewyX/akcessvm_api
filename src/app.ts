// ----------------------------------------------------------------------------
// Code by: Luis Ruiz
// License: MIT License
// License URL: https://opensource.org/licenses/MIT
// ----------------------------------------------------------------------------
// This API serves as the backbone for a self-made learning portal.
// It ensures secure storage of user data within a database and leverages
// JWT tokens for robust authentication and access control mechanisms.
//
// You can explore the API's functionality by visiting the /swagger endpoint,
// which provides comprehensive documentation detailing the API's workflow.
//
// It's worth noting that this application is developed primarily for educational
// purposes, aiming to showcase API design and backend development techniques.
//
// Inspired on a @DaveGrayTeachesCode React Protected Routes | Role-Based Authorization.
// Source: https://www.youtube.com/watch?v=oUZjO00NkhY
// Policy: https://www.freecodecamp.org/news/academic-honesty-policy
// Github: https://github.com/gitdagray/mongo_async_crud
// ----------------------------------------------------------------------------

import express, { Application } from "express";
import path from "path";
import { PORT } from "./env";
import cors from "cors";
import corsOptions from "./config/cors.config";
import compression from "compression";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import connectDB from "./config/mongo.config";
import logEvents from "./middlewares/logEvents.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import verifyJWT from "./middlewares/verifyJWT.middleware";
import credentials from "./middlewares/credentials.middleware";
import signupRoutes from "./routes/auth/signup.route";
import loginRoutes from "./routes/auth/login.route";
import refreshRoutes from "./routes/auth/refresh.route";
import logoutRoutes from "./routes/auth/logout.route";
import usersRoutes from "./routes/users.route";

const app: Application = express();

// Optimizations
app.use(compression());

// Middlewares
app.use(logEvents);
app.use(credentials);
app.use(errorHandler);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Normal routes
app.use("/cdn", express.static(path.join(__dirname, "..", "public")));
/**
 * Set up Swagger UI Express
 * Define API documentation using Swagger.
 * For detailed commenting guidelines:
 * https://swagger.io/docs/specification/components/
 */
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learn Portal API",
      version: "1.0.0",
      description: "API documentation for the Learn Portal application.",
    },
  },
  apis: ["./src/routes/**/*.route.ts"],
});
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/refresh", refreshRoutes);
app.use("/api/logout", logoutRoutes);

// API Routes that requires JWT verification
app.use(verifyJWT);
app.use("/api/users", usersRoutes);

// MongoDB connection
connectDB();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Swagger: http://localhost:${PORT}/swagger`);
  });
});
