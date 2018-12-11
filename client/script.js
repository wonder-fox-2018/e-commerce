let app = new Vue({
    el:'#app',
    data:{
        isLogin : '',
        role : '',
        register : {
            name : '',
            email : '',
            password : '',
            address : '',
            city : '',
            state : '',
            zip : '',
        },
        checkout : [],
        user : {
            id : '',
            name : '',
            cart : [],
            count : 0, 
            price_count : 0
        },
        card : []
    },
    created: function(){
        this.getToken()
        this.allProduct()
        this.getUserOnline()
        this.getCheckOutList()
    },
    methods :{
        getUserOnline : function(){
            let token = localStorage.getItem('token')
            if(token){
                axios({
                    method : 'GET',
                    url : 'http://localhost:3000/users/profile',
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(user => {
                    console.log(user)
                    this.user.name =  user.data.name
                    this.user.id = user.data._id
                    this.id = user.data._id
                    if(user.data.role === 'admin'){
                        this.role = true
                    }
                    else{
                        this.role = false
                    }
                    this.user.cart = []
                    this.user.count = 0
                    this.user.price_count = 0 
                    this.checkout = []
                    this.getCheckOutList()
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        getCheckOutList : function(){
            let token = localStorage.getItem('token')
            if(token){
                axios({
                    method : 'GET',
                    url : `http://localhost:3000/users/checkout`,
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(checkout => {
                    console.log(checkout)
                    checkout.data.forEach(list => {
                        this.checkout.push(list)
                    })
    
                    // console.log(this.checkout)
                })
                .catch(err => {
                    console.log(err)
                })
            }
            
        },
        getToken : function(){
            let token = localStorage.getItem('token')
            if(token){
                this.isLogin = true
            }
            else{
                this.isLogin = false
            }
        },
        allProduct: function () {
            axios({
                method : 'GET',
                url : 'http://localhost:3000/products/showAll'
            })
            .then(dataProduct => {
                this.card = []
                let products = dataProduct.data.products
                console.log(products)
                products.forEach(list => {
                    this.card.push(list)
                })
            })
            .catch(err => {
                console.log(err)
            })
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
            // console.log('not all')
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