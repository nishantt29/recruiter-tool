import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import AddCandidate from './components/AddCandidate';
import CandidateList from './components/CandidateList';
import "./App.css"

function App() {
  return (
    <Router>
      <div style={{width:"100%"}}>
      <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active">Home</NavLink>
            </li>
            <li>
              <NavLink to="/add" activeClassName="active">Add Candidate</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/add" element={<AddCandidate />} />
          <Route path="/" element={<CandidateList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
