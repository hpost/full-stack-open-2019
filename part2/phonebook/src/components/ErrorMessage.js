import React from 'react'

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  let errorStyle = {
    color: 'red',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

export default ErrorMessage