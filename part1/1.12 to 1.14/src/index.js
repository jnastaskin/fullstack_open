import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
    <h1> {props.text} </h1>
    )

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0));

  const nextAnecdote = () =>{
    setSelected(Math.floor(Math.random()*props.anecdotes.length));  
    }

  const addVote = () => {
    const votesCopy= [...votes];
    votesCopy[selected]+=1;
    setVotes(votesCopy);
    }

  const findMax = () => {
    let max_idx= votes.indexOf(Math.max(...votes));
    return(max_idx);
  }

  return (
    <div>
     <Header text = "Anecdote of the day"/>
     <div> {props.anecdotes[selected]} </div>
     <div> has {votes[selected]} votes </div>
      <Button handleClick = {nextAnecdote} text ="next anecdote" /> 
      <Button handleClick = {addVote} text="vote" />
      <Header text = "Anecdote with most votes"/>
      <div> {props.anecdotes[findMax()]} </div>
      <div> has {votes[findMax()]} votes </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)