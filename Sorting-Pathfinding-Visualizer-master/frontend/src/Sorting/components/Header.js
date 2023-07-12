/* eslint-disable no-unused-vars */
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {

  const [showHeaderBar, setShowHeaderBar] = useState(true);

  const contactHandler = () => {
    setShowHeaderBar(!showHeaderBar);
  }

  return (
    <div className="sort-header">
      <div className="header-logo"><span>SORTING VISUALIZER</span></div>
      <div className="header__options">
      </div>
      <Link to="/"><button className='logout'>Logout</button></Link>
   </div>
  )
}

export default Header;