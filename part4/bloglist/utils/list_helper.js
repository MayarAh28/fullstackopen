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

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null;
  const likesByAuthor = {};
  let mostAuthor = { author: "", likes: -1 };
  blogs.forEach((blog) => {
    if (!Object.hasOwn(likesByAuthor, blog.author))
      likesByAuthor[blog.author] = blog.likes;
    else likesByAuthor[blog.author] += blog.likes;
    if (likesByAuthor[blog.author] > mostAuthor.likes)
      mostAuthor = { author: blog.author, likes: likesByAuthor[blog.author] };
  });
  return mostAuthor;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
