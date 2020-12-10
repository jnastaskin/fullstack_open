import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message,setMessage]= useState(null)
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON= window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const addBlog = (blogObject) => {
    newBlogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`new blog, '${returnedBlog.title}' by ${returnedBlog.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  const addLike = async (id, blogObject) => {
    try{
      await blogService.update(id,blogObject)
      const updatedBlog = { ...blogObject, id }

      setBlogs(blogs.map((blog) => (blog.id !== id ? blog: updatedBlog)))
    } catch(err){
      console.error(err)
      setMessage({
        error: `No nooo! ${err}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const removeBlog= async (title, author, id) => {
    if(window.confirm(`Delete '${title}' by ${author}?`)){
      try{
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !==id))
      }catch(err){
        console.error(err)
        setMessage({
          error: `No nooo! ${err}`,
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log(`logging out ${user.name}`)
    window.localStorage.removeItem('loggedBlogappUser')
    setUsername('')
    setPassword('')
    setUser(null)
  }

  const newBlogForm=() => {
    return (
      <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
        <NewBlogForm createBlog = {addBlog}/>
      </Togglable>
    )
  }

  if (user ===null) {
    return (
      <div>
        <h2> Log in to application </h2>
        <ErrorNotification errorMessage={errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
              username
            <input
              type="text"
              id ='username'
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
              password
            <input
              type="password"
              id = 'password'
              value= {password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p> {user.name} is logged in
        <button onClick={(handleLogout)}> logout</button>
      </p>
      {newBlogForm()}
      {blogs
        .sort(function(a,b){ return b.likes - a.likes})
        .map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={addLike} removeBlog={removeBlog} />
        )}
    </div>
  )
}

export default App