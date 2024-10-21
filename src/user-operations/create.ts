import { v4 as uuidv4 } from "uuid";
import http from "http";
import { validateUserData } from "./validate";

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [];

const createUser = (username: string, age: number, hobbies: string[]): User => {
  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };
  users.push(newUser);
  return newUser;
};

export const parseRequestBody = async (request: http.IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
    });

    request.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const createNewUser = async (request: http.IncomingMessage, response: http.ServerResponse) => {
  try {
    const data = await parseRequestBody(request);

    if (!validateUserData(data)) {
      response.writeHead(400, { "Content-Type": "application/json" });
      return response.end(JSON.stringify({ message: "Operation failed: please enter correct user data with fields: username, age, hobbies" }));
    }

    const { username, age, hobbies } = data;
    const newUser: User = createUser(username, age, hobbies);

    response.writeHead(201, { "Content-Type": "application/json" });
    response.end(JSON.stringify(newUser));
  } catch {
    response.writeHead(400, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Invalid request" }));
  }
};

export { User, users, createUser };
