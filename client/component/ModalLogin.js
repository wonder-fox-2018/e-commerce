Vue.component('modal-login',{
  props : ['login', 'getToken', 'getuseronline'],
  methods : {
    signin : function(){
      axios({
        method : 'POST',
        url : 'http://localhost:3000/signin',
        data : {
          email : this.login.email,
          password : this.login.password
        }
      })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        this.getToken()
        this.getuseronline()
        this.login.email = ''
        this.login.password = ''
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  template:`
    <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="modalLogin" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="inputEmail">Email address</label>
                <input type="email" class="form-control" v-model="login.email" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" v-model="login.password" placeholder="Password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="signin" data-dismiss="modal">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  `
})