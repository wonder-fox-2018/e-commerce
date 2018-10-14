Vue.component('content-components', {
    template: `

    <div>
    <div class="row main-container">
    <!-- left content -->
    <div class="col-sm-2" id="filter-container">


        <ul class="list-group">
            <li class="list-group-item">
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search for product"
                        aria-label="Search" v-model="filterProduct">
                    <!--  <button class="btn btn-outline-dark my-2 my-sm-0" type="submit"><i class="fas fa-search"></i></button> -->
                </form>
            </li>
            <li class="list-group-item">
                <button class="btn btn-outline-dark my-2 my-sm-0" data-toggle="modal" data-target="#modal-add"
                    v-if="isAdmin">Add item</button>
            </li>
        </ul>

        <!-- modal add -->
        <div class="modal fade" id="modal-add" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add item</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="item-name">Name</label>
                                <input type="text" class="form-control" name="item-name" aria-describedby="item-name"
                                    placeholder="Item name" v-model="inputNameAddItem">
                            </div>

                            <div class="form-group">
                                <label for="price">Price</label>
                                <input type="text" class="form-control" name="price" aria-describedby="price"
                                    placeholder="item price" v-model="inputPriceAddItem">
                            </div>

                            <div class="form-group">
                                <label for="category">Category</label>
                                <input type="text" class="form-control" name="category" aria-describedby="category"
                                    placeholder="item category" v-model="inputCategoryAddItem">
                            </div>

                            <div class="form-group">
                                <label for="picture">Upload picture</label>
                                <input type="file" class="form-control" v-on:change="getImageAdd($event)">
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-add"
                            v-on:click="submitAdd">Submit</button>
                    </div>
                </div>
            </div>
        </div>












    </div>

    <!-- right-content -->
    <div class="col-sm-10">
        <div class="row">
            <div class="col-sm-4 item-grid" v-for="(item) in items">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" v-bind:src="item.picture" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title"><b>{{item.name}}</b></h5>
                        <div class="flex-column">
                            <div class="ui tag labels">
                                <div class="ui label">
                                    {{item.price}}
                                </div>
                            </div>
                            <button class="btn btn-outline-dark my-2 my-sm-0" data-toggle="modal" data-target="#modal-edit"
                                v-if="isAdmin" @click="editItem(item)">Edit</button>
                            <button class="btn btn-outline-danger my-2 my-sm-0" v-if="isAdmin" @click="deleteItem(item._id)">Delete</button>
                            <div class="ui vertical animated button" tabindex="0" v-else v-on:click="addToCart(item._id)">
                                <div class="hidden content">buy</div>
                                <div class="visible content">
                                    <i class="shop icon"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>




    <!-- modal-edit -->
    <div class="modal fade" id="modal-edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit {{inputIdEditItem}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="item-name">Name</label>
                            <input type="text" class="form-control" name="item-name" aria-describedby="item-name"
                                placeholder="Item name" v-model="inputNameEditItem">
                        </div>

                        <div class="form-group">
                            <label for="price">Price</label>
                            <input type="text" class="form-control" name="price" aria-describedby="price"
                                placeholder="item price" v-model="inputPriceEditItem">
                        </div>

                        <div class="form-group">
                            <label for="category">Category</label>
                            <input type="text" class="form-control" name="category" aria-describedby="category"
                                placeholder="item category" v-model="inputCategoryEditItem">
                        </div>

                        <div class="form-group">
                            <label for="picture">Upload picture</label>
                            <input type="file" class="form-control" v-on:change="getImage($event)">
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-edit"
                        v-on:click="submitEdit">Submit</button>
                </div>
            </div>
        </div>
    </div>




</div>

    
    
    
    
    </div>
    
    
    
    
    `,
    props: ['currentStatus', 'updateCartAtContent', 'filterCategory'],
    data: function () {
        return {

            port: 'http://localhost:3000/',

            isAdmin: false,
            isLogin: false,

            items: [],
            itemInCart: 0,
            cart: '',
            cartDisplay: [],
            totalPrice: 0,
            filterProduct: '',



            inputIdEditItem: '',
            inputNameEditItem: '',
            inputPriceEditItem: '',
            inputPictureEditItem: '',
            inputCategoryEditItem: '',
            prevPictureEditItem: '',

            inputNameAddItem: '',
            inputPriceAddItem: '',
            inputCategoryAddItem: '',
            inputPictureAddItem: ''


        }
    },
    created() {

        this.fetchItems();

        if (localStorage['admin']) {
            this.isAdmin = true;
        }

        if (localStorage['access-token']) {
            this.isLogin = true;
            this.fetchCart();
        }

    },
    methods: {
        fetchItemsByName: function (keyWord) {
            axios.get(`${this.port}item?keyWord=${keyWord}`).then((result) => {
                this.items = [];
                result.data.forEach(currentItem => {
                    this.items.push(currentItem);
                });
            }).catch((err) => {
                console.log(err);
            });
        },

        fetchCart: function () {
            axios.get(this.port + 'cart', {
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            }).then((result) => {

                this.cart = result.data;
                this.itemInCart = result.data.list.length;
                this.$emit('update-cart-at-navbar', {
                    cart: this.cart,
                    itemInCart: this.itemInCart
                })
            }).catch((err) => {
                console.log(err);
            });
        },
        addToCart: function (itemId) {
            axios({
                method: 'PUT',
                url: `${this.port}cart/${itemId}`,
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            }).then((result) => {
                this.fetchCart();
            }).catch((err) => {
                console.log(err);
            });
        },







        editItem: function (item) {

            this.inputIdEditItem = item._id;
            this.inputNameEditItem = item.name;
            this.inputPriceEditItem = item.price;
            this.inputPictureEditItem = item.picture;
            this.inputCategoryEditItem = item.inputCategoryEditItem;
            this.prevPictureEditItem = this.inputPictureEditItem;

        },


        submitEdit: function () {

            let skipUpload = this.prevPictureEditItem === this.inputPictureEditItem;

            if (skipUpload) {

                axios({
                    method: 'PUT',
                    url: this.port + 'item/' + this.inputIdEditItem,
                    headers: {
                        'access-token': localStorage.getItem('access-token')
                    },
                    data: {
                        name: this.inputNameEditItem,
                        price: this.inputPriceEditItem,
                        category: this.inputCategoryEditItem,
                        picture: this.inputPictureEditItem
                    }
                }).then((result) => {
                    this.fetchItems();
                }).catch((err) => {

                    console.log(err);
                });
            } else {
                let formdata = new FormData()

                formdata.append('image', this.inputPictureEditItem);


                axios.post(`${this.port}item/upload`, formdata, {
                    headers: {
                        'access-token': localStorage.getItem('access-token')
                    }
                }).then((result) => {
                    axios({
                        method: 'PUT',
                        url: this.port + 'item/' + this.inputIdEditItem,
                        headers: {
                            'access-token': localStorage.getItem('access-token')
                        },
                        data: {
                            name: this.inputNameEditItem,
                            price: this.inputPriceEditItem,
                            category: this.inputCategoryEditItem,
                            picture: result.data.link
                        }
                    }).then((result) => {
                        this.fetchItems()
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }

        },

        getImage(link) {

            this.inputPictureEditItem = link.target.files[0];


        },

        deleteItem(id) {
            axios({
                method: 'DELETE',
                url: this.port + `item/${id}`,
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            }).then((result) => {
                this.fetchItems();
            }).catch((err) => {
                console.log(err);
            });
        },

        submitAdd() {
            let formdata = new FormData()

            formdata.append('image', this.inputPictureAddItem);

            axios.post(`${this.port}item/upload`, formdata, {
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            }).then((result) => {
                axios({
                    method: 'POST',
                    url: `${this.port}item`,
                    headers: {
                        'access-token': localStorage.getItem('access-token')
                    },
                    data: {
                        name: this.inputNameAddItem,
                        price: this.inputPriceAddItem,
                        picture: result.data.link,
                        category: this.inputCategoryAddItem
                    }
                }).then((result) => {
                    this.inputNameAddItem = '';
                    this.inputPriceAddItem = '';
                    this.inputCategoryAddItem = '';
                    this.inputPictureAddItem = '';
                    this.fetchItems();
                }).catch((err) => {

                });
            }).catch((err) => {
                console.log(err);
            });


        },

        getImageAdd(link) {


            this.inputPictureAddItem = link.target.files[0];



        },

        fetchItems: function () {

            axios.get(`${this.port}item`).then((result) => {

                this.items = result.data;


            }).catch((err) => {
                console.log(err);
            });
        },

        

        fetchCategory(val) {
            this.items = val;
        }

    },
    watch: {
        filterProduct: function (val) {
            this.fetchItemsByName(val);
        },

        currentStatus(obj) {
            this.isLogin = obj.isLogin;
            this.isAdmin = obj.isAdmin;
            this.fetchItems();
        },
        updateCartAtContent(val) {
            this.fetchCart();
        },

        filterCategory(val) {
            this.items = val;
        }
    }
})