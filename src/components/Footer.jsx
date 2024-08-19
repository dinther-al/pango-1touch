import React, { forwardRef } from "react";
import { toast } from "react-toastify";
import "../css/footer.css";
import { useStore } from "zmp-framework/react";
import store from "../store";
import Skeleton from "react-loading-skeleton";

const Footer = () => {
  const loading = useStore("loading");
  const info = useStore("info");
  const selectedProduct = useStore("selectedProduct");
  const selectedProductData = useStore("selectedProductData");
  const discountAmount = useStore("discountAmount");


  const handleOrder = async () => {
    if (!selectedProduct) {
      await store.dispatch("setIsOpenModal", true);
      return;
    }

    if (!info.name || !info.phone) {
      toast.warning("Bạn nhập thiếu thông tin!");
      return;
    }

    await store.dispatch("setCheckOrder", true);
  };

  return (
    <div className="footer bg-opacity-40 backdrop-filter backdrop-blur-md fixed bottom-0 left-0 right-0 w-full bg-white">
      {loading ? (
        <Skeleton
          height={40}
          width={400}
          className="flex items-center justify-center mt-5 ml-4 bg-gray-300 rounded sm:w-96 dark:bg-gray-700"
        />
      ) : (
        <div className="footer-button flex items-center justify-between h-16 px-4 bg-green-700 text-white rounded-sm font-normal">
          <p className="flex font-normal">
            {`Tổng tiền là ${selectedProductData && selectedProductData.id === selectedProduct
                ? (selectedProductData.price - discountAmount).toLocaleString()
              : "0"} VNĐ`}
          </p>
          <button
            className="flex items-center text-xs my-1 mx-0 px-4 py-2 font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] rounded-full border border-white"
            onClick={handleOrder}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current text-white mr-2"
            >
              <path
                fill="#ffff"
                d="M16.15 13H5q-.425 0-.712-.288T4 12q0-.425.288-.712T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L19.3 11.3q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7z"
              />
            </svg>
            <div className="font-medium">ĐẶT HÀNG</div>
          </button>
        </div>
      )}
    </div>
  );
};

export default forwardRef(Footer);
