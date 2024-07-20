import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from 'react-icons/fi';
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from '@react-oauth/google';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';


const LaddingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    // Aquí puedes manejar la respuesta de credenciales, como guardar tokens en el estado o en el almacenamiento local
    // Luego, redirigir al usuario a la vista "home"
    navigate('/home');
  };

  const handleLoginError = () => {
    console.log("Error al iniciar sesión, intenta de nuevo");
  };

  return (
    
    <div className="main-banner">
    <div className="owl-carousel owl-banner">
      <div className="item item-1">
        <div className="header-text">
          <span className="category"><em>Tu biblioteca confiable</em></span>
          <h2>PROYECTECA</h2>

          <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              />

 <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
          <ul className={`navbar ${menuOpen ? 'active' : ''}`}>
            <li className="google-login-btn">
             
            </li>
            {menuOpen && (
              <li>
                <button className="close-menu-btn" onClick={closeMenu}>
                  Cerrar
                </button>
              </li>
            )}

          </ul>
          </div>
          </div>
        </div>
      </div>   
  );
};

export default LaddingPage;