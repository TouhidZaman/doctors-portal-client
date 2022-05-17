import React from "react";
import { Route, Routes } from "react-router-dom";
import Appointment from "./components/Layout/Pages/Appointment/Appointment";
import Login from "./components/Layout/Pages/Auth/Login/Login";
import Signup from "./components/Layout/Pages/Auth/Signup/Signup";
import Home from "./components/Layout/Pages/Home/Home";
import NotFound from "./components/Layout/Pages/NotFound/NotFound";
import RequireAuth from "./components/Layout/Pages/RequireAuth";

const AppRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/sign-up" element={<Signup />} />
         <Route
            path="/appointment"
            element={
               <RequireAuth>
                  <Appointment />
               </RequireAuth>
            }
         />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};

export default AppRoutes;
