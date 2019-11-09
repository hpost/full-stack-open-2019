import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const FeedbackButtons = ({ handleGood, handleNeutral, handleBad }) => (
  <div>
    <Button handleClick={handleGood} text='good' />
    <Button handleClick={handleNeutral} text='neutral' />
    <Button handleClick={handleBad} text='bad' />
  </div>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all || 0
  const positive = good / all || 0

  return (
    <div>
      <h1>statistics</h1>
      {all > 0 &&
        <>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {all}</p>
          <p>average {average}</p>
          <p>positive {positive} %</p>
        </>
      }
      {all === 0 &&
        <p>no feedback given</p>
      }
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = (num) => () => setGood(num)
  const handleNeutral = (num) => () => setNeutral(num)
  const handleBad = (num) => () => setBad(num)

  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackButtons
        handleGood={handleGood(good + 1)}
        handleNeutral={handleNeutral(neutral + 1)}
        handleBad={handleBad(bad + 1)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
