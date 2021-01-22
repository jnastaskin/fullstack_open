import React from 'react'
import {useSelector, useDispatch, } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const AnecdoteList = () => {
 const anecdotes = useSelector((state) => {
  if (state.filter === "" ) return state.anecdotes

  return state.anecdotes.filter((anecdote)=> anecdote.content
   .toLowerCase().includes(state.filter.toLowerCase())
   )
  })

  const dispatch = useDispatch()

  const voteOn = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(
      {message: `Vote added to ${anecdote.content}`}, 5)   
    )
  }

  return (
    <div>
    {console.log('anecdotes:', anecdotes)}
    {anecdotes
      .sort(function(a,b){ return b.votes - a.votes})
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteOn(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
