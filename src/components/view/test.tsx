import React from 'react';
import { useUser } from '../../context/UserContext';

const SomeComponent: React.FC = () => {
  const { user } = useUser(); // Obtén el usuario desde el contexto

  if (!user) {
    return <p>No estás logueado</p>;
  }

  const userRole = user.rol; // Accede al rol del usuario

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      <p>Tu rol es: {userRole}</p>
    </div>
  );
};

export default SomeComponent;
