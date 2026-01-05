import dotenv from "dotenv";

import { connectDB } from "./database/connect.ts";
import { app } from "./app.ts";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`⚙️ Server running on port ${PORT}`);
  });
}

bootstrap();
