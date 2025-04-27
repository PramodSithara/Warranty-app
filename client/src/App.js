import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StickerPrint from './components/StickerPrint';
import Login from './components/Login';
import Register from './components/Register';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/sign' element={<Register />}></Route>
        <Route exact path='/generator' element={<StickerPrint />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;