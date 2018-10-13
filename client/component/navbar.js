Vue.component('navbar-section',{
    template: 
     `<div>
        <nav class="navbar navbar-expand-sm bg-light navBarCustom">
                
            <div class="container">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link navBarItem" href="JavaScript:Void(0)">Home</a>
                    </li>
                    <li class="nav-item" v-if = "token !== null && token !== ''">
                        Welcome {{ usercredentials.name }}
                    </li>
                </ul>
            </div>
            
            <div class="fontIconMargin">
                <div class="row">
                    <div v-if= "token !== '' && token !== null " class="col-md-3 offset-md-3">
                        <a href="#">
                            <i class="fas fa-shopping-cart" data-toggle="modal" data-target="#cartModal">Your Cart</i>
                        </a>
                    </div>
                    <hr>
                    <div v-if= "token === '' || token === null " class="col-md-3">
                        <button type="button" data-toggle="modal" data-target="#loginUser">Login</button>
                    </div>
                    <br>
                    <div v-if= "token === '' || token === null " class="col-md-3">
                        <button type="button" data-toggle="modal" data-target="#registerUser">Register</button>
                    </div>
                    <div v-if= "token !== '' && token !== null " class="col-md-3">
                        <button type="button" v-on:click="logout()" >Logout</button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Modal Part -->
        <!-- Login Modal -->
        <div class="modal fade" id="loginUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" v-model="useremail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" v-model="userpassword" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                        </form>
                        <br/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" v-on:click= "loginUser()">Login</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Register Modal -->
        <div class="modal fade" id="registerUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input type="text" v-model="username" class="form-control" id="exampleInputName2" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" v-model="useremail" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" v-model="userpassword" class="form-control" id="exampleInputPassword2" placeholder="Password">
                            </div>
                        </form>
                        <br/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" v-on:click= "registerUser()">Register</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Shopping Cart Modal -->
        <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Your cart</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                        <h5>Hi Cantik berikut rincian belanjaan kamu: </h5>
                        <div >
                            <div>
                                Lipstick : Price 1.000.000 IDR
                            </div>
                            <div>
                                Eye-lashes : Price 400.000 IDR
                            </div>
                        </div>
                        <hr/>
                        <h5>Total: 1.400.000 IDR</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary"><font color="white">Buy Now</font></button>
                    </div>
                </div>
            </div>
        </div>
     </div>
     `,
    data () {
      return {
        token: '',
        username: '',
        useremail: '',
        userpassword: '',
        usercredentials: {},
        islogin: false
      }
    },
    methods: {
        // getCredentials(){
        //    console.log('credentials -----', this.usercredentials) 
        //    let self = this
        //    axios({
        //       method: 'GET',
        //       url: 'http://localhost:3007/users/credentials',
        //       headers: {
        //          token: self.token 
        //       }  
        //    })
        //      .then(user => {
        //         self.usercredentials = user.data.data
        //         this.$emit('usercredentials',self.usercredentials)
        //         this.$emit('islogin',self.islogin)
        //      })
        //      .catch(error => {
        //          res.status(500).json({
        //             msg: 'ERROR Get Credentials ',error 
        //          })
        //      })
        // },
        loginUser(){
            let self = this
            axios({
               method: 'POST',
               url: 'http://localhost:3007/user/login',
               data: {
                  email: self.useremail,
                  password: self.userpassword 
               }
            })
             .then(user =>{
                self.token = user.data.token
                localStorage.setItem('token',self.token)
                self.islogin = true
                // self.getCredentials()
                // get credentials
                axios({
                    method: 'GET',
                    url: 'http://localhost:3007/users/credentials',
                    headers: {
                       token: self.token 
                    }  
                 })
                   .then(user => {
                      self.usercredentials = user.data.data
                      this.$emit('usercredentials',self.usercredentials)
                      this.$emit('islogin',self.islogin)
                   })
                   .catch(error => {
                       res.status(500).json({
                          msg: 'ERROR Get Credentials ',error 
                       })
                   })


                // close modal
                $('#loginUser').modal('hide')
             })
             .catch(error => {
                console.log('ERROR User Login: ',error)
             })
         },
         registerUser(){
            let self = this
            axios({
               method: 'POST',
               url: 'http://localhost:3007/user/register',
               data: {
                  name: self.username,
                  email: self.useremail,
                  password: self.userpassword
               }
            })
              .then(user => {
                self.token = user.data.token
                localStorage.setItem('token',self.token)
                self.islogin = true
                // self.getCredentials() 
                // get credentials
                axios({
                    method: 'GET',
                    url: 'http://localhost:3007/users/credentials',
                    headers: {
                       token: self.token 
                    }  
                 })
                   .then(user => {
                      self.usercredentials = user.data.data
                      this.$emit('usercredentials',self.usercredentials)
                      this.$emit('islogin',self.islogin)
                   })
                   .catch(error => {
                       res.status(500).json({
                          msg: 'ERROR Get Credentials ',error 
                       })
                   })
                // close modal
                $('#registerUser').modal('hide')
              })
              .catch(error =>{
                console.log('ERROR User Register: ',error)
              })
         },
         logout() {
            this.token = ''
            this.getCredentials = {}
            this.islogin = false
            localStorage.removeItem('token')
            this.$emit('usercredentials',self.usercredentials)
            this.$emit('islogin',self.islogin)
         }
    } 
})