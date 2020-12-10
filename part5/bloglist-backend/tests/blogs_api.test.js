const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api =supertest(app)

const Blog = require('../models/blog')
const User = require ('../models/user')
const { before } = require('lodash')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog (helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog (helper.initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async ()=> {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('there is an id property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined();
  });

describe('addition  of new blog with user authorization', ()=> {
  let token = null
  beforeAll(async ()=> {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User ({username: 'jane', passwordHash})
    await user.save()

    //login user and get token
    await api 
      .post('/api/login')
      .send({username: 'jane', password: 'password'})
      .then((res) =>{
        return (token = res.body.token)
      })
  //  const response = await api.get('/api/users')
  //  const token = response.body.token

    return token
  })
  
  test('a valid blog can be added by authorized user', async () => {
    console.log('token inside test is', token)
    const newBlog = {
        title: "test blog 3",
        author: "Snoop Dogg",
        url: "https://fullstackopen.com/en/part4/testing_the_backend",
        likes: 420
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    
    const titles = response.body.map(r => r.title)
    
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('test blog 3')
  })

  test('default likes set to 0', async () => {
    const newBlog = {
        title: "test blog 3",
        author: "Snoop Dogg",
        url: "https://fullstackopen.com/en/part4/testing_the_backend"
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    expect(response.body[2].likes).toBe(0)
  })

  test('blog missing URL and title returns 400', async () => {
    const newBlog = {
        author: "Snoop Dogg",
        likes: 33
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of blog with user authorization', ()=>{
  let token = null
  beforeEach(async ()=> {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({username: 'jane', passwordHash})
    await user.save()

    //login user to get token
    const response =await api
      .post('/api/login')
      .send({username:'jane', password: 'password'})
      //return response.body.token
      .then((res) => {
        return (token = res.body.token)
      })
      const newBlog = {
        title: 'Another blog',
        author: 'Jane Doe',
        url: 'http://dummyurl.com',
      }
      
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    return token
  })
  test('a blog can be deleted', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const blogToDelete = blogsAtStart[0]
   
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  
    const blogsAtEnd = await Blog.find({}).populate('user')
    expect(blogsAtEnd).toHaveLength(0)
   
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

test('unauthorized user cannot create a blog', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'Jane Doe',
    url: 'http://dummyurl.com'
  }
  token = null
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(401)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('unauthorized user cannot delete blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
 
  token = null
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length )
  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain(blogToDelete.title)
})


  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    //console.log('blogsAtStart actually...:',blogsAtStart)
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 100

await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
    //console.log('blogsAtStart:',blogsAtStart)
    //console.log('blogsAtEnd:',blogsAtEnd)
    expect(blogsAtEnd[0].likes).toBe(100)
  })
 

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('password', 10)
      const user = new User({ username: 'root', name: 'jake', passwordHash })
  
      await user.save()
    })
  
    test('user is returned', async () => {
      const usersAtStart = await helper.usersInDb()
  
      expect(usersAtStart[0].username).toBe('root')
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'new_user',
        name: 'New Name',
        password: 'supersecret',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map((u) => u.username)
      expect(usernames).toContain(newUser.username)
    })
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Already Taken',
        password: 'password',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('`username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  
    test('creation fails with proper statuscode and message if username is missing', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        name: 'New Name',
        password: 'password',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('`username` is required')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  
    test('creation fails with proper statuscode and message if username is too short', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'Jo',
        name: 'New Name',
        password: 'password',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain(
        '`username` (`Jo`) is shorter than the minimum allowed length (3).',
      )
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  
    test('creation fails with proper statuscode and message if password is missing', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'John',
        name: 'New Name',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('password is required')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  
    test('creation fails with proper statuscode and message if password is too short', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'John',
        name: 'New Name',
        password: 'p',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain(
        'password should be at least 3 characters',
      )
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })
