Vue.component('modal-login', {
  template:
  `
  <div>
    <div class="modalBox" v-if="openlog == true">
      <div class="overlay"></div>
      <div class="logBox">
        <button class="x-close" @click="closeLog">x</button>
        <h5 style="margin: 30px 0 40px;">
          <strong style="display: flex; justify-content: center;">Login</strong>
        </h5>
        <p class="err-notif">{{ this.lognotif }}</p>
        <div class="form">
          <div class="md-form">
            <label for="formlog1"><i class="fa fa-envelope"></i>Email</label>
            <input v-model="logemail" type="email" id="formlog1" class="form-control">
          </div>
          <div class="md-form">
            <label for="formlog2"><i class="fas fa-key"></i>Password</label>
            <input v-model="logpassword" type="password" id="formlog2" class="form-control">
          </div>
        </div>
        <button class="reg-btn" style="float: right" @click="login">Login</button>
      </div>
    </div>
  </div>
  `,
  props: [ 'openlog' ],
  data() {
    return {
      logemail : '',
      logpassword : '',
      lognotif: '',
      baseUrl: "https://ecommerce-server.hanabc.xyz"
    }
  },
  methods: {
    closeLog() {
      this.$emit('openlog', false)
      this.lognotif = ''
    },
    login() {
      axios({
        method: 'POST',
        url: this.baseUrl + "/api/users/login",
        data: {
            email : this.logemail,
            password : this.logpassword
        }   
      })
      .then((data) => {
        console.log('Login Success')
        let token = data.data.token
        localStorage.setItem('token', token)
        let role = data.data.role
        if (role === 'Admin') {
          localStorage.setItem('role', role)
        }
        location.reload()
      })
      .catch((err) => {
        this.lognotif = err.response.data.message
      })
    }
  }
})