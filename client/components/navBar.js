Vue.component('nav-bar', {
  template:
  `
  <div>
    <nav class="main-menu" @mouseover="showSearch" @mouseleave="hideSearch">
      <ul>
        <li @click="isHome"><i class="fas fa-stroopwafel"></i><span class="nav-text">Home</span></li>
        <li v-if="islogin" :style="{display: inTable, margin: inMargin}"><i class="fa fa-search"></i><span v-show="isSearch">
          <input type="text" v-model="search" @keyup="sendSearch(search)" class="searchBox"></span></li>
        <li v-for="cat in cats" @click="catSendId(cat._id)"><i class="fa" :class="cat.class"></i><span class="nav-text">{{cat.name}}</span></li>
        <li @click="clickCart" v-if="islogin">
        <i class="fa fa-cart-plus"><div class="numCart" v-if="cartcount > 0">{{cartcount}}</div></i><span class="nav-text">Transactions</span></li>
        <li @click="openAdm" v-if="islogin && adm === true">
          <i class="fas fa-users-cog"></i><span class="nav-text">Administrator</span></li>
      </ul>

      <ul class="logout" v-if="!islogin">
        <li @click="clickReg"><i class="fas fa-user-plus"></i><span class="nav-text">Register</span></li>
        <li @click="clickLog"><i class="fas fa-sign-in-alt"></i><span class="nav-text">Login</span></li>  
      </ul>
      <ul class="logout" v-else>
        <li @click="logout"><i class="fas fa-sign-out-alt"></i><span class="nav-text">Logout</span></li>   
      </ul>    
    </nav>
  </div>
  `,
  props: [ 'islogin', 'itemlist', 'cartcount', 'openreg', 'openlog', 'opencart', 'adm', 'openpermit', 'changecat', 'changecat2' ],
  data() {
    return {
      inMargin: 'auto',
      inTable: 'block',
      search: '',
      isSearch: false,
      cats: [],
      baseUrl: "https://ecommerce-server.hanabc.xyz"
    }
  },
  methods: {
    showSearch() {
      this.isSearch = true
      this.inTable = 'inline-table'
      this.inMargin = '-15px auto 0'
    },
    hideSearch() {
      this.isSearch = false
      this.inTable = 'block'
      this.inMargin = 'auto'
    },
    clickReg() {
      this.$emit('openreg', true)
    },
    clickLog() {
      this.$emit('openlog', true)
    },
    clickCart() {
      this.$emit('opencart', true)
    },
    isHome() {
      this.$emit('home', true)
    },
    catSendId(val) {
      this.$emit('catsend', val)
    },
    sendSearch(val) {
      this.$emit('sendsearch', val)
    },
    openAdm() {
      this.$emit('openpermit', true)
    },
    getCategory() {
      axios
        .get(this.baseUrl + "/api/categories")
        .then(response => {
          this.cats = response.data.categories;
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    logout() {
      localStorage.clear();
      window.location.reload();
      this.$emit('islogin', false);
    },
  },
  created() {
    this.getCategory();
  },
  watch: {
    changecat() {
      return this.getCategory();
    },
    changecat2() {
      return this.getCategory();
    }
  }
})