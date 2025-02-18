import './App.css'
import Login from './Temp/Boopathi/Login';
import Main from './Temp/Boopathi/Main';
import Admin from './Temp/Boopathi/Admin';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Pdf from './Temp/Geethu/pdf';
import Admin1 from './Temp/Geethu/Admin1';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        {/* Add a default route */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/admin" element={<Admin />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pdf" element={<Pdf />} />
        <Route path="/admin1" element={<Admin1 />} />
        
        {/* Optional: Catch all unknown routes and redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
