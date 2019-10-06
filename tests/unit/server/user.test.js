const expect = require("expect");
const request = require("supertest");
const app = require("../../../server/index");
const faker = require("faker");
const User = require("../../../server/models/user");
const { seedUsers, populateUsers } = require("./seed");

beforeEach(populateUsers);

describe("GET /users", () => {
  it("should return user if authenticated", async () => {
    const res = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${seedUsers[0].token}`)
      .expect(200);

    expect(res.body.user._id).toBe(seedUsers[0]._id.toHexString());
  });

  it("should return 401 if unauthenticated", async () => {
    const res = await request(app)
      .get("/users")
      .expect(401);

    expect(res.body.user).toBeUndefined();
  });
});

describe("POST /users", () => {
  it("should create a user", async () => {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    const res = await request(app)
      .post("/users")
      .send(user)
      .expect(200);

    expect(res.headers.authorization).toBeDefined();
    expect(res.body.user.name).toBe(user.name);

    const doc = await User.findOne({ name: user.name });

    expect(doc).toBeTruthy();
    expect(doc.password).not.toBe(user.password);
  });

  it("should not create a user with invalid data", async () => {
    await request(app)
      .post("/users")
      .send({})
      .expect(400);

    const users = await User.find();

    expect(users.length).toBe(seedUsers.length);
  });

  it("should not create a user with duplicate email", async () => {
    await request(app)
      .post("/users")
      .send(seedUsers[1])
      .expect(400);

    const users = await User.find();

    expect(users.length).toBe(seedUsers.length);
  });
});
