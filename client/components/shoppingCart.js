Vue.component('shopping-cart', {
    props: ['cart-show', 'getusercart', 'getcartbadge', 'gettotalprice', 'cart', 'total-price', 'getitems', 'showlistitem', 'getusertransactions'],
    methods: {
        emptyCart: function() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/cart/empty',
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then(result => {
                    this.getusercart();
                    this.getcartbadge();
                    this.gettotalprice();
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        removeItemFromCart: function(itemId) {
            axios({
                method: 'PATCH',
                url: `http://localhost:3000/cart/${itemId}`,
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then(result => {
                    this.getusercart();
                    this.getcartbadge();
                    this.gettotalprice();
                    this.getitems();
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        checkout: function() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/transaction',
                headers: {
                    'access-token': localStorage.getItem('token')
                }
            })
                .then(transaction => {
                    this.getitems();
                    this.showlistitem();
                    this.getcartbadge();
                    this.getusertransactions();
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    },
    template: `<div v-if="cartShow" class="container">
                <div class="row">
                    <div class="col-lg-8 mt-4 d-flex flex-column">
                        <div class="d-flex justify-content-start mb-3 border align-items-center" id="cart-all-products">
                            <div class="lead ml-3">All products in your cart</div>
                            <button @click="emptyCart" class="btn btn-link ml-auto">Empty Cart</button>
                        </div>
                        <div v-for="item in cart" class="card mb-4">
                            <div class="card-header">
                                Seller: <strong class="mr-1">RareItemShop</strong>
                                <i class="fas fa-chess-queen"></i>
                            </div>
                            <div class="card-body d-flex justify-content-between">
                                <div class="media d-flex flex-column align-self-center">
                                    <img class="mb-4" v-bind:src="item.item.imgURL">
                                    <h5>{{ item.item.name }}</h5>
                                    <div class="d-flex justify-content-start align-items-center">
                                        <div class="text-danger mr-3">
                                            {{ item.subTotal }}
                                        </div>
                                        <input class="form-control col-2" type="number" v-bind:value="item.qty" disabled>
                                    </div>
                                </div>
                                <div class="align-self-start" id="div-cart-btn">
                                    <a v-on:click="removeItemFromCart(item.item._id)" role="button" class="btn btn-dark">
                                        <i class="fas fa-trash text-white"></i>
                                    </a>
                                </div>
                            </div>
                            <button class="card-text btn btn-link ml-auto">
                                <small class="h6">Send notes to seller</small>
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-4 mt-4 d-flex flex-column">
                        <div class="h5 mb-3">
                            Order Summary
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <p>Total Price</p>
                                    <p>{{ totalPrice }}</p>
                                </div>
                                <hr>
                                <button @click="checkout" class="btn-block btn btn-danger">Checkout</button>
                                <hr>
                                <div class="d-flex align-items-center">
                                    <i class="fas fa-cart-arrow-down mr-3"></i>
                                    <div class="">Use promo code or coupon</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
});