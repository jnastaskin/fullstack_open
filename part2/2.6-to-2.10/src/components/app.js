import React, { useState } from 'react'
import Person from './Person'
import Filter from './Filter'
import PersonForm from './PersonForm'

const App = () => {
    
  const [ persons, setPersons ] = useState([
      { name: 'Arto Hellas', number: 69, id: 1 },
      { name: 'Ned Shneebly', number: 420, id: 2 },
    ])
  const [ newName, setNewName ] = useState('') 
  const [newNumber, setNewNumber] =useState('') 
  const [filter,setFilter] = useState('')

  const contactsToShow = persons.filter(person => person.name.toLowerCase().startsWith(filter.toLocaleLowerCase()));

  const addContact = (event) => {
    event.preventDefault()

    const exists = persons.filter(person =>person.name === newName).length >0;
    if(exists){
      window.alert(`${newName} is already added to phonebook`)
    }
    else if (!exists) {
      console.log('exists=',exists)
      const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1,
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
    
  const handleNameChange = (event) => {
      setNewName(event.target.value)
    }

  const handleNumberChange= (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange= (event) => {
    setFilter(event.target.value)
  }

    return (
      <div>
        <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <h2>add a new</h2>
        <PersonForm addContact = {addContact} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} newName = {newName} newNumber={newNumber} />
        <h2>Numbers</h2>
         {contactsToShow.map(person => 
         <Person key = {person.id} name={person.name} number={person.number} />
         )} 
        
         ...
     <div>debug: {newName}</div>
      </div>
    )
    }
    
    export default App