import { BrowserRouter, Route, Routes } from "react-router-dom";
import Input from "./Input";
import Output from "./Output";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Input />} />
        <Route path="/output" element={<Output />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
