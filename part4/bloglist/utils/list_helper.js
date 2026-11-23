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

module.exports = { dummy, totalLikes, favoriteBlog };
