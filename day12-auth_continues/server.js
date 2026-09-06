import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config();

await connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on the port 3000");
});
