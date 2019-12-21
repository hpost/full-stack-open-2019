import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const fetchPersons = () => {
    personsService
      .getAll()
      .then(persons => setPersons(persons))
  }

  useEffect(fetchPersons, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(entry => entry.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    const newObject = {
      name: newName,
      number: newNumber
    }
    personsService
      .create(newObject)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id, name) => {
    const confirmed = window.confirm(`Delete ${name}?`)
    if (!confirmed) return

    personsService.remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  const shownPersons = filter.length > 0
    ? persons.filter(entry => entry.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add entry</h3>
      <PersonForm
        onSubmit={addName}
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={shownPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App
