import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import LaddingPage from "./components/view/ladding-page";
import Home from "./components/view/Home";
import Proyectos from "./components/view/Proyectos";
import Test from "./components/view/test";
import Sube from './components/view/Sube';
import Proyecto from './components/layout/Proyecto';
import { UserProvider } from "./context/UserContext";

const App: React.FC = () => {
  return (
    <Router>
      <GoogleOAuthProvider clientId="57061430006-pdve1kn6n8iv4uhjbmh7leh1mkp5n1is.apps.googleusercontent.com">
        <UserProvider>
          <Routes>
            <Route path="/" element={<LaddingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/test" element={<Test />} />
            <Route path="/sube" element={<Sube />} />
            <Route path="/proyecto/:id" element={<Proyecto />} />
          </Routes>
        </UserProvider>
      </GoogleOAuthProvider>
    </Router>
  );
};

export default App;
