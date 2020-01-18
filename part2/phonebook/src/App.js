import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const fetchPersons = () => {
    personsService
      .getAll()
      .then(persons => setPersons(persons))
  }

  useEffect(fetchPersons, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(entry => entry.name === newName)) {
      const replace = window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
      if (replace) {
        const person = persons.find(p => p.name === newName)
        const updatedObject = {
          name: person.name,
          number: newNumber
        }
        personsService
          .updateNumber(person.id, updatedObject)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showError(`Information of ${person.name} has already been deleted from server`, true)
          })
      }
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
        showNotification(`Added '${person.name}'`)
      })
  }

  const deletePerson = (id, name) => {
    const confirmed = window.confirm(`Delete ${name}?`)
    if (!confirmed) return

    personsService.remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        showNotification(`Deleted '${name}'`)
      })
      .catch(error => {
        showError(`Information of ${name} has already been deleted from server`, true)
      })
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const showError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 3000)
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
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
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
