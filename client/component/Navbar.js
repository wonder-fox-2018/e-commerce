Vue.component('navbar-component',{
  props : ['is-login','get-token', 'user', 'getuseronline','refresh' ],
  methods : {
    signout : function(){
      localStorage.removeItem('token')
      this.getToken()
      this.refresh()
      this.getuseronline()
    }
  },
  template : `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">Fransiena.id</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if=!isLogin>
            <a class="nav-link" href="#" data-toggle="modal" data-target="#modalRegister">Register</a>
          </li>
          <li class="nav-item" v-if="!isLogin">
            <a class="nav-link" href="#" data-toggle="modal" data-target="#modalLogin">Login</a>
          </li>
          <li class="nav-item" v-if=isLogin>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalCart">
              Cart <span class="badge badge-light">{{user.count}}</span>
            </button>
          </li>
          <li class="nav-item" v-if=isLogin>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalCheckout">
              checkout
            </button>
          </li>
          <li class="nav-item" v-if="isLogin">
            <a class="nav-link" href="#" @click="signout" >Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `
})