
import React from 'react'

const Course = ({course}) =>{
    return(
      <div>
      <SubHeader course = {course} />
      <Content course={course} />
      <Total course={course} />
      </div>
    )
  }


  const SubHeader = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }

  const Content = ({ course }) => {
    return (
      <div>
      {course.parts.map((part) =>
      <Part key={part.id}  part={part} /> 
      )}
      </div>
    )
  }

  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }

  const Total = ({ course }) => {
    // extract exercises of each part into an array called exercsis
    const excercises = course.parts.map((part) => part.exercises);
    
    const reducer = (accumulator,currentValue) => accumulator + currentValue;
    const sum = excercises.reduce(reducer);
    return(
      <p> <b> total of {sum} exercises </b></p>
    ) 
  }

  export default Course