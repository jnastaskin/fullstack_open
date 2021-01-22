import React from 'react'
import { connect } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = ({createAnecdote, setNotification}) => {
  //const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
   // dispatch(createAnecdote(content))
   createAnecdote(content)
   // dispatch( setNotification( {message: `Successfully added anecdote`}, 5))
   setNotification( `Successfully added anecdote`, 5)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type = "submit">Create</button>
      </form>
    </div>
  )
}

const ConnectedAnecdoteForm = connect(null, {createAnecdote, setNotification})(AnecdoteForm)

export default ConnectedAnecdoteForm