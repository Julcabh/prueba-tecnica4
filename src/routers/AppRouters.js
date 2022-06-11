import React, { useState, useEffect } from "react";
import { 
  BrowserRouter as Router,
  Route, Routes 
} from "react-router-dom";
import Login from "../components/Login"
import { Registro } from "../components/Registro"
import { DashboardRouter } from "./DashboardRouter"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginEmailPassAsincrono } from "../actions/actionLogin";
//Peliculas


export default function AppRouters() {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(loginEmailPassAsincrono(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    })
  }, [dispatch, setChecking, setIsLoggedIn])


  if (checking) {
    return (
      <h1>Espere...</h1>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <PublicRoute isAuthenticated={isLoggedIn}>
          <Login />
          </PublicRoute>
        }/>
        
        <Route path="/registro" element={
          <PublicRoute isAuthenticated={isLoggedIn}>
            <Registro />
          </PublicRoute>
        }/>

        <Route path="/*" element={
          <PrivateRoute isAuthenticated={isLoggedIn}>
            <DashboardRouter />
          </PrivateRoute>
        } />

        <Route path="/*" element={
          <PrivateRoute isAuthenticated={isLoggedIn}>
            <DashboardRouter />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

