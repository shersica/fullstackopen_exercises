import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }  
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
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

  return (
    <div>
      <h2>Phonebook</h2>
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
          <Person key={person.name} person={person}/>
        ))}
      </ul>
    </div>
  )
}

export default App