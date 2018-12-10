Vue.component('sidebar-component',{
  props : ['is-login', 'user', 'role', 'search'],
  data : function(){
    return {
      keyword : ''
    }
  },
  methods : {
    searchproduct : function(){
      console.log(this.keyword)
      axios({
        method : 'GET',
        url : `http://localhost:3000/products/search/${this.keyword}`,
        headers : {
          access_token : localStorage.getItem('token')
        }
      })
      .then(user => {
        this.user.cart = user.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  template : `
  <div class="col-lg-3">
    <div class="list-group" v-if=isLogin>
      <h4 class="my-4">
        {{user.name}}
      </h4>
      <a href="#" class="list-group-item" v-if=role data-toggle='modal' data-target='#modalAddProduct'>
        add Product
      </a>
      <input type="text" class="form-control" v-model="this.keyword">
      <button type="button" @click="searchproduct" class="btn btn-primary">
        search
      </button>
    </div>
    <div class="list-group">
    </div>
  </div>
  `
})