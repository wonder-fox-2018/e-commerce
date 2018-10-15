Vue.component('navbar-component',{
    props : ['is-login','get-token', 'user', 'getuseronline','refresh' ],
    methods : {
        signout : function(){
            localStorage.removeItem('token')
            this.getToken()
            this.refresh()
            this.getuseronline()
            
        }
    },
    template : `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
        <a class="navbar-brand" href="#">Start Bootstrap</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
            
            <li class="nav-item" v-if=!isLogin>
                <a class="nav-link" href="#" data-toggle="modal" data-target="#modalRegister">Register</a>
            </li>
            <li class="nav-item" v-if="!isLogin">
                <a class="nav-link" href="#" data-toggle="modal" data-target="#modalLogin">Login</a>
            </li>
            <li class="nav-item" v-if=isLogin>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalCart">
                Cart <span class="badge badge-light">{{user.count}}</span>
            </button>
            </li>
            <li class="nav-item" v-if=isLogin>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalCheckout">
                checkout
            </button>
            </li>
            <li class="nav-item" v-if="isLogin">
                <a class="nav-link" href="#" @click="signout" >Logout</a>
            </li>
            </ul>
        </div>
        </div>
    </nav>
    `
})
Vue.component('sidebar-component',{
    props : ['is-login', 'user', 'role', 'search'],
    data : function(){
        return {
            keyword : ''
        }
    },
    methods : {
        searchproduct : function(){
            console.log(this.keyword)
            axios({
                method : 'GET',
                url : `http://localhost:3000/products/search/${this.keyword}`,
                headers : {
                    access_token : localStorage.getItem('token')
                }
            })
            .then(user => {
                this.user.cart = user.data
                console.log(user)

            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    template : `
    <div class="col-lg-3">
        <div class="list-group" v-if=isLogin>
            <h4 class="my-4">{{user.name}}</h4>
            <a href="#" class="list-group-item" v-if=role data-toggle='modal' data-target='#modalAddProduct'>add Product</a>
            <input type="text" class="form-control" v-model="this.keyword">
            <button type="button" @click="searchproduct" class="btn btn-primary">
            search</button>
        </div>
        <div class="list-group">
        </div>
    </div>
    `
})

Vue.component('carousel-component',{
    template : `
    <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
        <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
        <div class="carousel-item active">
            <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide">
        </div>
        <div class="carousel-item">
            <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="Second slide">
        </div>
        <div class="carousel-item">
            <img class="d-block img-fluid" src="http://placehold.it/900x350" alt="Third slide">
        </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
        </a>
    </div>
    `
})
Vue.component('item-list', {
    props : ['list', 'user', 'role'],
    methods : {
        toCart : function(list){
            this.user.price_count = this.user.price_count + list.price
            this.user.count=this.user.count+1
            let status=0
            if(this.user.cart.length > 0){
                for(let i = 0; i < this.user.cart.length;i++){
                    if(this.user.cart[i]._id === list._id){
                        this.user.cart[i].total=this.user.cart[i].total+1
                        status=1
                        break
                    }
                }
            }
            else{
                this.user.cart.push(list)
                status = 1
            }

            if(status==0){
                this.user.cart.push(list)
            }
        },
        edit :function(list){
            console.log(list)
        }
    },
    template : `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
                <a href="#"><img class="card-img-top" :src="list.img" alt=""></a>
                <div class="card-body">
                    <h4 class="card-title">
                    <a href="#">{{list.title}}</a>
                    </h4>
                    <h5>{{list.price}}</h5>
                    <p class="card-text">{{list.description}}</p>
                </div>
                <div class="card-footer">
                    <button @click="toCart(list)">BUY</button>
                    <button v-if=role @click="edit(list)">edit</button>
                </div>
            </div>
        </div>
    `
})