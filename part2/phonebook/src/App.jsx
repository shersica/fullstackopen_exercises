import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './service/personService'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initalPhoneBook => {
        console.log('promise fulfilled')
        setPersons(initalPhoneBook)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (existingPerson) {
      const isConfirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(isConfirmed) {
        personService
          .update(existingPerson.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
          })
          .catch(error => {
            setErrorMessage(`${existingPerson.name} has already been deleted from the phonebook`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            //remove person from local state
            setPersons(persons.filter(p => p.id !== existingPerson.id));
          })
      }
    }
    else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setMessage('Added ' + returnedPerson.name)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const removePerson = (person) => {
    const isConfirmed = window.confirm('Delete ' + person.name + ' ?')
    
    if (isConfirmed) {
      personService
      .remove(person.id)
      .then(response => {
        console.log('deleted', response.data)
        setPersons(persons.filter(p => p.id !== person.id))
      })
      .catch(error => {
        console.log('Error deleting', error)
      })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <ErrorNotification message={errorMessage}/>
        <div>
          <Filter filterName={filterName} handleFilterName={handleFilterName}/>
        </div>
      <h3>add a new</h3>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <ul>
        {personsToShow.map((person) => (
          <Person key={person.name} person={person} removePerson={() => removePerson(person)}/>
        ))}
      </ul>
    </div>
  )
}

export default App