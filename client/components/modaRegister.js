Vue.component('modal-register', {
  template:
  `
  <div>
    <div class="modalBox" v-if="openreg == true">
      <div class="overlay"></div>
      <div class="regBox">
        <button class="x-close" @click="closeReg">x</button>
        <h5 style="margin: 30px 0 40px;">
          <strong style="display: flex; justify-content: center;">Register</strong>
        </h5>
        <p class="err-notif">{{ this.notif }}</p>
        <div class="form">
          <div class="md-form">
            <label for="formreg1" class=""><i class="fa fa-user"></i>Name</label>
            <input v-model="regname" type="text" id="formreg1" class="form-control">
          </div>
          <div class="md-form">
            <label for="formreg2"><i class="fa fa-envelope"></i>Email</label>
            <input v-model="regemail" type="email" id="formreg2" class="form-control">
          </div>
          <div class="md-form">
            <label for="formreg3"><i class="fas fa-key"></i>Password</label>
            <input v-model="regpassword" type="password" id="formreg3" class="form-control">
          </div>
        </div>
        <button class="reg-btn" style="float: right" @click="register">Join</button>
      </div>
    </div>
  </div>
  `,
  props: [ 'openreg' ],
  data() {
    return {
      regname : '',
      regemail : '',
      regpassword : '',
      notif : '',
      baseUrl: "https://ecommerce-server.hanabc.xyz"
    }
  },
  methods: {
    closeReg() {
      this.$emit('openreg', false)
      this.notif = ''
    },
    register() {
      let self = this
      let data = {
          name : this.regname,
          email : this.regemail,
          password : this.regpassword
      }
      axios({
          method: 'POST',
          url: this.baseUrl + `/api/users/register`,
          data
      })
      .then(function(response){
        console.log('Register Success', response)
        let token = response.data.token
        localStorage.setItem('token', token)
        location.reload()
      })
      .catch(function(err){
        console.log(err.response)
        if (!self.regemail) {
        self.notif = 'valid email is required'
        } else if (!self.regpassword) {
          self.notif = 'password is required'
        } if (!self.regname) {
          self.notif = 'name is required'
        } else if (!self.regemail && !self.regpassword) {
          self.notif = 'email and password are required'
        } else {
          self.notif = 'Oops, ' + err.response.data.message
        }
      })
    }
  }
})