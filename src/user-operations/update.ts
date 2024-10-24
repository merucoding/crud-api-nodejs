import http from "http";
import { validate as uuidValidate } from "uuid";
import { validateUserData } from "./validate";
import { findUserID } from "./get";
import { parseRequestBody } from "./create";
import { users, writeUsers } from "./create";

export const updateUser = async (id: string, request: http.IncomingMessage, response: http.ServerResponse) => {
  if (!uuidValidate(id)) {
    response.writeHead(400, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ message: "Invalid User ID (uuid), please, try again" }));
  }

  const user = findUserID(id);

  if (!user) {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "User ID is not found, please, try again" }));
  }

  try {
    const data = await parseRequestBody(request);

    if (!validateUserData(data)) {
      response.writeHead(400, { "Content-Type": "application/json" });
      return response.end(JSON.stringify({ message: "Operation failed: please enter correct user data with fields: username, age, hobbies" }));
    }

    if (user !== undefined) {
      Object.assign(user, data);
      writeUsers(users);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(user));
    }
  } catch {
    response.writeHead(400, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Invalid request" }));
  }
};
