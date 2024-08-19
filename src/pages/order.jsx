import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "zmp-framework/react";
import store from "../store";
import { useNavigate } from "react-router-dom";
import { Box } from "zmp-ui";
import InputForm from "../components/input/InputForm";
import FreeShip from "../components/freeship/FreeShip";
import "../css/AnimatedBox.css";

const OrderPage = () => {
  const infoAddress = useStore("infoAddress");
  const newInfoAddress = useStore("newInfoAddress");
  const selectedProductData = useStore("selectedProductData");
  const discountAmount = useStore("discountAmount");
  const isOrder = useStore("isOrder");
  const selectedAddress = useStore("selectedAddress");

  const [footerAppear, setFooterAppear] = useState(true);

  const handleAddressChange = async (event) => {
    await store.dispatch("setSelectedAddress", event.target.value);
  };

  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (selectedAddress === "existingAddress") {
      await store.dispatch("setInfoAddress", {
        ...infoAddress,
        [name]: value,
      });
    } else {
      await store.dispatch("setNewInfoAddress", {
        ...newInfoAddress,
        [name]: value,
      });
    }
  };

  const handleBlur = () => {
    setFooterAppear(!footerAppear);
  };

  const handleOrder = async () => {
    let address =
      selectedAddress === "existingAddress" ? infoAddress : newInfoAddress;

    if (
      !address.city ||
      !address.district ||
      !address.ward ||
      !address.street
    ) {
      toast.warning("Bạn nhập thiếu thông tin!");
      return;
    }

    switch (type) {
      case "123":
        sta;
        break;
      case "456":
        sta;
        break;
      default:
        break;
    }

    await store.dispatch("setIsOrder", true);
    navigate("/success");
  };

  return (
    <div className="p-4 mt-6 mb-20">
      {isOrder ? (
        <Box>
          <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
            <div className="p-4 block">
              <div className="mt-2 flex items-center">
                <button className="text-gray-500" onClick={() => navigate("/")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    width="20"
                    height="20"
                  >
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                  </svg>
                </button>
                <h1 className="font-semibold text-xl mx-auto">
                  Nhập địa chỉ nhận hàng
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="existingAddress"
                name="addressType"
                value="existingAddress"
                checked={selectedAddress === "existingAddress"}
                onChange={handleAddressChange}
                className="w-4 h-4 accent-green-600"
              />
              <label
                htmlFor="existingAddress"
                className="text-black text-base font-semibold"
              >
                Giao hàng đến địa chỉ này
              </label>
            </div>
            {selectedAddress === "existingAddress" && (
              <div>
                {infoAddress.street} {infoAddress.ward} {infoAddress.district}{" "}
                {infoAddress.city}
              </div>
            )}
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="newAddress"
                name="addressType"
                value="newAddress"
                checked={selectedAddress === "newAddress"}
                onChange={handleAddressChange}
                className="w-4 h-4 accent-green-600"
              />
              <label
                htmlFor="newAddress"
                className="text-black text-base font-semibold"
              >
                Nhập địa chỉ nhận hàng mới
              </label>
            </div>
            <FreeShip />
            {selectedAddress !== "existingAddress" && (
              <div className="mt-8">
                <InputForm
                  label="Tỉnh/Thành Phố"
                  type="text"
                  placeholder="Nhập Tỉnh/Thành Phố"
                  name="city"
                  value={newInfoAddress.city || ""}
                  onChange={handleInputChange}
                  handleBlur={handleBlur}
                />
                <InputForm
                  label="Quận/Huyện"
                  type="text"
                  placeholder="Nhập Quận/Huyện"
                  name="district"
                  value={newInfoAddress.district || ""}
                  handleBlur={handleBlur}
                  onChange={handleInputChange}
                />
                <InputForm
                  label="Phường/Xã"
                  type="text"
                  placeholder="Nhập Phường/Xã"
                  name="ward"
                  value={newInfoAddress.ward || ""}
                  handleBlur={handleBlur}
                  onChange={handleInputChange}
                />
                <InputForm
                  label="Số nhà, tên đường"
                  type="text"
                  placeholder="Bấm vào để nhập thông tin"
                  name="street"
                  value={newInfoAddress.street || ""}
                  handleBlur={handleBlur}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
        </Box>
      ) : (
        <Box>
          <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
            <div className="p-4 block">
              <div className="mt-2 flex items-center">
                <button className="text-gray-500" onClick={() => navigate("/")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    width="20"
                    height="20"
                  >
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                  </svg>
                </button>
                <h1 className="font-semibold text-xl mx-auto">
                  Nhập địa chỉ nhận hàng
                </h1>
              </div>
              <FreeShip />
            </div>
          </div>
          <div className="mt-12">
            <InputForm
              label="Tỉnh/Thành Phố"
              type="text"
              placeholder="Nhập Tỉnh/Thành Phố"
              name="city"
              value={infoAddress.city}
              handleBlur={handleBlur}
              onChange={handleInputChange}
            />
            <InputForm
              label="Quận/Huyện"
              type="text"
              placeholder="Nhập Quận/Huyện"
              name="district"
              value={infoAddress.district}
              handleBlur={handleBlur}
              onChange={handleInputChange}
            />
            <InputForm
              label="Phường/Xã"
              type="text"
              placeholder="Nhập Phường/Xã"
              name="ward"
              value={infoAddress.ward}
              handleBlur={handleBlur}
              onChange={handleInputChange}
            />
            <InputForm
              label="Số nhà, tên đường"
              type="text"
              placeholder="Bấm vào để nhập thông tin"
              name="street"
              value={infoAddress.street}
              handleBlur={handleBlur}
              onChange={handleInputChange}
            />
          </div>
        </Box>
      )}
      <Box>
        <div className="p-6 bg-white rounded min-w-80">
          <h2 className="text-lg font-bold mb-4">THÔNG TIN ĐẶT HÀNG CỦA BẠN</h2>
          <div className="flex items-center space-x-4">
            <img
              className="w-16 h-16 object-cover"
              src={selectedProductData.image}
              alt="Beer"
            />
            <div>
              <h3 className="text-base">{selectedProductData.detail}</h3>
              <p className="">
                {selectedProductData.price.toLocaleString()} VNĐ
              </p>
            </div>
          </div>
          {discountAmount !== 0 && (
            <div className="flex items-center space-x-4 mt-2">
              <img
                className="w-16 h-16 object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/pangosell.appspot.com/o/voucher.png?alt=media&token=f0d68537-3529-4ca6-82e7-234adeec510a"
                alt="Voucher giảm giá"
              />
              <div>
                <h3 className="text-base">Voucher giảm giá</h3>
                <p className="">-{discountAmount.toLocaleString()} VNĐ</p>
              </div>
            </div>
          )}
          <hr className="my-4" />
          <div className="flex justify-end items-center">
            <h2 className="text-base font-bold">TỔNG TIỀN:</h2>
            <p className="ml-2 text-base font-bold">
              {(selectedProductData.price - discountAmount).toLocaleString()}{" "}
              VNĐ
            </p>
          </div>

          <div className="fixed bottom-8 left-8 right-8 flex justify-center">
            <button
              className={`w-full max-w-md p-4 text-white rounded-lg mt-6 transition duration-150 ease-in-out leading-normal ${
                footerAppear ? "bg-green-800 animate-pulse" : "bg-gray-300"
              }`}
              disabled={!footerAppear}
              onClick={handleOrder}
            >
              👌 Đặt hàng ngay
            </button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default OrderPage;
