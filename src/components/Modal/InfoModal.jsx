import React, { useState } from "react";
import { useStore } from "zmp-framework/react";
import store from "../../store.js";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const InFoModal = () => {
  const navigate = useNavigate();
  const isOpen = useStore("isOpen");
  const isCallBack = useStore("isCallBack");

  const [modalContent, setModalContent] = useState({
    title: "Thông tin giao hàng",
    subTitle: "Bấm chọn một hình thức để chúng tôi giao hàng đến bạn",
    button1Text: "Nhập địa chỉ nhận hàng",
    button2Text: "Nhãn hàng gọi lại cho bạn"
  });

  const handleCloseModal = async (event) => {
    try {
      if (event.target.classList.contains("bg-gray-500")) {
        await store.dispatch("setCheckOrder", false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async () => {
    try {
      if (isCallBack) {
        navigate('/success');
      } else {
        navigate('/form');
      }
      await store.dispatch("setCheckOrder", false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCallBack = async () => {
    setModalContent({
      title: "Thông tin thanh toán",
      subTitle: "Bấm chọn phương thức thanh toán",
      button1Text: "Thanh toán khi nhận hàng",
      button2Text: "Thanh toán online"
    });
    await store.dispatch("setIsCallBack", true);
  };

  return (
    <>
      {isOpen && (
        <div
          className="flex items-end justify-center fixed top-0 bottom-0 left-0 right-0 bg-gray-500 bg-opacity-50"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4 }}
            style={{ width: "100vw" }}
            className="bg-white p-4 pb-10 rounded-tl-xl rounded-tr-xl min-h-60"
          >
            <h1 className="mb-4 font-semibold text-black text-xl">
              {modalContent.title}
            </h1>
            <p className="mb-8 text-lg text-center">
              {modalContent.subTitle}
            </p>
            <div className="flex items-center justify-between mt-8 mx-auto px-4 py-3 bg-green-700 rounded-lg" onClick={handlePayment}>
              <p className="text-lg text-white leading-none">
                {modalContent.button1Text}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="20"
                height="20"
              >
                <path
                  fill="#fff"
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </div>
            {isCallBack ? (
              <div
                className="flex items-center justify-between my-8 mx-auto px-4 py-3 bg-green-700 rounded-lg"
              >
                <p className="text-lg text-white leading-none">
                  {modalContent.button2Text}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#fff"
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                  />
                </svg>
              </div>
            ) : (
              <div className="flex items-center justify-between my-8 mx-auto px-4 py-3 bg-green-700 rounded-lg" onClick={handleCallBack}>
                <p className="text-lg text-white leading-none">
                  {modalContent.button2Text}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#fff"
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                  />
                </svg>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default InFoModal;
