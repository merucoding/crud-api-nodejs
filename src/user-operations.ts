import { users, createUser } from './create-user';
import http from 'http';

export const getUsers = (response: http.ServerResponse):void => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(users));
}

