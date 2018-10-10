//test vue
let vm = new Vue({
    el: '#container',
    data: {
        categories: [],
        products: [],
        user: {},
        cart: {},
    },
    created: function () {
        axios.get('http://localhost:3000/products', {})
            .then(products => {
                this.products = products.data
            })
            .catch(err => {
                console.log(err)
            })

        axios.get('http://localhost:3000/categories', {})
            .then(categories => {
                this.categories = categories.data
            })
            .catch(err => {
                console.log(err)
            })


        axios.get(`http://localhost:3000/users/${localStorage.getItem('token')}`, {})
            .then(user => {
                this.user = user.data
                this.cart = user.data.cart
            })
            .catch(err => {
                console.log(err)
            })

    },
    methods: {
        saveCart : function(){
            
        },

        addToCart: function (value) {
            let index = this.cart.cartcontent.findIndex(cartObj=>{
                return cartObj.Product.id == value._id 
            })
            if (index == -1 ) {
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
            this.saveCart()
        },

        deleteFromCart: function (productId) {
            let index = this.cart.cartcontent.findIndex(cartItem=>{
                return cartItem.Product.id == productId 
            })
            this.cart.cartcontent.splice(index, 1)
        },
        totalCart: function () {

        },
        totalPrice: function (amount, price) {

        },

        goCheckout: function () {

        }
    },
    watch: {

        cart : function(){
            
        }

    },

})