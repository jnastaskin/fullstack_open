import React from 'react'
import {connect } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const AnecdoteList = ({filter, anecdotes, setNotification, vote }) => {
//  const anecdotes = useSelector((state) => {
//   if (state.filter === "" ) return state.anecdotes

//   return state.anecdotes.filter((anecdote)=> anecdote.content
//    .toLowerCase().includes(state.filter.toLowerCase())
//    )
//   })

  const anecdotesToShow = () => {
    if (filter === '') return anecdotes

    return anecdotes.filter((anecdote) =>
     anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  }

 // const dispatch = useDispatch()

  const voteOn = (anecdote) => {
    // dispatch(vote(anecdote))
    // dispatch(setNotification(
    //   {message: `Vote added to ${anecdote.content}`}, 5)   
    // )
    vote(anecdote)
    setNotification(`Vote added to ${anecdote.content}`, 5)
  }

  return (
    <div>
    {anecdotesToShow()
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

const mapStateToProps = ( {anecdotes, filter }) => {
  return {
    anecdotes,
    filter
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, {vote, setNotification})(AnecdoteList)

export default ConnectedAnecdoteList

