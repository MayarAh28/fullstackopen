const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null;
  let favBlog = blogs[0];
  blogs.forEach((blog) => {
    blog.likes > favBlog.likes ? (favBlog = blog) : null;
  });
  return favBlog;
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null;
  const blogsByAuthor = {};
  let mostAuthor = { author: "", blogs: 0 };
  blogs.forEach((blog) => {
    if (!Object.hasOwn(blogsByAuthor, blog.author))
      blogsByAuthor[blog.author] = 1;
    else blogsByAuthor[blog.author] += 1;
    if (blogsByAuthor[blog.author] > mostAuthor.blogs)
      mostAuthor = { author: blog.author, blogs: blogsByAuthor[blog.author] };
  });
  return mostAuthor;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
