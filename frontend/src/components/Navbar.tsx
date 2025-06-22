import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navLogo}>
          Empreedize Fretes
        </Link>
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/catalogoCaminhao" className={styles.navLink}>
              Catálogo de caminhões
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
