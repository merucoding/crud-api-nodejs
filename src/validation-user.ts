import { User } from "./create-user";

export function validateUserData(data: any): data is User {
  if (Object.keys(data).length !== 3) {
    return false;
  }
  
  const { username, age, hobbies } = data;

  if (typeof username !== 'string') {
    return false;
  }

  if (typeof age !== 'number' || age <= 0) {
    return false;
  }

  if (!Array.isArray(hobbies) || hobbies.some(hobby => typeof hobby !== 'string')) {
    return false;
  }

  return true;
}
