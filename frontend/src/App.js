import "./App.css";
import Home from "./Pages/Home";
import User from "./Pages/User";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
