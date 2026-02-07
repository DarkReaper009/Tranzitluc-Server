import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { fileURLToPath } from "url";
import contact from "./routes/contact.js";
import errorHandler from "./middleware/error.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "https://www.tranzitluc.com", // Replace with your actual frontend URL
  }),
);

// Routes
app.use("/api/contact", contact);

// Error Handling (must be last)
app.use(errorHandler);

// Start server only if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
