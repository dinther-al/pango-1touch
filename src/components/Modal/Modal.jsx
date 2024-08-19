import React from "react";
import store from "../../store.js";
import { motion } from "framer-motion";

const Modal = () => {

  const handleCloseModal = async () => {
    try {
      await store.dispatch("setIsOpenModal", false);
    } catch (error) {
      console.error(error);
    }
  };


  return (
        <div className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-gray-500 bg-opacity-50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.4 }}
            style={{ width: 320 }}
            className="min-h-36 bg-white py-2 px-4 rounded-lg"
          >
            <h1 className="mb-2 font-semibold text-xl">Thông báo</h1>
            <p className="mb-4 text-base">Bạn chưa chọn sản phẩm</p>
            <button
              className="mt-8 mx-auto block px-6 py-2 rounded"
              onClick={handleCloseModal}
            >
              Ok
            </button>
          </motion.div>
        </div>
  );
};

export default Modal;
