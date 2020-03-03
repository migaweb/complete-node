const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/user")
const {userOneId, userOne, setupDatabase} = require("./fixtures/db")

beforeEach(setupDatabase)
afterEach(() => {})

test("Should sign up a new user", async () => {
    const response = await request(app).post("/users").send({
                                name: "Test Testsson",
                                email: "test@test.com",
                                password: "mysecurething",
                                age: 23
                            }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body.user.name).toBe("Test Testsson")
    expect(response.body).toMatchObject({
        user: {
            name: "Test Testsson",
            email: "test@test.com",
            age: 23
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe("mysecurething")
})

test("Should login existing user", async () => {
    const response = await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOne._id)

    expect(user).not.toBeNull()
    expect(response.body.token).toBe(user.tokens[1].token)
})

test("Should not login non existent user", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: "testtest"
    }).expect(400)
})

test("Should get profile for user", async () => {
    await request(app).get("/users/me")
                      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
                      .send()
                      .expect(200)
})

test("Should not get profile for aunathenticated user", async () => {
    await request(app).get("/users/me").send().expect(401)
})

test("Should delete account for user", async () => {
    await request(app).delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test("Should not delete account for unauthenticated user", async () => {
    await request(app).delete("/users/me").send().expect(401)
})

test("Should upload avatar image", async () => {
    await request(app).post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Should update name", async () => {
    await request(app).patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: "Updated"
    })
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe("Updated")
})

test("Should not update invalid user field", async () => {
    await request(app).patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({location: "Atlanta"})
    .expect(400)
})