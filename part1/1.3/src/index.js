import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const Header = (props) => {
	return (
		<div>
		<h1>{props.course}</h1>
		</div>
		)
	}

const Total = (props) => {
	return (
		<div>
		<p>Number of exercises {props.exercises}</p>
		</div>
		)
}


const Part = props => (
  <p>
    {props.part} {props.exercises}
  </p>
);


const Content = props => {
  return (
    <div>
  <Part part={props.part1} exercises={props.exercises1} />
  <Part part={props.part2} exercises={props.exercises2} />
  <Part part={props.part3} exercises={props.exercises3} />
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name:'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  } 

  return (
    <div>
    <Header course={course}/>
    <Content 
    	 part1={part1.name} exercises1={part1.exercises}
        part2={part2.name} exercises2={part2.exercises}
        part3={part3.name} exercises3={part3.exercises}/>
     <Total exercises={part1.exercises+part2.exercises+part3.exercises} />
    </div>
  );
};


ReactDOM.render( <App />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
