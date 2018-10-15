var app = new Vue({
  el: "#app",
  data: {
    isLogin: false,
    statusMarket: false,
    carts: [],
    myMarket: 0,
    showallproductsfromnav: 0,
    searchByName: "",
    showmytransaction: 0,
    getStatusMarketFromCreate: false,
    getResetCartFromLogout: 0
  },
  created: function() {},
  methods: {
    statusLogin: function(val) {
      this.isLogin = val;
    },
    getTempCarts: function(val) {
      this.carts = val;
    },
    statusmarket: function(val) {
      this.statusMarket = val;
    },
    boxMyMarket: function(val) {
      this.myMarket = val;
    },
    showAllProductsFromNav: function(val) {
      this.showallproductsfromnav = val;
    },
    searchbyname: function(val) {
      this.searchByName = val;
    },
    showMyTransaction: function(val) {
      this.showmytransaction = val;
    },
    statusMarketFromCreate: function(val) {
      this.getStatusMarketFromCreate = val;
    },
    resetCartFromLogout: function(val) {
      this.getResetCartFromLogout = val;
    }
  }
});
