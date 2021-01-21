import React from 'react'
import {useSelector, useDispatch, } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'


const AnecdoteList = () => {
 const anecdotes = useSelector((state) => {
  //  if (state.filter.filter === "" ) return state.anecdotes

  //  return state.anecdotes.filter((anecdote)=> anecdote.content
  //   .toLowerCase().includes(state.filter.filter.toLowerCase())
  //   )

  if (state.filter === "" ) return state.anecdotes

  return state.anecdotes.filter((anecdote)=> anecdote.content
   .toLowerCase().includes(state.filter.toLowerCase())
   )
  })

  const dispatch = useDispatch()

  const voteOn = (id) => {
    dispatch(vote(id))
    const votedAnecdote = anecdotes.find((anecdote)=> anecdote.id === id)
    dispatch(setNotification(
      {message: `Vote added to ${votedAnecdote.content}`} )
    )
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
    {anecdotes
      .sort(function(a,b){ return b.votes - a.votes})
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteOn(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
