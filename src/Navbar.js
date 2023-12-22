import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/navbar.module.scss'; 

const Navbar = () => {
    return (
         <nav>
          <ul className={styles.navbar}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">Flash Cards App</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
    );
  };
  
  export default Navbar;