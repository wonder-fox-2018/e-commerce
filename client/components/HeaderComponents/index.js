Vue.component("header-components", {
  template: `
    <div>
      <div class="ui inverted menu">

        <a class="item" @click="showAllProducts">
          WARUNGPEDIA
        </a>

        <div class="item">

          <div class="ui category search">
            <div class="ui icon input">
              <input class="prompt" placeholder="Search animals..." type="text" v-model="searchbyname">
                <i class="search icon"></i>
              </div>
              <div class="results"></div>
            </div>
          </div>

          <div class="right item">
            <div class="ui action input" id="boxMyActions">
              <div class="item" v-if="isLogin">
                <i class="material-icons" id="icon-navbar" title="My Market" v-on:click="actionMyMarket">shop</i>
              <i class="material-icons" id="icon-navbar" title="Order Product">collections_bookmark</i>
            </div>
            <div class="item" v-if="isLogin">
              <i class="material-icons" title="Shopping Cart" onclick="shoppingCart()">shopping_cart</i><span id="icon-navbar">({{ totalProduct }})</span>
              <i class="material-icons" id="icon-navbar" title="My Transaction" @click="actionMyTransaction">all_inbox</i>
              <i class="material-icons" id="icon-navbar" title="Setting">settings</i>
              <button class="ui button" style="border-radius: 3px; margin-right: 2px;" v-on:click="actionLogout">
                <i class="sign-out icon"></i>
                Logout
              </button>
            </div>
            <button v-else class="ui button" onclick="login()" style="border-radius: 3px;">
              <i class="sign-in icon"></i>
                Login
            </button>
          </div>

        </div>
        
      </div>

      <login-component @status-login="statusLogin" @status-market="statusmarket" :get-status-market-from-create="getStatusMarketFromCreate"></login-component>
      <register-component></register-component>
      <shoppingcart-component :carts="carts" @temp-total-product="totalproduct" :reset-cart-from-logout="resetCartFromLogout" @reset-cart="resetCart"></shoppingcart-component>

    </div>
  `,
  components: {
    "login-component": loginuser,
    "register-component": registeruser,
    "shoppingcart-component": shoppingcart
  },
  props: ["carts", "getStatusMarketFromCreate"],
  data: function() {
    return {
      searchbyname: "",
      totalProduct: 0,
      showallproducts: 0,
      myMarket: 0,
      isLogin: false,
      statusMarket: false,
      counterMyTransaction: 0,
      resetCartFromLogout: 0,
      triggerReserCart: 0
    };
  },
  created() {
    this.statusLogin();
  },
  methods: {
    statusLogin: function(val) {
      this.isLogin = val;
      this.$emit("status-login", this.isLogin);
    },
    statusmarket: function(val) {
      this.statusMarket = val;
      this.$emit("status-market", this.statusMarket);
    },
    totalproduct: function(val) {
      this.totalProduct = val;
    },
    actionMyMarket: function() {
      this.myMarket += 1;
      this.$emit("box-my-market", this.myMarket);
    },
    actionMyTransaction: function() {
      this.counterMyTransaction += 1;
      this.$emit("show-my-transaction", this.counterMyTransaction);
    },
    showAllProducts: function() {
      this.showallproducts += 1;
      this.$emit("show-all-products-from-nav", this.showallproducts);
    },
    actionLogout: function() {
      this.resetCartFromLogout++;
      this.triggerReserCart++;
      this.$emit("reset-cart-from-logout", this.triggerReserCart);
      this.statusLogin(false);
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("statusMarket");
    },
    resetCart: function(val) {
      this.resetCartFromLogout++;
      this.triggerReserCart++;
      this.$emit("reset-cart-from-logout", this.triggerReserCart);
    }
  },
  watch: {
    searchbyname: function(val) {
      this.$emit("search-by-name", val);
    }
  }
});
