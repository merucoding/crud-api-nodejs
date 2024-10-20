import { User, users, createUser } from "./create-user";
import { validateUserData } from "./validation-user";
import http from "http";
import { validate as uuidValidate } from "uuid";

function findUserID(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

const parseRequestBody = async (request: http.IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', chunk => {
      body += chunk;
    });

    request.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
};

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

export const createNewUser = async (request: http.IncomingMessage, response: http.ServerResponse) => {
  try {
    const data = await parseRequestBody(request);

    if (!validateUserData(data)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      return response.end(JSON.stringify({ message: 'Operation failed: please enter correct user data with fields: username, age, hobbies'}));
    }

    const { username, age, hobbies } = data;
    const newUser: User = createUser(username, age, hobbies);

    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(newUser));
  } catch {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Invalid request' }));
  }
}
