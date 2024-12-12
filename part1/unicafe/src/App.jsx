import { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({text, value}) => {
  if (text == 'percent') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>    
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + bad + neutral
  const avg = total/3
  const percent = (good/total)*100

  if (total == 0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='total' value={total}/>
        <StatisticLine text='avg' value={avg}/>
        <StatisticLine text='percent' value={percent}/>
      </tbody>
    </table>
  ) 
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App