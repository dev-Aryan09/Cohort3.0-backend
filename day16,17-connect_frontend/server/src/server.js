import app from "./app/app.js";
import config from "./config/config.js";
import { connectDB } from "./config/db.js";

await connectDB();

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
