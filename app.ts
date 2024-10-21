import http from "http";
import dotenv from "dotenv";
import { createNewUser } from "./src/user-operations/create";
import { getUsers, findUser } from "./src/user-operations/get";
import { updateUser } from "./src/user-operations/update";
import { deleteUser } from "./src/user-operations/delete";

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  const url = request.url?.split("/"); // [ '', 'api', 'users' ]

  const existMethods = ["GET", "POST", "PUT", "DELETE"];

  function isExistMethod(request: string) {
    return existMethods.includes(request);
  }

  if (request.method === "GET") {
    if (url?.length === 3) {
      getUsers(response);
    } else if (url?.length === 4) {
      findUser(url[3], response);
    }
  }
  if (request.method === "POST") {
    if (url?.length === 3) {
      createNewUser(request, response);
    }
  }
  if (request.method === "PUT") {
    if (url?.length === 4) {
      updateUser(url[3], request, response);
    }
  }
  if (request.method === "DELETE") {
    if (url?.length === 4) {
      deleteUser(url[3], response);
    }
  }

  if (request.method && !isExistMethod(request.method)) {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Oops.. your request doesn't exist or not supported, try again" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
