import axios from "axios";

const url = "http://localhost:9191/api/products/";

export default {
  state: {
    cart: [],
    products: [],
    product: null,
  },

  mutations: {
    GET_PRODUCTS(state, data) {
      state.products = data;
    },

    GET_PRODUCT_BY_ID(state, data) {
      state.product = data;
    },

    ADD_TO_CART(state, { product, quantity }) {
      let index = state.cart.findIndex((p) => p.product._id === product._id);

      if (index !== -1) {
        // console.log(state.shoppingCart[index].quantity)
        state.cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        state.cart.push({ product, quantity });
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    DELETE_FROM_CART(state, id) {
      state.cart = state.cart.filter((item) => {
        return item.product._id !== id;
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    DECREMENT_PRODUCT(state, product) {
      product.quantity -= 1
      localStorage.setItem('cart', JSON.stringify(state.shoppingCart))
      console.log(product.quantity)
    }
  },

  actions: {
    getProducts({ commit }) {
      axios.get(url).then((response) => {
        commit("GET_PRODUCTS", response.data);
      });
    },
    getProductById({ commit }, id) {
      axios.get(url + id).then((response) => {
        console.log(response);
        commit("GET_PRODUCT_BY_ID", response.data);
      });
    },
    addProductToCart({ commit }, { product, quantity }) {
      commit("ADD_TO_CART", { product, quantity });
    },
    decrementProduct({ commit }, item) {
      if (item.quantity <= 1) {
        commit("DELETE_FROM_CART", item.product._id);
        return;
      }
      commit("DECREMENT_PRODUCT", item);
    },
    deleteProductFromCart({ commit }, id) {
      commit("DELETE_FROM_CART", id);
    },
  },

  getters: {
    shoppingCart(state) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart !== null) {
        state.cart = cart;
      }
      return state.cart;
    },

    shoppingCartTotal(state) {
      let total = 0;
      if (state.cart.length !== 0) {
        state.cart.forEach((item) => {
          total += item.product.price * item.quantity;
        });
      }
      return total;
    },
    
    shoppingCartItemCount(state) {
      let items = 0;
      if (state.cart.length !== 0) {
        state.cart.forEach((item) => {
          items += item.quantity;
        });
      }
      return items;
    },
    products(state) {
      return state.products;
    },
    product(state) {
      return state.product;
    },
  },
};
