import React from "react";

import Auth from "../components/auth/Auth";
import Registration from "../components/registration/Registration";
import { Route, Routes } from "react-router-dom";
import MainPage from "../components/mainPage/MainPage";
import Confirmation from "../components/confirmation/Confirmation";
import MainPage2 from "../components/mainPage/MainPage2";
const MAIN_ROUTES = [
  { id: 1, link: "/", element: <Auth /> },
  { id: 2, link: "/register", element: <Registration /> },
  { id: 3, link: "/mainPage", element: <MainPage /> },
  { id: 4, link: "/mainPage2", element: <MainPage2 /> },
  { id: 5, link: "/confirmation", element: <Confirmation /> },
];
const MainRoutes = () => {
  return (
    <div>
      <Routes>
        {MAIN_ROUTES.map((elem) => (
          <Route path={elem.link} key={elem.id} element={elem.element} />
        ))}
      </Routes>
    </div>
  );
};

export default MainRoutes;
