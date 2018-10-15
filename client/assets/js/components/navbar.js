Vue.component('nav-bar', {
    data: function(){
        return {
            host: 'http://localhost:3000',
            navSearch: '',
            registerName: '',
            registerEmail: '',
            registerPassword: '',
            loginEmail: '',
            loginPassword: '',
            categories: [],
            itemCart: [],
            addCategoryName: '',
            editCategoryName: '',
            editCategoryId: null,
            editMode : false,
            addItemName : '',
            addItemUrl: '',
            addItemCategory: '',
            addItemPrice : '',
            image: '',
            notif: false,
            notifMsg: '',
            statusTransaction: false,
            transactionId: '',
            allTrx: [],
            trx: []
        }
    },
    props: ['user'],
    created(){
        this.getCategories()
    },
    methods: {
        login(){
            axios({
                method :'POST',
                url: `${this.host}/login`,
                data: {
                  email: this.loginEmail,
                  password: this.loginPassword
                }
            })
            .then((result) => {
            this.loginPassword = ''
            this.notif = false
            this.notifmsg = ''
            localStorage.setItem('coffeeToken', result.data.token)
            this.$emit('trigger-datauser')
            })
            .catch((err) => {
            this.notif = true
            this.notifMsg = err.response.data.message
            });
        },
        register(){
            axios({
                method: 'post',
                url: `${this.host}/users`,
                data: {
                  name: this.registerName,
                  email: this.registerEmail,
                  password: this.registerPassword
                }
            })
            .then((result) => {
            console.log('register sukses');
            })
            .catch((err) => {
            console.log(err.message);
            });
        },
        logout(){
            localStorage.removeItem('coffeeToken')
            localStorage.removeItem('cart')
            this.$emit('trigger-logout')
        },
        addCategory(){
            axios({
                method: 'POST',
                url: `${this.host}/categories`,
                headers: {
                    token: localStorage.getItem('coffeeToken')
                },
                data: {
                    name: this.addCategoryName
                }
            })
            .then((result) => {
                console.log(result.data);
                this.getCategories()
            }).catch((err) => {
                console.log(err);   
            });
        },
        getCategories(){
            axios({
                method: 'GET',
                url: `${this.host}/categories`
            })
            .then((result) => {
                this.categories = result.data.data
                this.editCategoryId = null,
                this.editCategoryName = ''
                this.editMode = false
                this.addCategoryName = ''
            }).catch((err) => {
                console.log(err.message)
            });
        },
        deleteCategory(id){
            axios({
                method:'DELETE',
                url: `${this.host}/categories`,
                headers: {
                    token: localStorage.getItem('coffeeToken')
                },
                data: {
                    id: id
                }
            })
            .then((result) => {
                console.log(result.data);
                this.getCategories()
            }).catch((err) => {
                console.log(err); 
            });
        },
        editCategoryModeForm(id){
            this.editMode = true
            axios({
                method: 'GET',
                url: `${this.host}/categories/${id}`
            })
            .then((result) => {
                this.editCategoryName = result.data.result.name
                this.editCategoryId = result.data.result._id
            }).catch((err) => {
                console.log(err);
            });
        },
        editCategory(){
            axios({
                method: 'PUT',
                url: `${this.host}/categories`,
                headers: {
                    token: localStorage.getItem('coffeeToken')
                },
                data: {
                    id: this.editCategoryId,
                    name: this.editCategoryName
                }
            })
            .then((result) => {
                console.log(result.data.message);
                this.getCategories()
            }).catch((err) => {
                console.log(err);
            });
        },
        addItem(){
            let formData = new FormData()
            formData.append('name', this.addItemName)
            formData.append('price', this.addItemPrice)
            formData.append('image', this.image)
            formData.append('category', this.addItemCategory)

            axios.post(`${this.host}/items`, formData, {
                headers: {
                    token: localStorage.getItem('coffeeToken')
                }
            })
            .then((result) => {
                console.log(result.data);
                this.$emit('update-all-item')
                this.addItemName = ''
                this.addItemPrice = ''
                this.image = ''
                this.addItemCategory = ''

            }).catch((err) => {
                console.log(err.response);
            });
        },
        searchItem(){
            axios({
                method: 'GET',
                url: `${this.host}/items/search/${this.navSearch}`
            })
            .then((result) => {
                // console.log(result.data.result);
                this.$emit('item-search', result.data.result)
            }).catch((err) => {
                console.log(err.response);
            });
        },
        listCart(){
            this.statusTransaction = false
            let list = JSON.parse(localStorage.getItem('cart'))
            if(list){
                this.itemCart = list
            } else {
                this.itemCart = []
            }
        },
        getTotal(){
            let list = JSON.parse(localStorage.getItem('cart'))
            let total = 0
            if (list) {
                list.forEach(item => {
                    total+=(item.price*item.quantity)
                });
            }
            return total
        },
        getTotalTrx(){
            let total = 0
            this.trx.forEach(item => {
                total += (item.price*item.qty)
            })
            return total
        },
        sortCategory(id){
            axios({
                method: 'GET',
                url: `${this.host}/items/category/${id}`
            })
            .then((result) => {
                this.$emit('new-data', result.data.datas)
            }).catch((err) => {
                console.log(err);
            });
        },
        getAllItem(){
            this.$emit('update-all-item')
        },
        onFileChange(event) {            
            this.image = event.target.files[0]
        },
        checkout(){
            let list = JSON.parse(localStorage.getItem('cart'))
            let items = []
            let total = 0
            list.forEach(item => {
               items.push({id: item._id, name: item.name, price: item.price, qty: item.quantity}) 
               total += (item.price * item.quantity)
            })
            axios({
                method: 'POST',
                url: `${this.host}/transactions`,
                headers: {
                    token: localStorage.getItem('coffeeToken')
                },
                data: {
                    items: items,
                    total: total
                }
            })
            .then((result) => {
                localStorage.removeItem('cart')
                console.log('checkout success');
            })
            .catch((err) => {
                console.log(err.response);  
            });
            
        },
        showTransaction(){
            axios({
                method: 'GET',
                url: `${this.host}/transactions/${this.user.id}`,
                headers: {
                    token: localStorage.getItem('coffeeToken')
                }
            })
            .then((result) => {
                this.allTrx = result.data.result
            })
            .catch((err) => {
                console.log(err.response);
                
            });
        },
        detailTrx(id){
            this.statusTransaction = true
            axios({
                method: 'GET',
                url: `${this.host}/transactions/detail/${id}`,
                headers: {
                    token: localStorage.getItem('coffeeToken')
                }
            })
            .then((result) => {
                this.trx = result.data.result.items
            })
            .catch((err) => {
                console.log(err.response);
            });
        }
    },
    template: `
        <div>
            <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" @click="getAllItem" >Waroeng Coffee</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" > Category </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" @click="getAllItem" >All Item</a>
                                <a class="dropdown-item" v-for="category in categories" @click="sortCategory(category._id)" > {{category.name}}</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="navSearch">
                                <button class="btn btn-outline-success my-2 my-sm-0 mr-3" @click="searchItem">Search</button> 
                                
                                <button type="button" class="btn btn-primary ml-5" data-toggle="modal" data-target="#modal-Category" @click="getCategories" v-if=" user && user.admin" >Manage Category</button>
                                <button type="button" class="btn btn-primary ml-3" data-toggle="modal" data-target="#modal-addItem" v-if=" user && user.admin" @click="getCategories" >Add Item</button>
                            </div>
                        </li>
                    </ul>
                    <span class="my- my-lg-0 mr-3">
                        <div v-if="user">
                            <div class="mr-5 mb-2" v-if="user" style="text-align:center"> Hallo, {{user.name}} </div>
                            <button class="btn btn-primary ml-3" data-toggle="modal" data-target="#modal-cart" v-if=" user&& !user.admin"><i class="fas fa-shopping-cart" style="size:9x;" @click="listCart"></i></button>
                            <button class="btn btn-primary ml-3" data-toggle="modal" data-target="#modal-trx" v-if=" user&& !user.admin" @click="showTransaction"><i class="fa fa-history" style="size:7x;" aria-hidden="true"></i></button>
                            <button type="button" class="btn btn-primary ml-3" data-toggle="modal" v-on:click="logout" v-if="user">Logout</button>
                        </div>
                        
                        <div v-if="!user">
                            <button id="btn-login" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-login">Login</button>
                            <button id="btn-register" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-register">Register</button>
                        </div>
                    </span>
                </div>
            </nav>

        <!-- Modal -->
        <!-- register -->
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
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Name"
                                v-model='registerName'>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" v-model="registerEmail" aria-describedby="emailHelp"
                                placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" v-model="registerPassword" placeholder="Password">
                        </div>
                        <button type="submit" class="btn btn-primary" @click="register">Submit</button>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>

        <!-- login -->
        <div class="modal fade" id="modal-login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" v-model="loginEmail" aria-describedby="emailHelp"
                                placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" v-model="loginPassword" placeholder="Password">
                        </div>
                        <button class="btn btn-primary" data-dismiss="modal"  v-on:click="login">Login</button>
                        <div class="alert alert-warning" role="alert" v-if="notif">
                            {{notifMsg}}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <!-- cart -->
        <div class="modal fade" id="modal-cart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" v-if="statusTransaction">Transaction </h5>
                        <h5 class="modal-title" id="exampleModalLabel" v-else >Your Cart</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for=" list in itemCart">
                                    <td>{{list.name}}</td>
                                    <td>{{list.quantity}}</td>
                                    <td>Rp. {{list.price}}</td>
                                    <td>Rp. {{list.price * list.quantity}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="font-weight: bold">TOTAL PRICE</td>
                                    <td colspan="2" style="font-weight: bold" v-if="">Rp. {{getTotal()}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn btn-primary" data-dismiss="modal" v-on:click="checkout">Checkout</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Category - Modal -->
        <div class="modal fade" id="modal-Category" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                    <!-- form addCategory -->
                    <div class="form-group">
                        <label for="exampleInputEmail1" v-if="editMode"> Edit Category Name</label>
                        <label for="exampleInputEmail1" v-if="!editMode">New Category Name</label>
                        <input type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Enter Name of Category" v-if="editMode" v-model="editCategoryName">
                        <input type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Enter Name of Category" v-if="!editMode" v-model="addCategoryName">
                    </div>
                    <button class="btn btn-primary" @click="editCategory" v-if="editMode"> Edit Category</button> <hr>
                    <button class="btn btn-primary" @click="addCategory" v-if="!editMode">Add Category</button> <hr>
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Category Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="category in categories">
                                    <td>{{category.name}}</td>
                                    <td>
                                        <button @click="editCategoryModeForm(category._id)">Edit</button>
                                        <button @click="deleteCategory(category._id)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- add Item - modal -->
        <div class="modal fade" id="modal-addItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Item</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">item Name</label>
                            <input type="text" class="form-control" v-model="addItemName" aria-describedby="emailHelp" placeholder="Enter item Name">
                        </div> 
                        <div class="form-group">
                            <label for="exampleInputPassword1">Category</label>
                            <select class="form-control" v-model="addItemCategory">
                                <option class="form-control" v-for="category in categories" :value=category._id>{{category.name}}</option>
                            </select> 
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Price</label>
                            <input type="text" class="form-control" v-model="addItemPrice" placeholder="item Price">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Image</label>
                            <input type="file" class="form-control" id="avatar" name="avatar" accept="image/png, image/jpeg" @change="onFileChange">
                        </div>
                        <button class="btn btn-primary" data-dismiss="modal" v-on:click="addItem">Add item</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Transaction -->
        <div class="modal fade" id="modal-trx" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Transaction History</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Id Transaction</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="trx in allTrx">
                                    <td>{{trx._id}}</td>
                                    <td>{{trx.status}}</td>
                                    <td><button class="btn btn-primary" data-dismiss="modal" data-toggle="modal" data-target="#modal-detailtrx" v-on:click="detailTrx(trx._id)">Detail</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- detailTrx -->
        <div class="modal fade" id="modal-detailtrx" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" v-if="statusTransaction">Detail Transaction </h5>
                        <h5 class="modal-title" id="exampleModalLabel" v-else >Your Cart</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="list in trx">
                                    <td>{{list.name}}</td>
                                    <td>{{list.qty}}</td>
                                    <td>Rp. {{list.price}}</td>
                                    <td>Rp. {{list.price * list.qty}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="font-weight: bold">TOTAL PRICE</td>
                                    <td colspan="2" style="font-weight: bold" v-if="">Rp. {{getTotalTrx()}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
    `
})