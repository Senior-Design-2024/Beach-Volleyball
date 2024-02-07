import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import FourZeroFour from './pages/404';

function App() {
  return (
    <Router>
      <Routes>
        {/*defines the paths for the website*/}
        <Route path="/" element={<Home />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/*" element={<FourZeroFour />} />
      </Routes>
    </Router>
  );
}

export default App;
