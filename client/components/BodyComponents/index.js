Vue.component("body-components", {
  template: `
  <div class="ui grid" id="boxContent">
    <leftbar-component @temp-categories="tempCategories" @temp-products="tempProducts" @show-all-products="showallproducts" :islogin="islogin"/>
    <main-content-component :showmytransaction="showmytransaction" :search-by-name="searchByName" :showAllProducts="showAllProducts" :getProductsFormCat="getProductsFormCat" :categories="categories" :islogin="islogin" @temp-carts="getTempCarts" :my-market="myMarket" :status-market="statusMarket" @status-market-from-create-market="statusMarketFromCreate" :get-reset-cart-from-logout="getResetCartFromLogout"/>
  </div>
  `,
  props: [
    "islogin",
    "myMarket",
    "statusMarket",
    "showallproductsfromnav",
    "searchByName",
    "showmytransaction",
    "getResetCartFromLogout"
  ],
  data: function() {
    return {
      getProductsFormCat: [],
      categories: [],
      showAllProducts: 0
    };
  },
  methods: {
    getTempCarts: function(val) {
      this.$emit("temp-carts", val);
    },
    tempCategories: function(val) {
      this.categories = val;
    },
    tempProducts: function(val) {
      this.getProductsFormCat = val;
    },
    showallproducts: function(val) {
      this.showAllProducts += val;
    },
    statusMarketFromCreate: function(val) {
      this.$emit("status-market-from-create-market", val);
    }
  },
  watch: {
    showallproductsfromnav: function(val) {
      this.showAllProducts += val;
    }
  }
});
