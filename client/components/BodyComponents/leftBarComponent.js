Vue.component("leftbar-component", {
  template: `
    <!-- START LEFTBAR -->
    <div class="three wide column">
      <!-- START PROFILE -->
      <div class="ui card" v-if="islogin">
        <a class="image" href="#">
          <img src="http://images.goodsmile.info/cgm/images/product/20160927/5981/41606/large/e7136317c13b19304a9f6bb7ac16056b.jpg">
        </a>
        <div class="content">
          <a class="header">{{ name }}</a>
          <div class="meta">
            <a>{{ email }}</a>
          </div>
        </div>
      </div>
      <!-- END PROFILE -->

      <!-- START CATEGORY -->
      <div class="ui card">
        <div class="ui vertical fluid menu">
          <span class="item" style="text-align:center;">Categories Product</span>
        </div>
        <div class="ui compact menu">
          <a class="ui item" v-on:click="showAllProduct">
            All Product
          </a>
          <div class="ui simple dropdown item">
            Categories
            <i class="dropdown icon"></i>
            <div class="menu">
              <div class="item" v-for="(category, index) in categories" :key="index" v-on:click="getProductByCat(category._id)">{{ category.name }}</div>
             
            </div>
          </div>
        </div>
      </div>
      <!-- END CATEGORY -->
    </div>
    <!-- END LEFTBAR -->
  `,
  props: ["islogin"],
  data: function() {
    return {
      categories: [],
      showallproduct: 0,
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      myurl: "https://ecommerceserver.harlesbayuanggara.tech"
    };
  },
  created() {
    this.getAllCategories();
  },
  methods: {
    showAllProduct: function() {},

    getAllCategories: function() {
      axios({
        method: "GET",
        url: `${this.myurl}/categories/findAll`
      })
        .then(response => {
          this.categories = response.data.categories;
          this.$emit("temp-categories", this.categories);
        })
        .catch(err => {
          console.log(err.response);
        });
    },

    getProductByCat: function(id) {
      axios({
        method: "GET",
        url: `${this.myurl}/products/findByCategory/${id}`
      })
        .then(response => {
          // this.boxProduct = true;
          // this.myMarket = false;
          this.$emit("temp-products", response.data.products);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    showAllProduct: function() {
      this.showallproduct += 1;
      this.$emit("show-all-products", this.showallproduct);
    }
  }
});
