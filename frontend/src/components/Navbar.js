import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink></li>
        <li><NavLink to="/code-explanation" className={({ isActive }) => (isActive ? styles.active : "")}>Code Explanation</NavLink></li>
        <li><NavLink to="/error-finder" className={({ isActive }) => (isActive ? styles.active : "")}>Error Finder</NavLink></li>
        <li><NavLink to="/error-fixer" className={({ isActive }) => (isActive ? styles.active : "")}>Error Fixer</NavLink></li>
        <li><NavLink to="/code-optimizer" className={({ isActive }) => (isActive ? styles.active : "")}>Code Optimizer</NavLink></li>
        <li><NavLink to="/language-translator" className={({ isActive }) => (isActive ? styles.active : "")}>Language Translator</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
