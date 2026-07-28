import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./src/config/env.js";
import { connectMongo } from "./src/database/mongo.js";
import { corsMiddleware } from "./src/middleware/cors.js";
import { errorHandler, notFound } from "./src/middleware/errorHandler.js";
import routes from "./src/routes/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "15mb" }));
app.use(corsMiddleware);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(routes);
app.use(notFound);
app.use(errorHandler);

connectMongo()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Server is running at port ${env.port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });
