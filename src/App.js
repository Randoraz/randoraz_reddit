import React from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
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

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Counter />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <span>
    //       <span>Learn </span>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux-toolkit.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux Toolkit
    //       </a>
    //       ,<span> and </span>
    //       <a
    //         className="App-link"
    //         href="https://react-redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React Redux
    //       </a>
    //     </span>
    //   </header>
    // </div>
  );
}

export default App;
