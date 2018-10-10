let app = new Vue({
    el:'#app',
    data:{
        user : {
            id : 1,
            fname : 'Fransiskus',
            lname : 'Arnoldy',
            cart : [],
            count : 0, 
            price_count : 0
        },
        card : [{
            id : 1,
            title : 'Wing Zero',
            price : 895000,
            total : 1,
            img : "https://images-na.ssl-images-amazon.com/images/I/71muGqdVxnL._SL1421_.jpg",
            description : `Some quick example text to build on the card title and make up the bulk of the
            card's
            content.`,
            catergory : 'mg'
        },{
            id : 2,
            title : 'Red Sinanju',
            price : 1300000,
            total : 1,
            img : "https://images-na.ssl-images-amazon.com/images/I/51-RTTuzRHL._SL500_AC_SS350_.jpg",
            description : `Some quick example text to build on the card title and make up the bulk of the
            card's
            content.`,
            catergory : 'rg'
        },{
            id : 3,
            title : 'Astry Red Frame',
            price : 489000,
            total : 1,
            img : "https://images.amain.com/images/large/ban/ban200634.jpg?width=475",
            description : `Some quick example text to build on the card title and make up the bulk of the
            card's
            content.`,
            catergory : 'mg'

        },{
            id : 4,
            title : 'Exia',
            price : 2500000,
            total : 1,
            img : "https://da.lnwfile.com/_/da/_raw/e1/0z/zp.jpg",
            description : `Some quick example text to build on the card title and make up the bulk of the
            card's
            content.`,
            catergory : 'pg'
        }]
    },
    created: function(){
        this.allProduct()
    },
    methods :{
        allProduct: function () {
            let temp = []
            for(let i = 0; i < this.card.length; i++) {
                    temp.push(this.card[i])
            }
            this.card = temp
        },
        cart : function(buy){
            this.user.price_count = this.user.price_count + buy.price
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
        },
        category : function(value){

            let temp = []
            console.log('not all')
            for(let i = 0; i < this.card.length; i++) {
                // console.log(this.card[i].catergory)
                if(this.card[i].catergory == value){
                    temp.push(this.card[i])
                }
            }
            this.card = temp
        }
    }
})