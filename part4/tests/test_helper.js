const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "test 2",
      author: "Jake",
      url: "https://fullstackopen.com/en/part4/testing_the_backend",
      likes: 4
    },
    {
      title: "test 1",
      author: "Jnasty",
      url: "https://fullstackopen.com/en/part4/testing_the_backend",
      likes: 444
    },
  ]

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u=>u.toJSON())
}

  module.exports = {
    initialBlogs, blogsInDb, usersInDb
  }
  