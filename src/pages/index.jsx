import React from "react";
import { Page } from "zmp-ui";
import { useStore } from "zmp-framework/react";
import Sale from "../components/product/Sale";
import FormOrder from "../components/form/FormOrder";
import "../css/AnimatedBox.css";
import Modal from "../components/modal/Modal";
import InfoModal from "../components/modal/InfoModal";
import Counsel from "../components/product/Counsel";

const HomePage = () => {
  const isOpenModal = useStore("isOpenModal");
  const checkOrder = useStore("checkOrder");

  return (
    <Page>
      <Sale />
      <Counsel />
      <FormOrder />
      {isOpenModal && <Modal />}
      {checkOrder && <InfoModal />}
    </Page>
  );
};

export default HomePage;
