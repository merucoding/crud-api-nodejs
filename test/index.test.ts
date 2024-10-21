import request from "supertest";
import { server } from "../src/app";

const user = { username: "anna", age: 25, hobbies: [] };

describe("api tests", () => {
  test("should return users with a GET request (an empty array)", async () => {
    const response = await request(server).get("/api/users");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  test("should create a new user with a POST request", async () => {
    const res = await request(server).post("/api/users").send(user).set("Content-Type", "application/json");
    expect(res.status).toBe(201);
    console.log(res.body);
  });

  test("get created user by id with GET request", async () => {
    const post = await request(server).post("/api/users").send(user).set("Content-Type", "application/json");
    expect(post.status).toBe(201);

    const res = await request(server).get(`/api/users/${post.body.id}`);
    expect(res.status).toBe(200);
    console.log(res.body);
  });
});
