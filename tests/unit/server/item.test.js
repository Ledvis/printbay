const expect = require("expect");
const request = require("supertest");
const { ObjectId } = require("mongodb");
const app = require("../../../server/index");
const Item = require("../../../server/models/item");
const { seedItems, populateItems } = require("./seed");

beforeEach(populateItems);

describe("POST /items", async () => {
  it("should create a new item", async () => {
    const body = { title: "Hello" };

    const res = await request(app)
      .post("/items")
      .send(body)
      .expect(200);

    expect(res.body.item.title).toBe(body.title);

    const items = await Item.find();
    expect(items.length).toBe(seedItems.length + 1);
    expect(items[seedItems.length].title).toBe(body.title);
  });
});

describe("GET /items", () => {
  it("should return items", async () => {
    const res = await request(app)
      .get("/items")
      .expect(200);

    expect(res.body.items.length).toBe(seedItems.length);
  });
});

describe("GET /items/:id", () => {
  it("should return specific item", async () => {
    const res = await request(app)
      .get(`/items/${seedItems[0]._id.toHexString()}`)
      .expect(200);

    expect(res.body.item.title).toBe(seedItems[0].title);
  });

  it("should return '404' if valid item._id does not exist in db",
    async () => {
      await request(app)
        .get(`/items/${new ObjectId()}`)
        .expect(404);
    });

  it("should return '404' if invalid item._id passed",
    async () => {
      await request(app)
        .get("/items/030391")
        .expect(404);
    });
});
