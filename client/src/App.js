import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import StickerPrint from './components/StickerPrint';
import Login from './components/Login';
import Register from './components/Register';
import Panel from './components/Panel';
import NotFound from './components/NotFound';
import RouteProtect from './components/RouteProtect';
import UserRegister from './components/UserRegister';


function App() {
  const titles = ['E-Zone Technologies', 'Sticker Genarator'];
  const [currentTitle, setCurrentTitle] = useState(titles[0]);

  useEffect(() => {
    document.title = currentTitle;
  }, [currentTitle]);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setCurrentTitle(prevTitle => {
        const nextIndex = (titles.indexOf(prevTitle) + 1) % titles.length;
        return titles[nextIndex];
      });
    }, 3000);
    return () => clearInterval(titleInterval);
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/sign' element={<Register />}></Route>
        <Route exact path='/generator' element={<RouteProtect><StickerPrint /></RouteProtect>}></Route>
        <Route exact path='/panel' element={<RouteProtect><Panel /></RouteProtect>}></Route>
        <Route exact path='/user' element={<RouteProtect><UserRegister /></RouteProtect>}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;