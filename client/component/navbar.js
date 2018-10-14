Vue.component('navbar-section',{
    template: 
     `<div>
        <nav class="navbar navbar-expand-sm bg-light navBarCustom">
                
            <div class="container">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link navBarItem" href="JavaScript:Void(0)">Home</a>
                    </li>
                </ul>
            </div>
            
            <div class="fontIconMargin">
                <div class="row">
                    <div v-if= "token !== '' && token !== null && usercredentials.role === 'user' " class="col-md-3 offset-md-3">
                        <a href="#">
                            <i class="fas fa-shopping-cart" data-toggle="modal" data-target="#cartModal">Your Cart</i>
                        </a>
                    </div>
                    <hr>
                    <div id="gSignInWrapper" v-if= "token === '' || token === null " data-width="300" data-height="200" data-longtitle="true">
                        <button id="google-signin-button" class="customGPlusSignIn">
                            Google Sign In
                        </button>
                    </div>
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
                        <div id="errloginmessage"></div>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" v-model="useremail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" v-model="userpassword" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
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
                        <div id="errregistermessage"></div>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input type="text" v-model="username" class="form-control" id="exampleInputName2" aria-describedby="emailHelp" placeholder="Enter email" required>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" v-model="useremail" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" required>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" v-model="userpassword" class="form-control" id="exampleInputPassword2" placeholder="Password" required>
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
                        <h5>Hi {{ usercredentials.name }} berikut rincian belanjaan kamu: </h5>
                        <div >
                            <div v-for="(item,index) in temptransaction">
                                {{index + 1}}. {{ item.itemname }} : {{item.itemprice}} IDR
                            </div>
                        </div>
                        <hr/>
                        <h5>Total: {{ totalamount }} IDR</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" v-on:click="createtransaction()"><font color="white">Buy Now</font></button>
                    </div>
                </div>
            </div>
        </div>
     </div>
     `,
    props: ['gettemptransaction','gettotalamount'], 
    data () {
      return {
        token: '',
        username: '',
        useremail: '',
        userpassword: '',
        usercredentials: {},
        islogin: false,
        temptransaction: [],
        totalamount: 0
      }
    },
    mounted (){
       /**
         * client_id: '742869772361-8bsmdes62f97gruqqiomk0qvjrlsdmdn.apps.googleusercontent.com',
         * cookiepolicy: 'single_host_origin'
         */
        window.gapi.load('auth2', () => {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            const auth2 = window.gapi.auth2.init({
            client_id: '155964938197-seq6sc4jpq9n8lr211rlglvaqen00836.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin'
            // Request scopes in addition to 'profile' and 'email'
            // scope: 'additional_scope'
            })
            this.attachSignin(auth2, document.getElementById('google-signin-button'))
        }) 
    },
    methods: {
        // getCredentials(){
        //    console.log('credentials -----', this.usercredentials) 
        //    let self = this
        //    axios({
        //       method: 'GET',
        //       url: 'https://apiecosmetics.efratsadeli.online/users/credentials',
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
        logoutgoogle () {
            // immediately signout from google
            let auth2 = window.gapi.auth2.getAuthInstance()
            auth2.signOut().then(function () {
            //   console.log('User signed out.')
            })
          },
        loginViaGoogle(input){
            let self = this
            let id_token = input
            axios({
               method: 'POST',
               url: `https://apiecosmetics.efratsadeli.online/user/logingoogle`,
               data:{
                  googletoken: id_token
               } 
            })
              .then(user =>{
                let successToken = user.data
                let jwtToken = successToken.token
                // console.log('Get user jwt token-------', jwtToken)
                self.token = jwtToken
                localStorage.setItem('token',self.token)
                self.islogin = true
                // self.getCredentials()
                axios({
                   method: 'GET',
                   url:'https://apiecosmetics.efratsadeli.online/users/credentials',
                   headers: {
                      token: self.token 
                   } 
                })
                 .then(user=>{
                    self.usercredentials = user.data.data
                    self.useremail = ''
                    self.userpassword = ''
                    this.$emit('usercredentials',self.usercredentials)
                    this.$emit('islogin',self.islogin)
                    self.logoutgoogle()
                 })
                 .catch(error=>{
                    res.status(500).json({
                        msg: 'ERROR Get Credentials ',error 
                     })
                 })
              })
              .catch(error =>{
                  console.log('ERROR Google Login-----',error)
              })
        },
        attachSignin (auth2Instance, element) {
            let self = this
            auth2Instance.attachClickHandler(element, {},
              function (googleUser) {
                const profile = googleUser.getBasicProfile()
                const id_token = googleUser.getAuthResponse().id_token;
                // console.log('GOOGLE - TOKEN---------', id_token)
                // console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
                self.loginViaGoogle(id_token)
                // self.logoutgoogle()
              }, function (error) {
                alert(JSON.stringify(error, undefined, 2))
              })
          },
        filterArray(val){
            let rawArr = val
            let filterArr = []
            rawArr.forEach(item => {
                filterArr.push(item._id)
            });
            return filterArr
        },
        isEmail(val){
           let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
           return regex.test(val) 
        },
        loginUser(){
            let self = this

            // validate all field should not be empty
            if(this.useremail === '' || this.userpassword === ''){
                $('#errloginmessage').empty()
                $('#errloginmessage').append(
                    `<div>
                    <button type="button" class="btn btn-danger">
                        Email and password should not be empty 
                    </button> 
                    </div>`
                )
                setTimeout( ()=>{
                    $('#errloginmessage').empty()   
                },3000)
                return 
            }

            // validate email
            if(!this.isEmail(this.useremail)){
                $('#errloginmessage').empty()
                $('#errloginmessage').append(
                    `<div>
                    <button type="button" class="btn btn-danger">
                        ERROR: Please Check your email 
                    </button> 
                    </div>`
                )
                setTimeout( ()=>{
                    $('#errloginmessage').empty()   
                },3000)
                return
            }

            axios({
               method: 'POST',
               url: 'https://apiecosmetics.efratsadeli.online/user/login',
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
                    url: 'https://apiecosmetics.efratsadeli.online/users/credentials',
                    headers: {
                       token: self.token 
                    }  
                 })
                   .then(user => {
                      self.usercredentials = user.data.data
                      self.useremail = ''
                      self.userpassword = ''
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

            // validate all field should not be empty
            if(this.useremail === '' || this.userpassword === '' || this.username === ''){
                $('#errregistermessage').empty()
                $('#errregistermessage').append(
                    `<div>
                    <button type="button" class="btn btn-danger">
                        Name, email and or password should not be empty 
                    </button> 
                    </div>`
                )
                setTimeout( ()=>{
                    $('#errregistermessage').empty()   
                },3000)
                return 
            }

            // validate email
            if(!this.isEmail(this.useremail)){
                $('#errregistermessage').empty()
                $('#errregistermessage').append(
                    `<div>
                    <button type="button" class="btn btn-danger">
                        ERROR: Please Check your email 
                    </button> 
                    </div>`
                )
                setTimeout( ()=>{
                    $('#errregistermessage').empty()   
                },3000)
                return
            }

            axios({
               method: 'POST',
               url: 'https://apiecosmetics.efratsadeli.online/user/register',
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
                    url: 'https://apiecosmetics.efratsadeli.online/users/credentials',
                    headers: {
                       token: self.token 
                    }  
                 })
                   .then(user => {
                      self.usercredentials = user.data.data
                      self.useremail = ''
                      self.userpassword = ''
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
            this.usercredentials = {}
            this.islogin = false
            this.totalamount = 0,
            this.temptransaction = []
            localStorage.removeItem('token')
            this.$emit('usercredentials',this.usercredentials)
            this.$emit('islogin',this.islogin)
         },
         createtransaction(){
            let self = this
            // filter the id
            let filterArr = this.filterArray(this.temptransaction)

            axios({
               method: 'POST',
               url: 'https://apiecosmetics.efratsadeli.online/transactions',
               headers: {
                  token: self.token 
               },
               data:{
                 transactionitemid: filterArr,
                 transactionamount: self.totalamount 
               }
            })
              .then(transaction =>{
                 filterArr = []
                 self.totalamount = 0,
                 self.temptransaction = []
                 $('#cartModal').modal('hide')
              })
              .catch(error =>{
                  console.log('ERROR Create transaction ',error)
              })
         }
    },
    watch: {
      gettemptransaction (val){
        this.temptransaction = val 
      },
      gettotalamount (val){
        this.totalamount = val
      },
      temptransaction(val){
        this.$emit('updatedtemptransaction', this.temptransaction)
      },
      totalamount(val){
        this.$emit('updatedtotalamount',this.totalamount)
      }
    } 
})