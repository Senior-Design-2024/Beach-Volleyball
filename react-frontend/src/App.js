import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './main/Main';
import User from './user/User';
import Match from './match/Match';
import FourZeroFour from './404';

function App() {
  return (
    <Router>
      <Routes>
        {/*defines the paths for the website*/}
        <Route path="/" element={<Main />} />
        <Route path="/User" element={<User />} />
        <Route path="/Match" element={<Match />} />
        <Route path="/*" element={<FourZeroFour />} />
      </Routes>
    </Router>
  );
}

export default App;