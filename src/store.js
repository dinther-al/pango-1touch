import { createStore } from "zmp-framework/core";
import axios from "axios";

const store = createStore({
  state: {
    user: {
      name: "",
      image:
        "https://firebasestorage.googleapis.com/v0/b/pango1touch-a5f78.appspot.com/o/tho.jpg?alt=media&token=63af4293-2387-4d69-9a06-2419a70130f8",
    },
    loading: true,
    discountAmount: 0,
    selectedProduct: null,
    selectedProductData: null,
    products: [],
    isOpenModal: false,
    checkOrder: false,
    info: {
      name: "",
      phone: "",
    },
    infoAddress: {
      city: "",
      district: "",
      ward: "",
      street: ""
    },
    newInfoAddress: {
      city: "",
      district: "",
      ward: "",
      street: ""
    },
    isOpen: true,
    isOrder: false,
    modalContent: "delivery",
    selectedAddress: "existingAddress",
    isCallBack: false,
  },
  getters: {
    user: ({ state }) => state.user,
    loading: ({ state }) => state.loading,
    discountAmount: ({ state }) => state.discountAmount,
    selectedProduct: ({ state }) => state.selectedProduct,
    selectedProductData: ({ state }) => state.selectedProductData,
    products: ({ state }) => state.products,
    isOpenModal: ({ state }) => state.isOpenModal,
    checkOrder: ({ state }) => state.checkOrder,
    info: ({ state }) => state.info,
    infoAddress: ({ state }) => state.infoAddress,
    newInfoAddress: ({ state }) => state.newInfoAddress,
    isOpen: ({ state }) => state.isOpen,
    isOrder: ({ state }) => state.isOrder,
    modalContent: ({ state }) => state.modalContent,
    selectedAddress: ({ state }) => state.selectedAddress,
    isCallBack: ({ state }) => state.isCallBack,
  },
  actions: {
    // ====================== setup app ======================
    // ====================== setter ======================
    async setLoading({ state }, data) {
      state.loading = data;
    },
    async setDiscountAmount({ state }, data) {
      state.discountAmount = data;
    },
    async setSelectedProduct({ state }, data) {
      state.selectedProduct = data;
    },
    async setSelectedProductData({ state }, data) {
      state.selectedProductData = data;
    },
    async setProducts({ state }, data) {
      state.products = data;
    },
    async setIsOpenModal({ state }, data) {
      state.isOpenModal = data;
    },
    async setCheckOrder({ state }, data) {
      state.checkOrder = data;
    },
    async setInfo({ state }, data) {
      state.info = data;
    },
    async setInfoAddress({ state }, data) {
      state.infoAddress = data;
    },
    async setNewInfoAddress({ state }, data) {
      state.newInfoAddress = data;
    },
    async setIsOpen({ state }, data) {
      state.isOpen = data;
    },
    async setIsOrder({ state }, data) {
      state.isOrder = data;
    },
    async setModalContent({ state }, data) {
      state.modalContent = data;
    },
    async setSelectedAddress({ state }, data) {
      state.selectedAddress = data;
    },
    async setIsCallBack({ state }, data) {
      state.isCallBack = data;
    },
    async getProducts() {
      await store.dispatch("setLoading", true);
      axios
        .get("https://api.jsonbin.io/v3/b/65d49917dc74654018a74f2f")
        .then(async (response) => {
          await store.dispatch("setProducts", response.data.record);
          setTimeout(async () => {
            await store.dispatch("setLoading", false);
          }, 1000)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
});
export default store;
