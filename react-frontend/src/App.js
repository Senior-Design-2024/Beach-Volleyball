import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Teams from './pages/Teams';
import CreateTeam from './pages/CreateTeam';
import Players from './pages/Players';
import EditTeam from './pages/EditTeam';
import CreatePlayer from './pages/CreatePlayer';
import PlayerOverview from './pages/PlayerOverview';
import EditPlayer from './pages/EditPlayer';
import Pairs from './pages/Pairs';
import NewPair from './pages/NewPair';
import Matches from './pages/Matches';
import EditPair from './pages/EditPair';
import MatchStats from './pages/MatchStats';
import EditMatch from './pages/EditMatch';
import NewMatch from './pages/NewMatch';
import SetOverview from './pages/SetOverview';
import Serving from './pages/Serving';
import Receiving from './pages/Receiving';
import Rally from './pages/Rally';
import RallyDetails from './pages/RallyDetails';
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
        <Route path="/Matches" element={<Matches />} />
        <Route path="/EditPair" element={<EditPair />} />
        <Route path="/MatchStats" element={<MatchStats />} />
        <Route path="/EditMatch" element={<EditMatch />} />
        <Route path="/NewMatch" element={<NewMatch />} />
        <Route path="/SetOverview" element={<SetOverview />} />
        <Route path="/Serving" element={<Serving />} />
        <Route path="/Receiving" element={<Receiving />} />
        <Route path="/Rally" element={<Rally />} />
        <Route path="/RallyDetails" element={<RallyDetails />} />
        <Route path="/*" element={<FourZeroFour />} />
      </Routes>
    </Router>
  );
}

export default App;
