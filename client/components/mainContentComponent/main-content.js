Vue.component('main-content', {
    props : ['islogin','isadmin'],
    template: `
    <div class="row">
        <div class="col-md-4" v-for="(item, index) in items">
            <figure class="card card-product">
                <div class="img-wrap"><img v-bind:src="item.img"></div>
                <!-- {{item.img}} -->
                <figcaption class="info-wrap">
                    <h4 class="title">{{ item.name }}</h4>
                    <p class="desc" v-if="isadmin === false">{{ item.description }}</p>
                    <p class="desc"><b>Category :</b> {{ item.category.name }}</p>
                    <div v-if="isadmin === true">
                        <div class="rating-wrap">
                            <center>
                            <b>Administrator Menu</b>
                            <br>
                            <a class="btn btn-sm btn-primary"> Edit </a>
                            <a class="btn btn-sm btn-primary"> Delete </a>
                            </center>
                        </div>
                    </div>
                </figcaption>
                <div class="bottom-wrap">
                    <a class="btn btn-sm btn-primary float-right" v-if="islogin === true && isadmin === false" v-on:click="addItemToCart(index)">Add to Cart</a>
                    <div class="price-wrap h5">
                        <span class="price-new">$ {{ item.price }}</span>
                        <!-- <del class="price-old">$1980</del> -->
                    </div> <!-- price-wrap.// -->
                </div> <!-- bottom-wrap.// -->
            </figure>
        </div> <!-- col // -->
    </div>
    `,
    data: function () {
        return {
            items: [],
            carts : [],
            cartsBadge : 0
        }
    },
    created: function () {
        this.getAllItems()
    },
    watch : {
        islogin : function(val){
            this.getAllItems()
        }
    }
    ,
    methods: {
        getAllItems: function () {
            axios({
                    method: 'GET',
                    url: 'http://localhost:3000/items/'
                })
                .then(result => {
                    this.items = result.data.items
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addItemToCart: function (index) {
            this.cartsBadge = this.cartsBadge + 1
            let isNew = true

            let item = {
                itemId    : this.items[index]._id,
                name      : this.items[index].name,
                price     : this.items[index].price,
                qty : 1,
                totalPrice : Number(this.items[index].price)
            }

            //check if item already exist in cart
            for(let i = 0; i < this.carts.length; i++){
                if(this.carts[i].itemId == item.itemId){
                    //if exist add one to qty and sum totalPrice
                    this.carts[i].qty += 1
                    this.carts[i].totalPrice += item.totalPrice
                    isNew = false  
                }
            }

            //add item to cart
            if(isNew){
                this.carts.push(item)
                this.subTotalPrice += item.totalPrice
            }

            this.$emit('carts-data',this.carts)
            this.$emit('carts-badge',this.cartsBadge)
        }
    }
})