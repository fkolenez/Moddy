import express from "express";
import cors from "cors";
import routes from "./src/routes/index";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use("/api", routes);

export { app };
