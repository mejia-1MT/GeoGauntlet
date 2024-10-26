import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Capital from "./pages/Capital";
import Flag from "./pages/Flag";
import Population from "./pages/Population";

function App() {
  const [key, setKey] = useState(0); // State to force remount

  const handleTryAgain = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to force remount
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/capital"
          element={<Capital key={key} handleTryAgain={handleTryAgain} />}
        />
        <Route
          path="/flag"
          element={<Flag key={key} handleTryAgain={handleTryAgain} />}
        />

        <Route
          path="/population"
          element={<Population key={key} handleTryAgain={handleTryAgain} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
