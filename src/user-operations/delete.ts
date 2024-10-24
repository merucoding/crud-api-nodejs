import http from "http";
import { validate as uuidValidate } from "uuid";
import { users, writeUsers } from "./create";

const deleteUserByID = (id: string): boolean => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return false;
  } else {
    users.splice(index, 1);
    return true;
  }
};

export const deleteUser = (id: string, response: http.ServerResponse) => {
  if (!uuidValidate(id)) {
    response.writeHead(400, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ message: "Invalid User ID (uuid), please, try again" }));
  }

  const deleted = deleteUserByID(id);
  writeUsers(users);

  if (!deleted) {
    response.writeHead(404, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ message: "User ID is not found, please, try again" }));
  }

  response.writeHead(204);
  response.end();
};
