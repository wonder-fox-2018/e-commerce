var app = new Vue({
  el: "#app",
  data: {
    //header
    isOpenReg: false,
    isOpenLog: false,
    isOpenCart: false,
    isOpenCheckout: false,
    isLogin: false,
    admStat: false,
    permitStat: false,
    addItForm: false,
    addname: '',
    adddesc: '',
    addlink: '',
    addprice: '',
    addstock: '',
    addcategory: '',
    edItForm: false,
    upitem: '',
    upname: '',
    updesc: '',
    uplink: '',
    upprice: '',
    upstock: '',
    upcategory: '',
    catlist: [],
    showMenu: false,
    showMenuItem: false,
    delItForm: false,
    addCatForm: false,
    addcatname: '',
    addcatclass: '',
    edCatForm: false,
    upcatname: '',
    upcatclass: '',
    //items
    cartCount: '',
    items: [],
    carts: [],
    baseUrl: "http://localhost:3000"
  },
  methods: {
    clickCheckout() {
      this.isOpenCheckout = true;
      this.closeCart()
    },
    openRegBtn(value) {
      this.isOpenReg = value;
    },
    openLogBtn(value) {
      this.isOpenLog = value;
    },
    openCartBtn(value) {
      this.isOpenCart = value;
    },
    closeCart() {
      this.isOpenCart = false
    },
    closeCheckout(value) {
      this.isOpenCheckout = value
    },
    emptyCart() {
      this.carts = []
      this.cartCount = ''
    },
    //transactions
    getCountTrans() {
      let cart = JSON.parse(localStorage.getItem('cartArray'))
      this.cartCount = cart.length
    },
    reduceCount() {
      this.getTransaction()
      this.getCountTrans()
    },
    getTransaction() {
      let cartArr = JSON.parse(localStorage.getItem("cartArray"));
      let counts = {};

      if (cartArr) {
        cartArr.forEach((item, index) => {
          let each = item.name
          if (counts[each] === undefined) {
            counts[each] = 1
          } else {
            counts[each]++
          }
        })
      }
      let keys = Object.keys(counts)
      let values = Object.values(counts)

      let lists = []
      for (let i = 0; i < keys.length; i++) {
        let obj = {}
        obj.name = keys[i]
        obj.count = values[i]
        lists.push(obj)
        obj = {}
      }
      this.carts = lists
    },
    addTransaction(item) {
      let cartArr
      if (localStorage.getItem("cartArray")) {
        cartArr = JSON.parse(localStorage.getItem("cartArray"));
      } else {
        cartArr = []
      }
      console.log(item)
      cartArr.push(item);
      localStorage.setItem("cartArray", JSON.stringify(cartArr));
      this.getTransaction()
      this.getCountTrans()
    },
    deleteItCart(value) {
      let cartArr = JSON.parse(localStorage.getItem("cartArray"));
      let newCartArr = []

      cartArr.forEach(elem => {
        if (elem.name !== value) {
          newCartArr.push(elem)
        }
      })
      localStorage.setItem("cartArray", JSON.stringify(newCartArr));
      this.getTransaction()
      this.getCountTrans()
      this.getCheckItems()
    },
    // left-menu filter API
    getHome() {
      this.permitStat = false
      axios
        .get(this.baseUrl + "/api/items")
        .then(response => {
          this.items = response.data.items;
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    searchItem(input) {
      this.permitStat = false
      let tmpArr = []
      axios
        .get(this.baseUrl + "/api/items")
        .then(response => {
          if (input) {
          response.data.items.forEach(elem => {
            if (elem.name.toLowerCase().match(input.toLowerCase())) {
              tmpArr.push(elem)
            }
          })
          this.items = tmpArr
          } else {
            this.getHome()
          }
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    getItemCat(val) {
      this.permitStat = false
      axios
        .get(this.baseUrl + `/api/items/${val}`)
        .then(response => {
          console.log(response.data.categories)
          this.items = response.data.categories
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    //adminstrator
    openPermit() {
      console.log('you are admin')
      this.permitStat = true
      this.getCatList()
    },
    addItPermit() {
      this.addItForm = true
      this.closeEdIt()
      this.closeDelIt()
      this.closeAddCat()
      this.closeEdCat()
    },
    closeAddIt() {
      this.addItForm = false
    },
    edItPermit() {
      this.edItForm = true
      this.closeAddIt()
      this.closeDelIt()
      this.closeAddCat()
      this.closeEdCat()
    },
    closeEdIt() {
      this.edItForm = false
    },
    delItPermit() {
      this.delItForm = true
      this.closeAddIt()
      this.closeEdIt()
      this.closeAddCat()
      this.closeEdCat()
    },
    closeDelIt() {
      this.delItForm = false
    },
    addCatPermit() {
      this.addCatForm = true
      this.closeEdCat()
      this.closeAddIt()
      this.closeEdIt()
      this.closeDelIt()
    },
    closeAddCat() {
      this.addCatForm = false
    },
    edCatPermit() {
      this.edCatForm = true
      this.closeAddCat()
      this.closeAddIt()
      this.closeEdIt()
      this.closeDelIt()
    },
    closeEdCat() {
      this.edCatForm = false
    },
    getCatList() {
      axios
      .get(this.baseUrl + "/api/categories")
      .then(response => {
        this.catlist = response.data.categories;
        console.log(this.catlist)
      })
      .catch(err => {
        console.log("error di sini", err.response);
      });
    },
    toggleShow() {
			this.showMenu = !this.showMenu;
    },
    toggleShowItem() {
			this.showMenuItem = !this.showMenuItem;
    },
    catClicked(item) {
			this.toggleShow();
      this.addcategory = item;
      this.upcategory = item;
    },
    cat2Clicked(item) {
      this.toggleShow();
      this.upcategory = item._id;
      this.upcatname = item.name;
      this.upcatclass = item.class;
    },
    itemClicked(item) {
			this.toggleShowItem();
      this.upitem = item._id;
      this.upname = item.name;
      this.updesc = item.desc;
      this.uplink = item.imageurl;
      this.upprice = item.price;
      this.upstock = item.stock;
      this.upcategory = item.category;
    },
    registerItem() {
      let formdata = new FormData()
      formdata.append('image', this.addlink)

      axios.post('http://localhost:3000/upload', formdata)
      .then((image) => {
        axios({
          method: 'POST',
          url: this.baseUrl + "/api/items",
          headers: {
            token: localStorage.getItem("token")
          }, 
          data: {
            name: this.addname,
            desc: this.adddesc,
            imageurl: addlink.data.link,
            price: this.addprice,
            stock: this.addstock,
            category: this.addcategory
          }   
        })
        .then((data) => {
          console.log('Successfully add Item')
          this.addname = ''
          this.adddesc = ''
          this.addlink = ''
          this.addprice = ''
          this.addstock = ''
          this.addcategory = ''
          this.getHome()
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
      })
      .catch((err) => {
        console.log(err)  
      })
    },
    registerCat() {
      axios({
        method: 'POST',
        url: this.baseUrl + "/api/categories",
        headers: {
          token: localStorage.getItem("token")
        }, 
        data: {
          name: this.addcatname,
          class: this.addcatclass,
        }   
      })
      .then((data) => {
        console.log('Successfully add Category')
        this.addcatname = ''
        this.addcatclass = ''
        this.getHome()
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
    },
    reviseItem() {
      let id = this.upitem

      let formdata = new FormData()
      formdata.append('image', this.addlink)

      axios.post('http://localhost:3000/upload', formdata)
      .then((image) => {
        axios({
          method: 'PUT',
          url: this.baseUrl + `/api/items/${id}`,
          headers: {
            token: localStorage.getItem("token")
          }, 
          data: {
            name: this.upname,
            desc: this.updesc,
            imageurl: this.uplink,
            price: this.upprice,
            stock: this.upstock,
            category: this.upcategory
          }   
        })
        .then((data) => {
          console.log('Successfully update Item')
          this.upname = ''
          this.updesc = ''
          this.uplink = ''
          this.upprice = ''
          this.upstock = ''
          this.upcategory = ''
          this.getHome()
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
      })
      .catch((err) => {
        console.log(err)  
      })
    },
    reviseCat() {
      let id = this.upcategory
      axios({
        method: 'PUT',
        url: this.baseUrl + `/api/categories/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }, 
        data: {
          name: this.upcatname,
          class: this.upcatclass,
        }   
      })
      .then((data) => {
        console.log('Successfully update Category')
        this.upcatname = ''
        this.upcatclass = ''
        this.upcategory = ''
        this.getHome()
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
    },
    removeItem() {
      let id = this.upitem
      axios({
        method: 'DELETE',
        url: this.baseUrl + `/api/items/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((data) => {
        console.log('Successfully delete Item')
        this.upname = ''
        this.upitem = ''
        this.updesc = ''
        this.uplink = ''
        this.upprice = ''
        this.upstock = ''
        this.upcategory = ''
        this.getHome()
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
    }
  },
  getAddImg(link) {
    this.addlink = link.target.files[0]
    console.log("ini image", this.addlink);
  },
  getUpImg(link) {
    this.uplink = link.target.files[0]
    console.log("ini image", this.uplink);
  },
  created() {
    let datatoken = localStorage.getItem("token")
    let userole = localStorage.getItem("role")
    if (datatoken) {
      this.isLogin = true;
    }
    if (userole) {
      this.admStat = true;
    }
  },
  mounted() {
    this.getTransaction();
    this.getHome();
  },
  watch: {
  }
})