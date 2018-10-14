//test vue
let vm = new Vue({
    el: '#app',
    data: {
        responAdd: ''
    },
    props: {
        user: {
            default: function () {
                return {
                    username: 'USER',
                    role : 'customer'
                }
            },
            type: Object
        },
        categories: {
            default: function () {
                return [{
                    message: 'hello'
                }]
            },
            type: Array
        },
        cart: {
            default: function () {
                return {

                    message: 'hello'
                }
            },
            type: Object
        },
        products: {
            default: function () {
                return [{
                    message: 'hello'
                }]
            },
            type: Array
        }
    },
    created: function () {
        this.getProducts()

        if(localStorage.getItem('token')){
            axios.get(`http://localhost:3000/users/${localStorage.getItem('token')}`, {})
                .then(user => {
                    this.user = user.data
                    this.cart = user.data.cart
                })
                .catch(err => {
                    console.log('no signed in user')
                })

        }

    },
    mounted() {
       
    },
    methods: {
        responAddCategory: function (val) {
            this.responAdd = val
            this.categories.push(val)
        },
        responAddProduct: function (val) {
            this.responAdd = val
            this.getProducts()
        },
        getProducts() {
            axios.get('http://localhost:3000/products', {})
                .then(products => {
                    this.products = products.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        showCategories: function (categoriess) {
            this.categories = categoriess
        },
        addToCart: function (value) {

            let index = this.cart.cartcontent.findIndex(cartObj => {
                return cartObj.Product.id == value._id
            })
            if (index == -1) {
                this.cart.cartcontent.push({
                    Product: {
                        id: value._id,
                        productName: value.productName,
                        productDesc: value.productDesc,
                        price: value.price,
                        rating: value.rating
                    },
                    qty: 1
                })
            } else {
                this.cart.cartcontent[index].qty += 1
            }

        },
        deleteFromCart: function (productId) {
            let index = this.cart.cartcontent.findIndex(cartItem => {
                return cartItem.Product.id == productId
            })
            this.cart.cartcontent.splice(index, 1)
        },

    }

})