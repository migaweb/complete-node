const request = require("supertest")
const app = require("../src/app")

test("Should sign up a new user", async () => {
    await request(app).post("/users").send({
        name: "Test Testsson",
        email: "test@test.com",
        password: "mysecurething",
        age: 23
    }).expect(201) 
})