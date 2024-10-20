import { User, users, createUser } from "./create-user";
import http from "http";
import { validate as uuidValidate } from "uuid";

export const getUsers = (response: http.ServerResponse): void => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(users));
};

export const findUser = (id: string, response: http.ServerResponse): void => {
  if (!uuidValidate(id)) {
    response.writeHead(400, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Invalid User ID (uuid), please, try again" }));
  }

  const user = findUserID(id);

  if (user) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(user));
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "User ID is not found, please, try again" }));
  }
};

function findUserID(id: string): User | undefined {
  return users.find((user) => user.id === id);
}
