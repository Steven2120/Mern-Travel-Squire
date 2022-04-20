import { useState } from "react";

function Division() {
  const [firstNum, setFirstNum] = useState(0);
  const [secondNum, setSecondNum] = useState(0);
  const [quotient, setQuotient] = useState(0);

  const getQuotient = () => {
    setQuotient(firstNum / secondNum);
  };

  return (
    <>
      <div>
        <h2>Division Screen</h2>
        <input
          className="first__num"
          type="number"
          onChange={(e) => setFirstNum(e.target.value)}
        />
        <button
          onClick={getQuotient}
          style={{ margin: "2rem" }}
          className="div__btn"
        >
          /
        </button>
        <input
          type="text"
          className="sec__num"
          onChange={(e) => setSecondNum(e.target.value)}
        />
      </div>
      <div>
        <p>{quotient}</p>
      </div>
    </>
  );
}

export default Division;
