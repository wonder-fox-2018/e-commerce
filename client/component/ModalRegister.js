Vue.component('modal-register', {
  props : ['register'],
  methods :{
    signup: function(){
      axios({
        method : 'POST',
        url : 'http://localhost:3000/signup',
        data : {
          email : this.register.email,
          password : this.register.password,
          name : this.register.name,
          address : this.register.address,
          city : this.register.city,
          state : this.register.state,
          zip : this.register.zip
        }
      })
      .then(register => {
        this.register.email = ''
        this.register.password =''
        this.register.name = ''
        this.register.address =''
        this.register.city = ''
        this.register.state =''
        this.register.zip =''
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  template : `
    <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="modalRegister" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Email</label>
                  <input type="email" class="form-control" id="inputEmail" v-model="register.email" placeholder="Email">
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Password</label>
                  <input type="password" class="form-control" id="inputPassword" v-model="register.password" placeholder="Password">
                </div>
              </div>
              <div class="form-group">
                <label for="inputName">Name</label>
                <input type="text" class="form-control" id="inputName" v-model="register.name" placeholder="Your Name ... ">
              </div>
              <div class="form-group">
                <label for="inputAddress">Address</label>
                <input type="text" class="form-control" id="inputAddress" v-model="register.address" placeholder="1234 Main St">
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputCity">City</label>
                  <input type="text" class="form-control" id="inputCity" v-model="register.city">
                </div>
                <div class="form-group col-md-4">
                  <label for="inputState">state</label>
                  <input type="text" class="form-control" id="inputState" v-model="register.state">
                </div>
                <div class="form-group col-md-2">
                  <label for="inputZip">Zip</label>
                  <input type="text" class="form-control" id="inputZip" v-model="register.zip">
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="signup" data-dismiss="modal">Register</button>
          </div>
        </div>
      </div>
    </div>
  `
})