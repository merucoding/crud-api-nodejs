// Получить все записи с помощью GET api/users запроса (ожидается пустой массив)
// Новый объект создается запросом POST api/users(ожидается ответ, содержащий вновь созданную запись)
// С помощью GET api/user/{userId}запроса мы пытаемся получить созданную запись по ее id(ожидается созданная запись)

// import request from "supertest";
// import { server } from "../src/app.ts";

// describe("api tests", () => {
//   test("should return users with a GET request (an empty array)", async () => {
//     const response = await request(server).get('/api/users');
//     expect(response.status).toEqual(200);
//     expect(response.body).toEqual([]);
//   });

//   test("", () => {});

//   test("", () => {});
// });