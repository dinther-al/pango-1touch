import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "zmp-framework/react";
import store from "../../store.js";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import Introduction from "./Introduction.jsx";
import InputForm from "../input/InputForm.jsx";
import Footer from "../Footer.jsx";

const Form = () => {
  const loading = useStore("loading");
  const info = useStore("info");
  const selectedProduct = useStore("selectedProduct");

  const [footerAppear, setFooterAppear] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    await store.dispatch("setInfo", {
      ...info,
      [name]: value,
    });
  };

  const discountCodes = {
    VC10K: 10000,
    VC20K: 20000,
  };

  const handleSaleChange = (event) => {
    const value = event.target.value;
    if (discountApplied) {
      toast.warning("Chỉ áp dụng 1 mã giảm giá!");
      return;
    }

    setDiscountCode(value);
    setShowClearButton(value !== "");
  };

  const clearDiscountCode = () => {
    setDiscountCode("");
    setShowClearButton(false);
  };

  const applyDiscount = async () => {
    try {
      if (discountApplied) {
        toast.warning("Bạn đã áp dụng mã giảm giá này!");
        return;
      }

      if (selectedProduct === null) {
        await store.dispatch("setIsOpenModal", true);
        return
      }

      const discountValue = discountCodes[discountCode];
      if (discountValue !== undefined) {
        toast.success("Mã giảm giá được áp dụng thành công!");
        await store.dispatch("setDiscountAmount", discountValue);
        setDiscountApplied(true);
      } else {
        toast.error("Mã giảm giá không hợp lệ!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = () => {
    setFooterAppear(!footerAppear);
  };

  return (
    <div className="p-4 mt-8 mb-20">
      {loading ? (
        <div>
          <Skeleton
            height={70}
            width={350}
            className="flex items-center justify-center bg-gray-300 rounded m-auto mt-2"
          />
          <Skeleton
            height={30}
            width={350}
            className="flex items-center justify-center bg-gray-300 rounded m-auto mt-2"
          />
          <Skeleton
            height={30}
            width={350}
            className="flex items-center justify-center bg-gray-300 rounded m-auto mt-2"
          />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mt-2 mb-4 bg-gray-300 px-4 py-6 rounded-lg">
            <div>
              <label className="block text-white-700 text-lg font-semibold mb-2" htmlFor="sale">
                Mã giảm giá
              </label>
              <div className="relative">
                <input
                  id="sale"
                  type="text"
                  placeholder="Nhập mã"
                  value={discountCode}
                  onChange={handleSaleChange}
                  onBlur={handleBlur}
                  onFocus={handleBlur}
                  className="shadow appearance-none border rounded w-full py-3 pl-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-[0_0px_2px_#1f633c]"
                />
                {showClearButton && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    className="absolute right-3 bottom-[0.6rem]"
                    onClick={clearDiscountCode}
                  >
                    <path
                      fill="#888888"
                      d="m8.4 16.308l3.6-3.6l3.6 3.6l.708-.708l-3.6-3.6l3.6-3.6l-.708-.708l-3.6 3.6l-3.6-3.6l-.708.708l3.6 3.6l-3.6 3.6zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21"
                    />
                  </svg>
                )}
              </div>
            </div>
            <button
              disabled={!discountCode}
              onClick={applyDiscount}
              className={` px-6 rounded-lg text-white h-[2.9rem] relative top-[1.15rem] ${discountCode ? "bg-green-800" : "bg-gray-400"
                }`}
            >
              Áp dụng
            </button>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-4 text-gray-600">
              Thông tin giao hàng
            </h1>
            <InputForm
              label="Số điện thoại "
              type="number"
              placeholder="0987654321"
              name="phone"
              value={info.phone}
              onChange={handleInputChange}
              handleBlur={handleBlur}
            />
            <InputForm
              label="Tên liên hệ"
              type="text"
              placeholder="Thơ Đình"
              name="name"
              value={info.name}
              onChange={handleInputChange}
              handleBlur={handleBlur}
            />
          </div>
          <Introduction />
        </div>
      )}
      {footerAppear && <Footer />}
    </div>
  );
};

export default Form;
