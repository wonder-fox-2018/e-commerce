const shoppingcart = {
  template: `
  <!-- Modal Shopping Cart -->
  <div class="ui large modal modalShopingCart">
    <div class="header">
      ShoopingCart
    </div>
    <div class="content">
      <div class="ui fluid card">
        <div class="content">
          <table class="ui grey table">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Total Item</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in carts" :key="index">
                <td>1</td>
                <td>{{ cart[0].name }}</td>
                <td>Rp. {{ cart[0].price }}</td>
                <td>{{ cart.length }}</td>
                <td>Rp. {{ cart.length * cart[0].price }}</td>
              </tr>
              <tr v-if="totalProduct > 0">
                <td>Sub Total</td>
                <td></td>
                <td></td>
                <td>{{ totalProduct }}</td>
                <td>Rp {{ subTotalPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
    <div class="actions">
      <div class="ui deny button">Cancel</div>
      <div class="ui button" @click="createTransaction(carts)">Checkout</div>
    </div>
  </div>
  `,
  props: ["carts", "resetCartFromLogout"],
  data: function() {
    return {
      totalProduct: 0,
      totalPrice: 0,
      resetCart: 0,
      myurl: "http://localhost:3000"
    };
  },
  methods: {
    createTransaction: function(productId) {
      axios({
        method: "POST",
        url: `${this.myurl}/transaction/create`,
        data: {
          products: productId
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          this.resetCart++;
          this.$emit("reset-cart", this.resetCart);
          $(".large.modal.modalShopingCart")
            .modal({ transition: "horizontal flip" })
            .modal("hide");
        })
        .catch(err => {
          console.log(err.response.data.err);
        });
    }
  },
  computed: {
    subTotalPrice: function() {
      let index = 0;
      if (this.carts.length >= 1) {
        index = this.carts.length - 1;
        this.totalPrice += Number(this.carts[index][0].price);
      } else {
        value = 0;
      }
      return this.totalPrice;
    }
  },
  watch: {
    carts: function() {
      this.totalProduct += 1;
      this.$emit("temp-total-product", this.totalProduct);
    },
    resetCartFromLogout: function(val) {
      this.totalPrice = 0;
      this.totalProduct = -1;
    }
  }
};
