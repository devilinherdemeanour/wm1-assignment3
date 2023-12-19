
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Welcome to My Page</h1>
      <p>
        Hello! I'm Ibrahim Mammadli, and this is my portfolio showcasing the projects I've worked on.
      </p>

      <h2>Projects</h2>
      <ul>
        <li>
          <strong>Numeraglobal</strong> - Small front-end application written in pure JS and HTML - &nbsp;
          <a href="">Numeraglobal</a>
        </li>
        <li>
          <strong>Numeraglobal (Backend)</strong> - Small backend-end application written in Python using Flask - &nbsp;
          <a href="">Numeraglobal (Backend)</a>
        </li>
        <li>
          <strong>Botbear</strong> - Project that I have participated in creating. Botbear is an interactive chatbot with tons of features. It is made for Twitch platform and is written with Node.js - &nbsp;
          <a href="">Botbear</a>
        </li>
      </ul>

      <h2>Future Projects (currently in progress)</h2>
      <ul>
        <li>
          <strong>Fitmom</strong> - Platform for women who wants to be in shape. This projects have both backend and frontend, frontend is written in AngularJS and backend is written is SpringBoot (Java) - &nbsp;
          <a href="">Soon...</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
