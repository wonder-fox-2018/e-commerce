Vue.component("main-content-component", {
  template: `
  <!-- START MAIN CONTENT -->
    <div class="twelve wide column" style="padding: 0 70px;">

      <my-transaction v-if="boxMyTransaction"></my-transaction>
      <all-product :search-by-name="searchByName" :showAllProducts="showAllProducts" :getProductsFormCat="getProductsFormCat" :islogin="islogin" @temp-carts="getTempCarts" :get-reset-cart-from-logout="getResetCartFromLogout" v-if="boxProduct"/>
      <my-product :status-market="statusMarket" :categories="categories" v-if="getActionMyMarket" @status-market-from-create-market="statusMarketFromCreate"></my-product>

    </div>
    <!-- END MAIN CONTENT -->
  `,
  components: {
    "all-product": allProduct,
    "my-product": myProduct,
    "my-transaction": myTransaction
  },
  props: [
    "islogin",
    "statusMarket",
    "myMarket",
    "categories",
    "getProductsFormCat",
    "showAllProducts",
    "searchByName",
    "showmytransaction",
    "getResetCartFromLogout"
  ],
  data: function() {
    return {
      boxProduct: true,
      boxMyTransaction: false,
      getActionMyMarket: false
    };
  },
  methods: {
    getTempCarts: function(val) {
      this.$emit("temp-carts", val);
    },
    searchStatus: function(val) {
      this.boxProduct = true;
      this.getActionMyMarket = false;
    },
    statusMarketFromCreate: function(val) {
      this.$emit("status-market-from-create-market", val);
    }
  },
  watch: {
    myMarket: function(val) {
      this.boxProduct = false;
      this.getActionMyMarket = true;
      this.boxMyTransaction = false;
    },
    showAllProducts: function(val) {
      this.boxProduct = true;
      this.getActionMyMarket = false;
      this.boxMyTransaction = false;
    },
    searchByName: function(val) {
      this.boxProduct = true;
      this.getActionMyMarket = false;
      this.boxMyTransaction = false;
    },
    showmytransaction: function(val) {
      this.boxMyTransaction = true;
      this.boxProduct = false;
      this.getActionMyMarket = false;
    },
    getResetCartFromLogout: function(val) {
      this.boxMyTransaction = false;
      this.boxProduct = true;
      this.getActionMyMarket = false;
    }
  }
});

// main - content - component
