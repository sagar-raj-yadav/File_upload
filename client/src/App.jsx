// client/src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import Login from './loginsignup/Login';
import Singup from './loginsignup/Signup';
import './App.css';

const App = () => {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
