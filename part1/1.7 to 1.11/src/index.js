import React, {useState} from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const Header = (props) => {
	return (
		<div>
		<h1>{props.text}</h1>
		</div>
		)
	}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {
  return (
    <tr>
    <td> {props.text} </td>
    <td> {props.value} {props.percent}</td>
    </tr>
    )
}

const Statistics = (props) => {
   return (
    <table>
     <Statistic text = "good" value ={props.good} />
     <Statistic text = "neutral" value ={props.neutral} />
     <Statistic text = "bad" value ={props.bad} />
     <Statistic text = "all" value ={props.all} />
     <Statistic text = "average" value ={(props.good - props.bad)/props.all} />
     <Statistic text = "positive" value ={100*props.good/props.all} percent = "%" />
    </table>
    )
}


const App = () => {
  // save clicks of each button to own state
  const [good,setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const feedback = 'give feedback';
  const statistics = 'statistics';
  
  const all = good+neutral+bad;

  return (
    <div>
    <Header text={feedback}/>
    <Button handleClick = {() => setGood(good +1)} text ="good" /> 
    <Button handleClick = {() => setNeutral(neutral +1)} text ="neutral" /> 
    <Button handleClick = {() => setBad(bad +1)} text ="bad" />
    
     <Header text={statistics} />
     <div>
    {(all === 0) 
      ? <div> No feedback given </div>
      :<div>
       <Statistics 
       good ={good} 
       neutral ={neutral}
       bad={bad}
       all={all}
        />
       </div>
     } 
     </div>
    </div>
  );
};


ReactDOM.render( <App />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
