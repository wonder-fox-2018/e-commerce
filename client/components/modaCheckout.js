Vue.component('modal-checkout', {
  template:
  `
  <div>
    <div v-if="opencheckout == true">
      <div class="overlay" style="z-index: 1000;"></div>
      <div class="checkoutBox">
        <h5 style="margin: 30px 0 40px;">
          <strong style="display: flex; justify-content: center;">Transaction Confirmation</strong>
        </h5>
        <p class="err-notif">{{ this.checknotif }}</p>
        <div>
          <p v-if="!cartlist || cartlist.length === 0" style="margin: 10%; text-align: center;"> No item </p>
          <div class="cart-list" v-for="cart in checkList" v-else>
          <p style="display: inline-flex">
            <span style="color: darkorange; font-weight: bold;"> {{cart.name}}</span>
            <span class="count check-count" style="line-height: 1.3; margin-top: -10px;">
              <button class="btncheck" @click="minCount(cart)">-</button>
              <span style="color: darkorange; font-weight: bold;">x{{cart.itemlist.length}}</span>
              <button class="btncheck" @click="plusCount(cart)">+</button>
            </span>
            <strong class="del-item check-del" @click="deleteItCart(cart.name)">x</strong></p><hr>
          <p style="display: inline-flex; color: darkorange; font-weight: bold;">$ {{cart.price*cart.itemlist.length}}</p>
        </div>
        <div style="color: darkorange; font-weight: bold; margin: 20px 0 20px 80%;"> Total $ {{payment}}</div>
        </div>
        <button class="x-close" @click="closeCheckout">Cancel</button>
        <button class="reg-btn" style="float: right" @click="checkout">Confirm</button>
      </div>
    </div>
  </div>
  `,
  props: [ 'opencheckout', 'cartlist', 'itemarr', 'cartcount', ],
  data() {
    return {
      checkList: [],
      payment: 0,
      checknotif: '',
      baseUrl: "http://localhost:3000"
    }
  },
  methods: {
    closeCheckout() {
      this.$emit('opencheckout', false)
    },
    deleteItCart(val) {
      this.$emit('delone', val)
    },
    getCheckItems() {
      let cart = JSON.parse(localStorage.getItem('cartArray'))
      if (cart) {
        let itemArr = this.itemarr
        let temp = []
        let sumCash = 0
        
        for(let i = 0; i < itemArr.length; i++) {
          for(let j = 0; j < cart.length; j++) {
            if (itemArr[i].name === cart[j].name) {
              temp.push(itemArr[i])
              sumCash += itemArr[i].price
            }
          }
        }

        let checkoutArr = [];
        temp.forEach(function (convert) {
            return function (a) {
                if (!convert[a.name]) {
                    convert[a.name] = { _id: a._id, name: a.name, price: a.price, stock: a.stock, itemlist: []};
                    checkoutArr.push(convert[a.name]);
                }
                convert[a.name].itemlist.push({ name: a.name });
            };
        }(Object.create(null)));

        this.payment = sumCash
        this.checkList = checkoutArr
      }
    },
    checkout() {
      let itemlist = JSON.parse(localStorage.getItem("cartArray"));

      if (itemlist && itemlist.length > 0) {
        let itemId = []
        itemlist.forEach(elem => {
          itemId.push(elem._id)
        });

        axios({
          method: "POST",
          url: this.baseUrl + "/api/transactions",
          headers: {
            token : localStorage.getItem("token")
          },
          data: {
            itemlist: itemId
          }
        })
        .then(response => {
          console.log('ish it work?', response.data.trans)
          localStorage.removeItem('cartArray');
          this.closeCheckout()
          this.$emit('opencheckout', false)
          this.$emit('cartlist', true)
          this.payment = 0
          this.checkList = []
        })
        .catch(err => {
          console.log(err.response.data);
        });
      } else {
        this.checknotif = 'No item bought'
      }
    },
    minCount(val) {
      let tmpItem
      let cartArr

      if (localStorage.getItem("cartArray")) {
        cartArr = JSON.parse(localStorage.getItem("cartArray"));
      } 

      axios
        .get(this.baseUrl + `/api/items/single/${val._id}`)
        .then(response => {
          tmpItem = response.data.item
          let index = cartArr.findIndex(obj => obj._id === tmpItem._id)
          console.log('index target', index)
          cartArr.splice(index, 1)
          localStorage.setItem("cartArray", JSON.stringify(cartArr));
          this.$emit('mincount', true)
          this.getCheckItems()
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    plusCount(val) {
      let tmpItem
      axios
        .get(this.baseUrl + `/api/items/single/${val._id}`)
        .then(response => {
          tmpItem = response.data.item
          console.log(tmpItem)
          this.$emit('addcount', tmpItem)
          this.getCheckItems()
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
  },
  watch: {
    opencheckout() {
      this.checknotif = ''
      return this.getCheckItems()
    },
    cartlist() {
      this.checknotif = ''
      return this.getCheckItems()
    }
  }
})