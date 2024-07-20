// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LaddingPage from "./components/view/ladding-page";
import Home from "./components/view/Home";
import Proyectos from "./components/view/Proyectos";
import Test from "./components/view/test";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Sube from './components/view/Sube';
import Vproyecto from './components/layout/Proyecto';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <GoogleOAuthProvider clientId="57061430006-pdve1kn6n8iv4uhjbmh7leh1mkp5n1is.apps.googleusercontent.com">
                <LaddingPage />
              </GoogleOAuthProvider>
            </div>
          }
        />

        <Route
          path="/home"
          element={
            <div>
              <Home />
            </div>
          }
        />

        <Route
          path="/proyectos"
          element={
            <div>
              <Proyectos />
            </div>
          }
        />


        <Route
          path="/test"
          element={
            <div>
              <Test/>
            </div>
          }
        />


        <Route
          path="/sube"
          element={
            <div>
              <Sube/>
            </div>
          }
        />

        <Route
          path="/proyecto"
          element={
            <div>
              <Vproyecto/>
            </div>
          }
        />

      </Routes>
      
    </Router>
  );
};

export default App;
