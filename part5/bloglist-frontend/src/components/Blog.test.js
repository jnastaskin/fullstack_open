import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog
        user = {user}
        removeBlog = {mockHandlerRemove}
        updateLikes ={mockHandlerUpdate}
        blog = {blog}
      />
    )
  })

  const blog = {
    title: 'School of Rock',
    author: 'Ned Schneeblly',
    url: 'google.com'
  }

  const user = {
    username: 'root',
    name: 'jake',
    password: 'password'
  }

  const mockHandlerRemove = jest.fn()
  const mockHandlerUpdate = jest.fn()

  test('renders content', () => {

    expect(component.container).toHaveTextContent(
      'School of Rock'
    )

    const div = component.container.querySelector('.showAll')
    expect(div).toHaveStyle('display: none')
  })

  test('clicking the view button shows url and likes', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.showAll')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the like button twice calls event handler twice', () => {

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })

})

describe('<NewBlogForm /> updates parent state and calls onSubmit', () => {
  test('Form calls event handler received as props with correct details', () => {
    const createBlog = jest.fn()

    const component = render (
      <NewBlogForm createBlog = {createBlog} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'Test Author' }
    })

    fireEvent.change(title, {
      target: { value: 'Test Title' }
    })

    fireEvent.change(url, {
      target: { value: 'Test Url' }
    })

    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].url).toBe('Test Url')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  })
})


