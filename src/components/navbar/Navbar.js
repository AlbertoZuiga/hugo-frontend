import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import './Navbar.css';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/hugo-frontend/" className="navbar-logo">HUGO</Link>
      <ul className="navbar-links">
        <li><Link to="/hugo-frontend/search-courses">Buscar Ramos</Link></li>
        {isAuthenticated && (
          <>
            <li><Link to="/hugo-frontend/upload-excel">Subir Excel</Link></li>
            <li><Link to="/hugo-frontend/crud-curso">Gestionar ramos</Link></li>
            <li><Link to="/hugo-frontend/crud-profesor">Gestionar profesores</Link></li>
            <li><Link to="/hugo-frontend/crud-seccion">Gestionar secciones</Link></li>
            <li><Link to="/hugo-frontend/crud-bloque">Gestionar bloques</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-button">Log out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
