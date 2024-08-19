import React, {
  useEffect,
  useLayoutEffect,
} from "react";
import { useStore } from "zmp-framework/react";
import store from "../../store.js";
import Skeleton from "react-loading-skeleton";
import Products from "./Products.jsx";
import Banner from "./Banner.jsx";

const Sale = () => {
  const loading = useStore("loading");
  const products = useStore("products");
  const selectedProduct = useStore("selectedProduct");
  const selectedProductData = useStore("selectedProductData");

  useEffect(() => {
    const someAsyncFunction = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await store.dispatch("setLoading", false);
      } catch (error) {
        console.error(error);
      }
    };

    someAsyncFunction();

    return () => clearTimeout(someAsyncFunction);
  }, []);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedProduct && products.length > 0) {
          const product = products.find((item) => item.id === selectedProduct);
          await store.dispatch("setSelectedProductData", product);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedProduct, products]);


  return (
    <div>

      {loading ? (
        <Skeleton
          height={200}
          className="flex items-center justify-center bg-gray-300 rounded m-auto"
        />
      ) : (
        selectedProductData && selectedProductData.id === selectedProduct ? (
          <div>
            <div className="mx-0 relative w-full">
              <div className="relative h-44 overflow-hidden md:h-96">
                <div className="duration-700 ease-in-out">
                  <img
                    src={selectedProductData.image}
                    className="absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-40 h-40"
                    alt="banner"
                  />
                </div>
              </div>
              <div className="my-4 text-center">
                <p className="text-sm text-gray-500">Bạn đang chọn sản phẩm</p>
                <h3 className="font-semibold">{selectedProductData.detail}</h3>
                <p className="text-gray-950">
                  Giá: {selectedProductData.price.toLocaleString()} VNĐ
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Banner />
            <div className="mb-8 z-10 mt-6">
              <div className="animated-box animate-bounce">
                <img
                  className="w-12 h-12 mr-4 rounded-md"
                  src="https://firebasestorage.googleapis.com/v0/b/pango1touch-a5f78.appspot.com/o/robot.png?alt=media&token=cede0fec-241b-42c1-8068-d24d9c7ecae4"
                  alt="robot"
                />
                <p>Bấm để xem khuyến mãi và chọn mua sản phẩm bạn nhé😍</p>
              </div>

            </div>
          </div>
        )
      )}
      <Products />
    </div>
  );
};

export default Sale;
