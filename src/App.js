import React from 'react';
//import logo from './logo.svg';
import './App.css';

import Header from './features/Header/Header';
import Posts from './features/Posts/Posts';
import Subreddits from './features/Subreddits/Subreddits';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faSquareReddit } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faMessage, faBars } from '@fortawesome/free-solid-svg-icons';
import { faCircleUp, faCircleDown, faCircleLeft, faCircleRight } from '@fortawesome/free-regular-svg-icons';

library.add(fab, faMagnifyingGlass, faMessage, faCircleUp, faCircleDown, faCircleLeft, faCircleRight, faSquareReddit, faBars);

function App() {
  return (
    <>
      <Header />
      <main>
        <Posts />
      </main>
      <aside>
        <Subreddits />
      </aside>
    </>
  );
}

export default App;
