import React, { useState, useEffect } from "react";
import { useStore } from "zmp-framework/react";
import store from "../../store.js";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";

const Product = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [canNext, setCanNext] = useState(true);
  const loading = useStore("loading");
  const products = useStore("products");
  const selectedProduct = useStore("selectedProduct");

  useEffect(() => {
    store.dispatch("getProducts");
  }, []);

  const handleProductClick = async (productId) => {
    try {
      if (selectedProduct === productId) {
        await store.dispatch("setSelectedProduct", null);
      } else {
        await store.dispatch("setSelectedProduct", productId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (startIndex + 1 < products.length && canNext) {
      setStartIndex((prevIndex) => prevIndex + 1);
      setCanNext(false);
    }
  };

  const handleBack = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
      setCanNext(true);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center">
          <Skeleton
            height={130}
            width={105}
            className="flex items-center justify-center ml-[1.2rem] bg-gray-300 rounded"
          />
          <Skeleton
            height={130}
            width={105}
            className="flex items-center justify-center ml-[1.2rem] bg-gray-300 rounded"
          />
          <Skeleton
            height={130}
            width={105}
            className="flex items-center justify-center ml-[1.2rem] bg-gray-300 rounded"
          />
        </div>
      ) : (
        <div className="flex flex-row justify-between items-center space-x-4">
          <button
            onClick={handleBack}
            disabled={startIndex === 0}
            className={`py-4 px-1 flex items-center justify-center rounded-tr-md rounded-br-md ${startIndex === 0 ? "bg-gray-300" : "bg-green-700"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="#fff"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <div className="grid grid-cols-3 gap-4">
            {products
              .slice(startIndex, startIndex + 3)
              .map((product) => (
                <motion.div
                  key={product.id}
                  className={`h-36 px-1 flex flex-col items-center justify-center border rounded-xl ${selectedProduct === product.id
                    ? "bg-green-700"
                    : "border-green-300"
                    }`}
                  onClick={() => handleProductClick(product.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={product.image}
                    alt={product.detail}
                    className="w-full h-20 object-cover rounded-tr-md rounded-tl-md"
                    style={{ maxHeight: "6rem", maxWidth: "6rem" }}
                  />
                  <div className="overflow-hidden flex justify-center">
                    <p
                      className={`line-clamp-2 text-sm mx-2 mt-2 ${selectedProduct === product.id ? "text-white" : ""
                        }`}
                    >
                      {product.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
          <button
            onClick={handleNext}
            disabled={startIndex + 1 >= products.length || !canNext}
            className={`py-4 px-1 flex items-center justify-center rounded-tl-md rounded-bl-md ${startIndex + 1 >= products.length || !canNext
              ? "bg-gray-300"
              : "bg-green-700"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="15"
              height="15"
            >
              <path
                fill="#fff"
                d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
