import { User, users } from "./create";
import http from "http";
import { validate as uuidValidate } from "uuid";

export function findUserID(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export const getUsers = (response: http.ServerResponse): void => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(users));
};

export const findUser = (id: string, response: http.ServerResponse) => {
  if (!uuidValidate(id)) {
    response.writeHead(400, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ message: "Invalid User ID (uuid), please, try again" }));
  }

  const user = findUserID(id);

  if (user) {
    response.writeHead(200, { "Content-Type": "application/json" });
    return response.end(JSON.stringify(user));
  }

  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ message: "User ID is not found, please, try again" }));
};
