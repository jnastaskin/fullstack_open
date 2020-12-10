/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-spacing */
import React, {useState} from 'react'

const Blog = ({ blog, updateLikes, removeBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const remove= () => {
    const {id, author, title} = blog
    removeBlog(title,author,id)
  }

  const update = () => {
    const {id, author, url, title} = blog
    const updatedBlog = {
      // user: blog.user?.id || blog.user,
      user: blog.user,
      likes: blog.likes+1,
      title,
      author,
      url,
    }
    updateLikes(id, updatedBlog)
  }

  return(
    <div className='blogDiv'>
      <div style={{...blogStyle, ...hideWhenVisible}} className='blogTitleAuthor'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} id='viewButton'> view</button>
      </div>
      <div style={{...blogStyle,...showWhenVisible}} className='showAll'>
        {blog.title}
        <button onClick={toggleVisibility} id='hideButton'> hide</button>
        <p>{blog.url} </p>
        <p>likes {blog.likes} <button onClick={update} id='likeButton'>like</button> </p>
        <p>{blog.author}</p>
        <p> <button onClick={remove}id='removeButton'> remove </button></p>
      </div>
    </div>
  )
}

export default Blog
