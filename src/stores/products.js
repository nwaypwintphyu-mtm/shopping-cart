import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    incart_products: [],
    total_price: 0,
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.products = await response.json();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    addItemsToCart(id) {
      const product = this.products.find((product) => product.id === id);
      if (product) {
        const existingProduct = this.incart_products.find(
          (item) => item.id === id
        );
        if (!existingProduct) {
          this.incart_products.push({ ...product, quantity: 1 });
        } else {
          existingProduct.quantity += 1;
        }
        this.calculateTotalPrice();
      }
    },
    calculateTotalPrice() {
      this.total_price = this.incart_products.reduce((total, item) => {
        return total + item.price * item.quantity; // Calculate total price
      }, 0);
    },
    removeItemFromCart(id) {
     if(id){
      const removeItem = this.incart_products.findIndex((item) => item.id === id);
      this.incart_products.splice(removeItem, 1);
     }else{
      this.incart_products.splice(0,this.incart_products.length)
     }
     this.calculateTotalPrice();
    },
  },
});
