import { v4 as uuidv4 } from "uuid";

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

export { users, createUser };
