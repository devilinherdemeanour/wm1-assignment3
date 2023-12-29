import React from 'react';
import styles from './styles/home.module.scss'

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeHeader}>Welcome to My Page</h1>
      <p className={styles.welcomeText}>
        Hello! I'm Ibrahim Mammadli, and this is my portfolio showcasing the projects I've worked on.
      </p>

      <h2 className={styles.projectsTitle}>Projects</h2>
      <ul className={styles.projectsList}>
        <li>
          <strong>Numeraglobal</strong> - Small front-end application written in pure JS and HTML - &nbsp;
          <a href="https://numeraglobal.com">Numeraglobal</a>
        </li>
        <li>
          <strong>Numeraglobal (Backend)</strong> - Small backend-end application written in Python using Flask - &nbsp;
          <a href="">Numeraglobal (Backend)</a>
        </li>
        <li>
          <strong>Botbear</strong> - Project that I have participated in creating. Botbear is an interactive chatbot with tons of features. It is made for Twitch platform and is written with Node.js - &nbsp;
          <a href="https://github.com/devilinherdemeanour/botbear" target='_blank'>Botbear</a>
        </li>
      </ul>

      <h2 className={styles.projectsTitle}>Future Projects (currently in progress)</h2>
      <ul className={styles.projectsList}>
        <li>
          <strong>Fitmom</strong> - Platform for women who wants to be in shape. This projects have both backend and frontend, frontend is written in AngularJS and backend is written is SpringBoot (Java) - &nbsp;
          <a href="">Soon...</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
