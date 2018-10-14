Vue.component('navbar-components', {
    template: `

    <div>
    <!-- header -->
    <header class="bg-dark logo">
        <ul class="nav justify-content-center">
            <li class="nav-item">
                <h1><span class="badge badge-primary">SwingFit</span></h1>
            </li>
        </ul>
    </header>
    
    
    
    <!-- navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <a class="navbar-brand login-btn" data-toggle="modal" data-target="#modal-login" v-if="!isLogin">Login</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- account navbar -->
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" v-if="isLogin">Home <span class="sr-only">(current)</span></a>
                </li>
                

                <!-- cart navbar -->
                <li class="nav-item" id="cart" v-if="isLogin && !isAdmin">
                    <a class="nav-link" id="navbarDropdown" role="button" data-toggle="modal" data-target="#modal-cart"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-shopping-cart"><span> ({{itemInCart}})</span></i>
                    </a>
                </li>

                <!-- category navbar -->
                <li class="nav-item dropdown" id="category">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Browse by category
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" @click="fetchItems">Show all</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" @click="fetchCategoryTees">Tees</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" @click="fetchCategoryJacket">Jacket</a>
                    </div>
                </li>

            </ul>

            <button class="btn btn-outline-dark my-2 my-sm-0" v-if="isLogin" @click="logout">log out</button>
        </div>
    </nav>



    <!-- Cart Modal -->
    <div class="modal fade" id="modal-cart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">item id</th>
                                <th scope="col">Name</th>
                                <th scope="col">qty</th>
                                <th scope="col">sub total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(property) in cartDisplay">
                                <th scope="row">{{property.id}}</th>
                                <td>{{property.name}}</td>
                                <td>{{property.qty}}</td>
                                <td>{{property.subTotal}}</td>
                                <td><button type="button" class="btn-sm btn-danger" v-on:click="removeItemFromCart(property.id)">remove</button></td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>Total price</h4>
                                </td>
                                <td></td>
                                <td></td>
                                <th>{{totalPrice}}</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary checkout-btn" data-toggle="modal"
                        data-target="#modal-cart" v-on:click="checkOut">Check out</button>
                </div>
            </div>
        </div>
    </div>

    <!-- login-modal -->
    <div class="modal fade" id="modal-login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><b>Welcome back </b></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" name="email" aria-describedby="emailHelp"
                                placeholder="Enter email" v-model="inputEmailLogin">
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" placeholder="Password"
                                v-model="inputPasswordLogin">
                        </div>

                        <div class="form-group">
                            <small id="emailHelp" class="form-text text-muted">Has no account?</small>
                            <button type="button" class="btn  btn-sm" data-toggle="modal" data-target="#modal-register"
                                data-dismiss="modal">Register
                                Here</button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-login"
                        v-on:click="login">Login</button>
                </div>
            </div>
        </div>
    </div>

    <!-- register-modal -->
    <div class="modal fade" id="modal-register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="first-name">First name</label>
                            <input type="text" class="form-control" name="first-name" aria-describedby="first-name"
                                placeholder="Your First name" v-model="inputFirstNameRegister">
                        </div>

                        <div class="form-group">
                            <label for="last-name">Last name</label>
                            <input type="text" class="form-control" name="last-name" aria-describedby="last-name"
                                placeholder="Your last name" v-model="inputLastNameRegister">
                        </div>

                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" name="email" aria-describedby="emailHelp"
                                placeholder="Enter email" v-model="inputEmailRegister">
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" placeholder="Password"
                                v-model="inputPasswordRegister">
                        </div>

                        <div class="form-group">
                            <small id="emailHelp" class="form-text text-muted">Has an account?</small>
                            <button type="button" class="btn  btn-sm" data-toggle="modal" data-target="#modal-login"
                                data-dismiss="modal">Login
                                Here</button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-register"
                        v-on:click="register">Register</button>
                </div>
            </div>
        </div>
    </div>
    
    
    </div>
   
    `,

    data: function () {
        return {
            port: 'http://localhost:3000/',
            isAdmin: false,
            isLogin: false,


            inputEmailLogin: '',
            inputPasswordLogin: '',

            inputEmailRegister: '',
            inputPasswordRegister: '',
            inputFirstNameRegister: '',
            inputLastNameRegister: '',

            items: [],
            
            
            cartDisplay: '',
            totalPrice: 0,

           
    }
    },
    props: ['cart', 'itemInCart'],
    created() {
        if(localStorage['admin']) {
            this.isAdmin = true;
        }
        
        if (localStorage['access-token']) {
            this.isLogin = true;
            
        }
    },
    methods: {
        login: function () {


            axios({
                method: 'POST',
                url: this.port + 'login',
                data: {
                    email: this.inputEmailLogin,
                    password: this.inputPasswordLogin
                }
            }).then((result) => {
                localStorage.setItem('access-token', result.data.token);

                if (result.data.admin) {
                    this.isAdmin = true;
                    localStorage.setItem('admin', true);
                }

                this.isLogin = true;
                this.inputEmailLogin = '';
                this.inputPasswordLogin = '';
                
                this.$emit('log-in', {
                    isLogin: this.isLogin,
                    isAdmin: this.isAdmin
                });
            }).catch((err) => {
                console.log(err);
            });
        },

        register: function () {
           

            axios({
                method: 'POST',
                url: this.port + 'register',
                data: {
                    first_name: this.inputFirstNameRegister,
                    last_name: this.inputLastNameRegister,
                    email: this.inputEmailRegister,
                    password: this.inputPasswordRegister
                }
            }).then((result) => {
                inputEmailRegister = '';
                inputPasswordRegister = '';
                inputFirstNameRegister = '';
                inputLastNameRegister = '';
            }).catch((err) => {

            });
        },

        fetchCategoryJacket: function() {
            
            axios({
                method: 'GET',
                url: `${this.port}category/jacket`
            }).then((result) => {
                this.$emit('fetch-category', result.data);
            }).catch((err) => {
                console.log(err);
            });
        },

        fetchCategoryTees: function() {
            
            axios({
                method: 'GET',
                url: `${this.port}category/tees`
            }).then((result) => {
                
                this.$emit('fetch-category', result.data);
            }).catch((err) => {
                console.log(err);
            });
        },

        logout: function () {
            this.isLogin = false;
            this.isAdmin = false;
            localStorage.clear();
            
            this.$emit('log-in', {
                isLogin: this.isLogin,
                isAdmin: this.isAdmin
            });
        },

        fetchItems: function () {
            
            this.$emit('fetch-all-items');
        },

        checkOut: function () {

            axios({
                method: 'POST',
                url: `${this.port}transaction`,
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            }).then((result) => {
                
                this.$emit('update-cart');
                
            }).catch((err) => {
                console.log(err);
            });
        },

        groupCartByItems: function () {
            this.cartDisplay = [];
            let pushedItem = [];
            this.totalPrice = 0;
            this.cart.list.forEach(currentItem => {
                this.totalPrice += currentItem.price;
                if (pushedItem.indexOf(currentItem._id) === -1) {
                    this.cartDisplay.push({
                        id: currentItem._id,
                        name: currentItem.name,
                        subTotal: currentItem.price,
                        qty: 1
                    })
                    pushedItem.push(currentItem._id);
                } else {


                    let index = this.cartDisplay.findIndex((element) => {

                        return element.id === currentItem._id
                    });


                    this.cartDisplay[index].subTotal += currentItem.price;
                    this.cartDisplay[index].qty++;
                }


            });

        },

        removeItemFromCart(id) {
            console.log(id);
            axios({
                method: 'PATCH',
                url: `${this.port}cart/${id}`,
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            }).then((result) => {
                this.$emit('update-cart');
            }).catch((err) => {
                console.log(err);
            });
        }

        
        

        
    },

    watch: {
        cart: function(val) {
            this.groupCartByItems();
            
        }
    }

   
})