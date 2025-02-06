import './App.css'
import Login from './Temp/Boopathi/Login';
import Main from './Temp/Boopathi/Main';
import Admin from './Temp/Boopathi/Admin';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return(
    <>
    <BrowserRouter>
    <Routes>
       <Route path='/admin' element={<Admin />}></Route>
      <Route path='/main' element={<Main />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
