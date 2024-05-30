import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import logocc from '../images/logocc.png';
import {useProjectConfig} from '../config/ProjectConfigProvider';
export const Navbar = () => {
  const {projectName,projectUrl}=useProjectConfig();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="nav-bar">
      {/* <img src={logocc} className="logo-cc" alt="logo" /> */}
      {projectName}
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="nav-items">
          <ul className={menuOpen ? "open" : ""}>
            <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/advance">Components</NavLink>
          </li>
          <li>
            <NavLink to="/editor">Editor</NavLink>
          </li>
          </ul>
        </div>
      </nav>
    </>
  );
};