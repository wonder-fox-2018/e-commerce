Vue.component('main-content', {
    template: `
    <div class="row">
    {{carts}}
        <div class="col-md-4" v-for="(item, index) in items">
            <figure class="card card-product">
                <div class="img-wrap"><img v-bind:src="item.img"></div>
                <!-- {{item.img}} -->
                <figcaption class="info-wrap">
                    <h4 class="title">{{ item.name }}</h4>
                    <p class="desc">{{ item.description }}</p>
                    <!-- <p class="desc">{{ item.category.name }}</p> -->
                    <div class="rating-wrap">
                        <div class="label-rating">132 reviews</div>
                        <div class="label-rating">154 orders </div>
                    </div> <!-- rating-wrap.// -->
                </figcaption>
                <div class="bottom-wrap">
                    <a class="btn btn-sm btn-primary float-right" v-on:click="addItemToCart(index)">Add to Cart</a>
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
            carts : []
        }
    },
    created: function () {
        this.getAllItems()
    },

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
            this.cartBadge = this.cartBadge + 1
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
        }
    }
})