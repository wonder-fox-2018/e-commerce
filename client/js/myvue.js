var app = new Vue({
    el: '#app',
    data: {
        // items: [],
        carts: [],
        cartBadge : 0
    },
    created: function () {
        // this.getAllItems()
    },
    methods: {
        // getAllItems: function () {
        //     let self = this
        //     axios({
        //             method: "GET",
        //             url: 'http://localhost:3000/items'
        //         })
        //         .then(function (result) {
        //             self.items = result.data.items
        //         })
        // },
        // addItemToCart: function (index) {
        //     this.cartBadge = this.cartBadge + 1
        //     let isNew = true

        //     let item = {
        //         itemId    : this.items[index]._id,
        //         name      : this.items[index].name,
        //         price     : this.items[index].price,
        //         qty : 1,
        //         totalPrice : Number(this.items[index].price)
        //     }

        //     //check if item already exist in cart
        //     for(let i = 0; i < this.carts.length; i++){
        //         if(this.carts[i].itemId == item.itemId){
        //             //if exist add one to qty and sum totalPrice
        //             this.carts[i].qty += 1
        //             this.carts[i].totalPrice += item.totalPrice
        //             isNew = false  
        //         }
        //     }

        //     //add item to cart
        //     if(isNew){
        //         this.carts.push(item)
        //         this.subTotalPrice += item.totalPrice
        //     }
        // }
    }
})