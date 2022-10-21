import React from 'react';
//import logo from './logo.svg';
import './App.css';

import Header from './features/Header/Header';
import Posts from './features/Posts/Posts';
import Subreddits from './features/Subreddits/Subreddits';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faSquareReddit } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faCircleUp, faCircleDown } from '@fortawesome/free-regular-svg-icons';

library.add(fab, faMagnifyingGlass, faMessage, faCircleUp, faCircleDown, faSquareReddit);

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
