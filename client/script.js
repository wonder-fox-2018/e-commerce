let app = new Vue({
    el:'#app',
    data:{
        user : {
            id : 1,
            fname : 'Fransiskus',
            lname : 'Arnoldy',
            cart : [],
            count : 0
        },
        card : [{
            id : 1,
            title : 'Wing Zero',
            price : 350000,
            total : 1,
            img : "https://images-na.ssl-images-amazon.com/images/I/91uA4x0IfzL._SX425_.jpg",
            description : `Some quick example text to build on the card title and make up the bulk of the
            card's
            content.`
        },{
            id : 2,
            title : 'Red Sinanju',
            price : 450000,
            total : 1,
            img : "https://images-na.ssl-images-amazon.com/images/I/91uA4x0IfzL._SX425_.jpg",
            description : `Some quick example text to build on the card title and make up the bulk of the
            card's
            content.`
        },{
            id : 3,
            title : 'Astry Red Frame',
            price : 250000,
            total : 1,
            img : "https://images-na.ssl-images-amazon.com/images/I/91uA4x0IfzL._SX425_.jpg",
            description : `Some quick example text to build on the card title and make up the bulk of the
            card's
            content.`
        },{
            id : 4,
            title : 'Exia',
            price : 200000,
            total : 1,
            img : "https://images-na.ssl-images-amazon.com/images/I/91uA4x0IfzL._SX425_.jpg",
            description : `Some quick example text to build on the card title and make up the bulk of the
            card's
            content.`
        }]
    },
    methods :{
        cart : function(buy){
            let product = this.user.cart
            if(product.length > 0){
                for(let i = 0; i < product.length;i++){
                    if(product[i].id !== buy.id){
                        product.push(buy)
                    }
                }
            }
            else{
                this.user.cart.push(buy)
            }

            this.user.cart = product
        }
    }
})