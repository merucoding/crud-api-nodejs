import { server } from "./app";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

process.on("SIGINT", () => {
  fs.writeFileSync("src/user-operations/users.json", JSON.stringify({}), "utf8");
  process.exit(0);
})