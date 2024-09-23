import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Output = () => {
  const [data, setData] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/output", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.number);
      });
    console.log(data);
  }, [data, setData]);

  if (data === undefined) {
    return <Navigate to="/" />;
  }

  const handleClick = () => {
    axios.post("http://localhost:4000/reset", { withCredentials: true });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Practicing JWT - Output</h1>

      <p>Number entered: {data}</p>
      <button onClick={handleClick}>Reset</button>
    </div>
  );
};

export default Output;
