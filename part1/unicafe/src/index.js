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

const Statistic = ({ text, value }) => (
  <p>{text} {value}</p>
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
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={all} />
          <Statistic text='average' value={average} />
          <Statistic text='positive' value={`${positive} %`} />
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
