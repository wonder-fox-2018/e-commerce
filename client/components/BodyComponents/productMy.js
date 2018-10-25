const myProduct = {
  template: `
  <!-- START MY MARKET -->
      <div>
        <div style="margin-bottom: 20px;">
          <button class="ui inverted primary button" v-on:click="actionShowMyProduct" v-if="statusMarket">Show My Product</button>
          <button class="ui inverted primary button" v-on:click="actionCreateProduct" v-if="statusMarket">Create Product</button>
          <button class="ui inverted primary button" v-on:click="actionMyMarket" v-if="statusMarket">My Market</button>
          <button class="ui inverted primary button" v-on:click="actionCreateMarket" v-if="!statusMarket">Create Market</button>
        </div>

        <!-- START MY PRODUCT -->
        <div id="myProduct" v-if="boxMyProduct">
            <table class="ui striped table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in myProducts" :key="index">
                  <td>{{ product.name }}</td>
                  <td>{{ product.category.name }}</td>
                  <td>Rp.{{ product.price }}</td>
                  <td>{{ product.stock }}</td>
                  <td>
                    <i class="material-icons" style="cursor: pointer" onclick="updateProduct()" @click="updateMyProduct(product.name, product.price, product.stock, product.description, product._id)">update</i>
                    <i class="material-icons" style="cursor: pointer" @click="btnDeleteMyProduct(product._id)">delete</i>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        <!-- END MY PRODUCT -->
    
        <!-- START CREATE PRODUCT -->
        <div id="createProduct" v-if="boxCreateProduct">

          <div class="ui negative message" v-if="errorCreateProduct" style="width: 600px;">
            <i class="close icon" v-on:click="closeErrorMessage"></i>
            <div class="header" style="text-transform: uppercase;">
              {{ errorMsgCreateProduct }}
            </div>
          </div>
  
          <div class="ui positive message" v-if="successCreateProduct" style="width: 600px;">
            <i class="close icon" v-on:click="closeSuccessMessage"></i>
            <div class="header" style="text-transform: uppercase;">
              {{ successMsgCreateProduct }}
            </div>
          </div>

          <div class="ui card" style="width: 600px;">
            <div class="content">
              <div class="ui form six wide column centered">
                <div class="field">
                  <label>Product Name</label>
                  <input placeholder="Name" type="text" v-model="productName">
                </div>
                <div class="field">
                  <label>Product Name</label>
                  <input type="file" class="form-control" v-on:change="getImage">
                </div>
                <div class="field">
                  <label>Product Category</label>
                  <select class="ui search dropdown" v-model="productCategory">
                    <option v-for="(category, index) in categories" :key="index" :value="category._id">{{ category.name }}</option>
                  </select>
                </div>
                <div class="field">
                  <label>Product Description</label>
                  <textarea placeholder="Description" type="text" v-model="productDescription"></textarea>
                </div>
                <div class="field">
                  <label>Stock</label>
                  <input placeholder="Stock" type="number" v-model="productStock">
                </div>
                <div class="field">
                  <label>Price</label>
                  <input placeholder="Price" type="number" v-model="productPrice">
                </div>
  
                <div class="extra">
                  <div class="ui right floated button" v-on:click="btnCreateProduct">
                    Create Product
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- END CREATE PRODUCT -->

        <!-- START MY MARKET -->

        <div class="ui cards" v-if="boxMyMarket">
          <div class="card" style="width:800px;">
            <div class="content">
              <div class="header">
                {{ myMarket.name }}
              </div>
              <div v-if="myMarket.user">
                Owner : {{ myMarket.user.name }}
              </div>
              <div class="description">
                
              </div>
            </div>
            <div class="extra content">
              <span style="margin-bottom: 20px; display: block;">List of transactions : </span>

              <div class="ui cards">
                <div class="card" style="width: 100%;" v-for="(transaction, index) in myMarket.transactions" :key="index">
                  <div class="content">
                    <div class="header">
                      Customer : {{ transaction.user.name }}
                    </div>
                    <div class="meta">
                      Date of transaction : ( {{ new Date(transaction.createdAt).getHours() }}:{{ new Date(transaction.createdAt).getMinutes() }}, {{ new Date(transaction.createdAt).getMonth() }}/{{ new Date(transaction.createdAt).getDate()+1 }}/{{ new Date(transaction.createdAt).getFullYear() }}  ) 
                    </div>
                    <div class="description">
                    
                    <table class="ui striped table">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Amount</th>
                          <th>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(product, index) in transaction.products" :key="index">
                          <td>{{ product.name }}</td>
                          <td>{{ product.totalItem }}</td>
                          <td>Rp. {{ product.totalPrice }}</td>
                        </tr>
                      </tbody>
                      <thead>
                        <tr>
                          <th>Sub Total</th>
                          <th></th>
                          <th>Rp. {{ transaction.subTotalPrice }}</th>
                        </tr>
                      </thead>
                    </table>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- END MY MARKET -->

        <!-- START CREATE MARKET -->
        <div id="createMarket" v-if="boxCreateMarket">

          <div class="ui positive message" v-if="successCreateMarket" style="width: 600px;">
            <i class="close icon" v-on:click="closeSuccessMessage"></i>
            <div class="header" style="text-transform: uppercase;">
              {{ successMsgCreateMarket }}
            </div>
          </div>

          <div class="ui negative message" v-if="errorCreateMarket" style="width: 600px;">
            <i class="close icon" v-on:click="closeErrorMessage"></i>
            <div class="header">
              {{ errorMsgMarket }}
            </div>
          </div>

          <div class="ui card" style="width: 600px;">
            <div class="content">
              <div class="ui form six wide column centered">
                <div class="field">
                  <label>Market Name</label>
                  <input placeholder="Name" type="text" v-model="marketName">
                </div>
                <div class="extra">
                  <div class="ui right floated button" v-on:click="btnCreateMarket">
                    Create Market
                  </div>
                </div>
              </div>
            </div>
          </div>    
        </div>
        <!-- END CREATE MARKET -->

        <!-- START MODAL UPDATE PRODUCT -->

        <div class="ui tiny modal modalUpdateProduct">
          <div class="header">
            Update Product
          </div>
          <div class="content">
            <div class="ui fluid card">
              <div class="content">
                <div class="ui form six wide column centered">
                  <div class="field">
                    <label>Product Name</label>
                    <input placeholder="Name" type="text" v-model="productNameUpdate">
                  </div>
                  <div class="field">
                    <label>Product Category</label>
                    <select class="ui search dropdown" v-model="productCategoryUpdate">
                      <option v-for="(category, index) in categories" :key="index" :value="category._id">{{ category.name }}</option>
                    </select>
                  </div>
                  <div class="field">
                    <label>Product Description</label>
                    <textarea placeholder="Description" type="text" v-model="productDescriptionUpdate"></textarea>
                  </div>
                  <div class="field">
                    <label>Stock</label>
                    <input placeholder="Stock" type="number" v-model="productStockUpdate">
                  </div>
                  <div class="field">
                    <label>Price</label>
                    <input placeholder="Price" type="number" v-model="productPriceUpdate">
                  </div>

                </div>
              </div>

            </div>
          </div>
          <div class="actions">
            <div class="ui button" >Cancel</div>
            <div class="ui button" @click="btnUpdateProduct">Update</div>
          </div>
        </div>
        <!-- END MODAL UPDATE PRODUCT -->

      </div>
      <!-- END MY MARKET -->
  `,
  props: ["statusMarket", "categories"],
  data: function() {
    return {
      myProducts: [],
      myMarket: "",

      marketName: "",

      productName: "",
      productCategory: "",
      productDescription: "",
      productStock: "",
      productPrice: "",
      image: "",

      productNameUpdate: "",
      productStockUpdate: "",
      productPriceUpdate: "",
      productCategoryUpdate: "",
      productDescriptionUpdate: "",
      productIdUpdate: "",

      boxMyProduct: false,
      boxCreateProduct: false,
      boxCreateMarket: false,
      boxMyMarket: false,
      errorCreateMarket: false,
      errorMsgMarket: "",
      successCreateMarket: false,
      successMsgCreateMarket: "",
      successCreateProduct: false,
      successMsgCreateProduct: "",
      errorCreateProduct: false,
      errorMsgCreateProduct: "",

      myurl: "http://localhost:3000"
    };
  },
  created() {},
  methods: {
    actionShowMyProduct: function() {
      this.boxMyMarket = false;
      this.boxMyProduct = true;
      this.boxCreateProduct = false;
      this.boxCreateMarket = false;

      $(".tiny.modal.modalUpdateProduct")
        .modal({
          transition: "horizontal flip"
        })
        .modal("hide");

      axios({
        method: "GET",
        url: `${this.myurl}/market/findProductOnMarket`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.myProducts = response.data.market.products;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    actionCreateProduct: function() {
      this.boxMyProduct = false;
      this.boxCreateProduct = true;
      this.boxCreateMarket = false;
    },
    updateMyProduct: function(name, price, stock, description, idProduct) {
      this.productNameUpdate = "";
      this.productStockUpdate = "";
      this.productPriceUpdate = "";
      this.productDescriptionUpdate = "";
      this.productIdUpdate = "";

      this.productNameUpdate = name;
      this.productStockUpdate = stock;
      this.productPriceUpdate = price;
      this.productDescriptionUpdate = description;
      this.productIdUpdate = idProduct;
    },
    btnUpdateProduct: function() {
      let data = {
        name: this.productNameUpdate,
        description: this.productDescriptionUpdate,
        category: this.productCategoryUpdate,
        stock: this.productStockUpdate,
        price: this.productPriceUpdate
      };

      axios({
        method: "PUT",
        url: `${this.myurl}/products/update/${this.productIdUpdate}`,
        data,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.actionShowMyProduct();
          $(".tiny.modal.modalUpdateProduct")
            .modal({
              transition: "horizontal flip"
            })
            .modal("hide");
        })
        .catch(err => {});
    },
    btnDeleteMyProduct: function(productId) {
      axios({
        method: "DELETE",
        url: `${this.myurl}/products/remove/${productId}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.actionShowMyProduct();
          // console.log(response.data.message);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    btnCreateProduct: function() {
      let formData = new FormData();
      formData.append("image", this.image);
      axios
        .post(`${this.myurl}/products/upload/image`, formData)
        .then(response => {
          let data = {
            name: this.productName,
            category: this.productCategory,
            picture: response.data.link,
            description: this.productDescription,
            stock: this.productStock,
            price: this.productPrice
          };
          axios({
            method: "POST",
            url: `${this.myurl}/products/create`,
            data,
            headers: {
              token: localStorage.getItem("token")
            }
          })
            .then(response => {
              this.productName = "";
              this.productCategory = "";
              this.productDescription = "";
              this.productStock = "";
              this.productPrice = "";
              this.successMsgCreateProduct = "";
              this.successCreateProduct = true;
              this.errorCreateProduct = false;
              this.successMsgCreateProduct = response.data.message;
            })
            .catch(err => {
              this.errorMsgCreateProduct = "";
              this.errorCreateProduct = true;
              this.errorMsgCreateProduct = Object.values(
                err.response.data.err.errors
              )[0].message;
            });
        });
    },
    actionCreateMarket: function() {
      this.boxMyMarket = false;
      this.boxMyProduct = false;
      this.boxCreateProduct = false;
      this.boxCreateMarket = true;
    },
    btnCreateMarket: function() {
      axios({
        method: "POST",
        url: `${this.myurl}/market/create`,
        data: {
          name: this.marketName
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          this.successMsgCreateMarket = "";
          this.successCreateMarket = true;
          this.successMsgCreateMarket = response.data.message;
          this.cekStatusMarket = true;
          localStorage.setItem("statusMarket", true);
          this.$emit("status-market-from-create-market", true);
          this.boxCreateMarket = false;
        })
        .catch(err => {
          this.errorMsgMarket = "";
          this.errorCreateMarket = true;
          this.errorMsgMarket = err.response.data.err.errors.name.message;
        });
    },
    actionMyMarket: function() {
      this.boxMyMarket = true;
      this.boxMyProduct = false;
      this.boxCreateProduct = false;
      this.boxCreateMarket = false;
      axios({
        method: "GET",
        url: `${this.myurl}/market/findMarketUser`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(market => {
          this.myMarket = market.data.market;
        })
        .catch(err => {});
    },
    closeErrorMessage: function() {
      this.errorCreateMarket = false;
      this.errorCreateProduct = false;
      this.errorMsgMarket = "";
      this.errorMsgCreateProduct = "";
    },
    closeSuccessMessage: function() {
      this.successCreateProduct = false;
      this.successMsgCreateProduct = "";
      this.successCreateMarket = false;
      this.successMsgCreateMarket = "";
    },
    getImage: function(image) {
      this.image = image.target.files[0];
    }
  }
};
