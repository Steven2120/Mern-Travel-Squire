import { useState } from "react";

function Counter() {
  const [counter, setCounter] = useState(0);

  const decrement = () => {
    setCounter(counter - 1);
  };

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <h2>Increment Screen</h2>
      <button onClick={decrement}>Subtract</button>
      <p>{counter}</p>
      <button onClick={increment}>Add</button>
    </div>
  );
}

export default Counter;
