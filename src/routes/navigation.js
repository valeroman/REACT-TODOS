   
import {
  BrowserRouter as Router, NavLink, Route, Routes
} from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/Not-found';
import { Register } from '../pages/Register';



export const Navigation = () => {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/not-found" element={ <NotFound /> } />
          <Route path="/home" element={ <Home /> } />
        </Routes>
    </Router>
  );
}