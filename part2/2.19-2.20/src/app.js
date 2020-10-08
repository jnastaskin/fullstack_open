import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'


const App = () => {
    
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('') 
  const [newNumber, setNewNumber] =useState('') 
  const [filter,setFilter] = useState('')
  const [message,setMessage]= useState(null)
  const [errorMessage,setErrorMessage]= useState(null)


  const contactsToShow = persons.filter(person => person.name.toLowerCase().startsWith(filter.toLocaleLowerCase()));

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addContact = (event) => {
    event.preventDefault()

    const Nameexists = persons.filter(person =>person.name === newName).length >0;
    const Numexists = persons.filter(person =>person.number === newNumber).length >0;

    if(Nameexists && Numexists){
      window.alert(`${newName} is already added to phonebook`)
    }
    else if(Nameexists) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      const person = persons.find(person =>person.name ===newName);
      const changedPerson = {...person, number: newNumber};
      const id =changedPerson.id

      personService
      .update(id,changedPerson)
        .then(returnedPerson=> {
          setPersons(persons.map(person=> person.id !== id ? person: returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Updated '${newName}'`)
        })
        .catch(returnedPerson => {
          setErrorMessage(`Information of '${newName}' has already been removed from server`)
          console.log('catch!')
        })        
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
    }
    else if (!Nameexists) {
      const personObject = {
      name: newName,
      number: newNumber,
     // id: persons.length+1,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        setMessage(
          `Added '${newName}'`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
    }
  }
    
  const deletePerson = (name,id) => {
    if(window.confirm(`Delete ${name}?`)){
      personService.remove(id)
      .then(()=>{
        setPersons(persons.filter(person=>person.id !== id));
      })
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
        <ErrorNotification errorMessage={errorMessage} />
        <Notification message={message} />
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <h2>add a new</h2>
        <PersonForm addContact = {addContact} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} newName = {newName} newNumber={newNumber} />
        <h2>Numbers</h2>
         {contactsToShow.map(person => 
         <Person key = {person.id} name={person.name} id={person.id} number={person.number} deletePerson ={deletePerson} />
         )} 
      </div>
    )
    }
    
    export default App