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

const user: User = createUser("Meru", 26, ["codding", "movie"]);

// console.log(users);

// [{
//   id: 'b46d6276-6f4b-45c2-8ab1-4aafcb5e34a2',
//   username: 'Meru',
//   age: 26,
//   hobbies: [ 'codding', 'movie' ]
// }]

export { User, users, createUser };
