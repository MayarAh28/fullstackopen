import { useState } from "react";

const Display = ({ counter }) => <p>{counter}</p>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrease = () => setCounter(counter + 1);
  const handleDecrease = () => setCounter(counter - 1);
  const handleReset = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={handleIncrease} text={"Plus 1"} />
      <Button onClick={handleDecrease} text={"Minus 1"} />
      <Button onClick={handleReset} text={"Reset to 0"} />
    </div>
  );
};

export default App;
