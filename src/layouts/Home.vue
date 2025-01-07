<template>
  <div class="container pt-3">
    <div class="row">
      <div
        class="col-3"
        v-for="product in productStore.products"
        :key="product.id"
      >
        <div class="card" style="width: 18rem">
          <img class="card-img-top" :src="product.image" alt="Product image" />
          <div class="card-body">
            <h4 class="card-title text-primary">{{ product.title }}</h4>
            <p class="card-text">${{ product.price }}</p>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div @click="addToCart(product.id)" class="btn btn-primary">
              Add to Cart
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useProductStore } from "@/stores/products";

export default {
  setup() {
    const productStore = useProductStore();
    productStore.fetchProducts();

    const addToCart = (id) => {
      productStore.addItemsToCart(id);
    };
    return {
      productStore,
      addToCart,
    };
  },
};
</script>
<style scoped>
.card {
  height: 730px;
  margin-bottom: 10%;
}
img {
  height: 400px;
}
</style>
