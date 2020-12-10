/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    })

    setNewBlogAuthor('')
    setNewBlogTitle('')
    setNewBlogUrl('')
  }


  return (
    <div className = "newBlogFormDiv">
      <h2> create new </h2>
      <form onSubmit={addBlog}>
        <div>
                title:
          <input
            id = 'title'
            value = {newBlogTitle}
            onChange = {handleTitleChange}
          />
        </div>
        <div>
                author:
          <input
            id = 'author'
            value = {newBlogAuthor}
            onChange = {handleAuthorChange}
          />
        </div>
        <div>
                url
          <input
            id = 'url'
            value = {newBlogUrl}
            onChange = {handleUrlChange}
          />
        </div>
        <button type="submit" id='createNewBlog'>create new blog</button>
      </form>
    </div>
  )

}

export default NewBlogForm