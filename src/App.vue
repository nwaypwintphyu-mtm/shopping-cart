<template>
  <div>
    <!-- nav bar -->
    <nav class="navbar navbar-expand-lg">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <div class="navbar-nav container d-flex justify-content-between">
          <div class="d-flex">
            <router-link class="nav-link" to="/">Home</router-link>
            <router-link class="nav-link" to="/about">About</router-link>
          </div>
          <div class="nav-item dropdown">
            <button
              class="nav-link dropdown-toggle cart-btn"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ productStore.incart_products.length }} Cart
            </button>
            <div
              class="dropdown-menu p-2"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <table class="table table-borderless">
                <tbody>
                  <tr
                    v-for="incart_product in productStore.incart_products"
                    :key="incart_product.id"
                  >
                    <td>
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <div class="col-9">
                          <b>{{ incart_product.title }}</b>
                        </div>
                        <div class="col-3">
                          <button
                            class="btn btn-danger btn-sm"
                            @click.stop="removeItem(incart_product.id)"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <p class="mb-0">
                        {{ incart_product.quantity }} x ${{
                          incart_product.price
                        }}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <div class="w-50">
                          Total: {{ productStore.total_price.toFixed(2) }}
                        </div>
                        <button
                          class="btn btn-sm btn-danger"
                          @click.stop="clearChart"
                        >
                          Clear Cart
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/products";
import { ref } from "vue";

export default {
  setup() {
    const productStore = useProductStore();
    const incart_products = ref([]);
    incart_products.value = productStore.incart_products;

    const removeItem = (id) => {
      productStore.removeItemFromCart(id);
    };

    const clearChart = () => {
      productStore.removeItemFromCart();
    };

    return {
      productStore,
      incart_products,
      removeItem,
      clearChart,
    };
  },
};
</script>

<style scoped>
body {
  margin: 0;
}
.navbar {
  background-color: #343a40;
}
.nav-link {
  color: white;
}
.nav-row {
  display: flex;
  justify-content: end;
  border: 1px solid white;
}
.nav-link {
  cursor: pointer;
}
.nav-link:hover {
  color: rgba(255, 255, 255, 0.725);
}
.dropdown-menu {
  min-width: 300px;
  right: 0px;
  left: auto;
}

.table td {
  padding: 10px;
}
.table tr {
  border-bottom: 1px solid rgba(128, 128, 128, 0.496);
}
.btn-danger:hover {
  background-color: #c82333;
}
.cart-btn {
  background-color: rgba(128, 128, 128, 0.496);
  padding: 10px 15px;
  border-radius: 5px;
}
</style>
