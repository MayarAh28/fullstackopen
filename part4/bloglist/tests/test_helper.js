const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "React patterns",
    author: "John Doe",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "The useful of async/await",
    author: "Mayar Alahmad",
    url: "https://www.dev.com/the-useful-of-asyncawait",
    likes: 5,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb
};
