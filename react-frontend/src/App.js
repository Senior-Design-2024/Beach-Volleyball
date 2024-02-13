import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Teams from './pages/Teams';
import CreateTeam from './pages/CreateTeam'
import Players from './pages/Players'
import EditTeam from './pages/EditTeam';
import CreatePlayer from './pages/CreatePlayer';
import PlayerOverview from './pages/PlayerOverview';
import EditPlayer from './pages/EditPlayer';
import Pairs from './pages/Pairs';
import NewPair from './pages/NewPair';
import FourZeroFour from './pages/404';

function App() {
  return (
    <Router>
      <Routes>
        {/*defines the paths for the website*/}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Teams" element={<Teams />} />
        <Route path="/CreateTeam" element={<CreateTeam/>} />
        <Route path="/Players" element={<Players />} />
        <Route path="/EditTeam" element={<EditTeam />} />
        <Route path="/CreatePlayer" element={<CreatePlayer />} />
        <Route path="/PlayerOverview" element={<PlayerOverview />} />
        <Route path="/EditPlayer" element={<EditPlayer />} />
        <Route path="/Pairs" element={<Pairs />} />
        <Route path="/NewPair" element={<NewPair />} />
        <Route path="/*" element={<FourZeroFour />} />
      </Routes>
    </Router>
  );
}

export default App;
