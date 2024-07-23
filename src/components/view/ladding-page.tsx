import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useUser } from '../../context/UserContext'; // Ajusta la ruta según tu estructura
import axios from 'axios'; // Asegúrate de importar axios

const LaddingPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Obtener la función para actualizar el usuario

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      console.log("Token recibido:", credentialResponse.credential); // Verifica el token aquí

      if (credentialResponse?.credential) {
        const response = await axios.post('http://localhost:5003/auth/google', {
          token: credentialResponse.credential
        });

        console.log("Respuesta del servidor:", response);

        if (response.status === 200) {
          setUser({ // Actualizar el contexto con los datos del usuario
            name: response.data.user.usuario_nombre,
            email: response.data.user.usuario_email,
            googleId: response.data.user.usuario_google_id,
          });
          navigate('/home');
        } else {
          console.error("Error en la respuesta del servidor:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", (error as Error).message);
    }
  };

  return (
    <div className="login-page">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default LaddingPage;
