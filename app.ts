import http from "http";
import dotenv from "dotenv";
import { getUsers } from "./src/user-operations";

dotenv.config();
const PORT = process.env.PORT || 3000;
// console.log(process.env);

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  // const url = request.url;

  const url = request.url?.split("/"); // [ '', 'api', 'users' ]

  if (request.method === "GET") {
    if (url?.length === 3) {
      getUsers(response);
    }
  }

  // console.log(url);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
