import http from "http";
import dotenv from "dotenv";
import { getUsers, findUser, createNewUser, updateUser, deleteUser } from "./src/user-operations";

dotenv.config();
const PORT = process.env.PORT || 3000;
// console.log(process.env);

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  const url = request.url?.split("/"); // [ '', 'api', 'users' ]

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
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
