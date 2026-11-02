import { useState } from "react";

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  return (
    <>
      <h3>statistics</h3>
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average ? average : ""}</p>
        <p>positive {positive ? positive : ""} %</p>
      </div>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h3>give feedback</h3>
      <div>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
