import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Input = () => {
  const [count, setCount] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    console.log(count);
    axios.post(
      "http://localhost:4000/input",
      { number: count },
      { withCredentials: true }
    );
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/output" />;
  }

  return (
    <div>
      <h1>Practicing JWT - Input</h1>

      <label>Enter Number: </label>
      <input
        type="text"
        placeholder="Enter number"
        onChange={(e) => setCount(e.target.value)}
      />
      <button onClick={() => handleClick()}>Save</button>
    </div>
  );
};

export default Input;
