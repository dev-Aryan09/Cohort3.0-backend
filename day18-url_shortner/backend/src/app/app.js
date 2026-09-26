import express from "express";
import urlRoutes from "../routes/url.route.js";

const app = express();

app.use(express.json());

app.use("/api/urls", urlRoutes);

export default app;
