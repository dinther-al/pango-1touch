import React from "react";
import { Route } from "react-router";
import { ToastContainer } from "react-toastify";
import { AnimationRoutes } from "zmp-ui";
import HomePage from "../../pages/index";
import OrderPage from "../../pages/order";
import SuccessPage from "../../pages/success";
import { Pages } from "../../utils/router/index";
import { Header } from "../Header";

export const Layout = () => {
  return (
    <div className="flex flex-col bg-white h-screen">
      <Header />
      <AnimationRoutes>
        <Route path={Pages.HomePage} element={<HomePage />}></Route>
        <Route path={Pages.OrderPage} element={<OrderPage />}></Route>
        <Route path={Pages.SuccessPage} element={<SuccessPage />}></Route>
      </AnimationRoutes>
      <ToastContainer />
    </div>
  );
};
