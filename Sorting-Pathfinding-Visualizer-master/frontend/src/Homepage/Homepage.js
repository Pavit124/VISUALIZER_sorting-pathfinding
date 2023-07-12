import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Homepage.css';

function Homepage() {
  const navigate = useNavigate();

  const handleSortingClick = () => {
    navigate("/Sorting");
  };

  const handlePathfindingClick = () => {
   navigate("/Pathfinding");
  };
 

  return (
    <div className="homepage">
      <div className="main">
        <h2 className="title1">Visualizer</h2>
        <span className="subtitle">Pick your choice!!!</span>
        <div className="choice-buttons">
          <button className="button" onClick={handleSortingClick}>Sorting</button>
          <button className="button" onClick={handlePathfindingClick}>Path Finding</button>
        </div>
      </div>
    </div>
  )
}

export default Homepage;
