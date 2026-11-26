const { test, beforeEach, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const blogs = await helper.blogsInDb();
  assert.strictEqual(blogs.length, helper.initialBlogs.length);
});

test("verify that the unique identfier called id", async () => {
  const blogs = await helper.blogsInDb();
  const blog = blogs[0];
  assert(Object.hasOwn(blog, "id"));
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Test api endpoints",
    author: "Test Test",
    url: "https://dev.com/",
    likes: 28,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.blogsInDb();
  assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);
  const titles = blogs.map((blog) => blog.title);
  assert(titles.includes("Test api endpoints"));
});

test("if the likes property is missing it will default to zero", async () => {
  const newBlog = {
    title: "Test api endpoints",
    author: "Test Test",
    url: "https://dev.com/",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogs = await helper.blogsInDb();
  const addedBlog = blogs[blogs.length - 1];
  assert.strictEqual(addedBlog.likes, 0);
});

test("if the title or url are missing return 400", async () => {
  const newBlog = {
    author: "Test Test",
    url: "https://dev.com/",
    likes: 28,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});

test.only("if delete blog by id successfully", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  blogIds = blogsAtEnd.map((blog) => blog.id);
  assert(!blogIds.includes(blogToDelete.id));

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});
