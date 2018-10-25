const allProduct = {
  template: `
    <!-- START ALL PRODUCT -->
      <div id="boxProduct">

        <div class="wrapper" v-for="(product, index) in products" :key="index">
          <div class="container">
            <div class="top">
              <img :src="product.picture" alt="">
            </div>
            <div class="bottom">
              <div class="left">
                <div class="details">
                  <h1>{{ product.name }}</h1>
                  <p>Rp. {{ product.price }}</p>
                </div>
                <div class="buy" v-on:click="addToCart(product)" v-if="islogin"><i class="material-icons">add_shopping_cart</i></div>
                <div class="buy" onclick="login()" v-else><i class="material-icons">add_shopping_cart</i></div>
              </div>
              <!-- <div class="right">
                <div class="done"><i class="material-icons">done</i></div>
                <div class="details">
                  <h1>Chair</h1>
                  <p>Added to your cart</p>
                </div>
                <div class="remove"><i class="material-icons">clear</i></div>
              </div> -->
            </div>
          </div>

          <div class="inside">
            <div class="icon"><i class="material-icons">info_outline</i></div>
            <div class="contents">
              <p>Stock : <span>{{ product.stock }}</span></p>
              <p>Category: <span>{{ product.category.name }}</span></p>
              <p>Description : <span>{{ product.description }}</span></p>
              <p>Market : <span>{{ product.market.name }}</span></p>
            </div>
          </div>
        </div>
 
      </div>
      <!-- END ALL PRODUCT -->
  `,
  props: [
    "islogin",
    "getProductsFormCat",
    "showAllProducts",
    "searchByName",
    "getResetCartFromLogout"
  ],
  data: function() {
    return {
      products: [],
      carts: [],
      myurl: "http://localhost:3000"
    };
    // totalProduct: 0,
  },
  created() {
    this.getAllProduct();
  },
  methods: {
    getAllProduct: function() {
      axios({
        method: "GET",
        url: `${this.myurl}/products/findAll`
      })
        .then(response => {
          this.products = response.data.products;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    addToCart: function(product) {
      // this.totalProduct += 1;
      let trigger = true;
      for (let i = 0; i < this.carts.length; i++) {
        if (this.carts[i][0] == product) {
          this.carts[i].push(product);
          trigger = false;
        }
      }
      if (trigger) {
        this.carts.push([product]);
      }
      this.$emit("temp-carts", this.carts);
    }
  },
  watch: {
    getProductsFormCat: function(val) {
      this.products = val;
    },
    showAllProducts: function(val) {
      this.getAllProduct();
    },
    searchByName: function(val) {
      val = val.trim();
      axios({
        method: "GET",
        url: `${this.myurl}/products/findByName?product=${val}`
      })
        .then(response => {
          this.products = response.data.products;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    getResetCartFromLogout: function(val) {
      this.carts = [];
      this.$emit("temp-carts", this.carts);
    }
  }
};
