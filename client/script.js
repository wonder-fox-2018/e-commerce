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
            this.user.count=this.user.count+1
            let status=0
            if(this.user.cart.length > 0){
                for(let i = 0; i < this.user.cart.length;i++){
                    if(this.user.cart[i].id === buy.id){
                        this.user.cart[i].total=this.user.cart[i].total+1
                        status=1
                        break
                    }
                }
            }
            else{
                this.user.cart.push(buy)
                status = 1
            }

            if(status==0){
                this.user.cart.push(buy)
            }
        }
    }
})