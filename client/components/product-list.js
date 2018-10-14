Vue.component('product-list', {
    template:
    `
    <div>
        <div class="row" id='products' v-if='products.length > 0'>
            <div class="containerku col-sm-6 col-md-5 col-lg-3" v-for='product in products'>
                <div class="cardku">
                    <div class="card-head">
                        <img :src="product.image" alt="Shoe" class="product-img">
                        <div class="product-detail">
                            <h2>{{ product.name }}</h2>
                            <p>{{ product.description | descSlice }}</p>
                        </div>
                        <span class="back-text">
                            {{ product.backtext }}
                        </span>
                    </div>
                    <div class="card-bodyku">
                        <div class="product-desc">
                            <span class="product-title">
                                <b>{{ product.name }}</b>
                            </span>
                            <span class="product-caption">
                                {{ product.category.name }}
                            </span>
                            <span class="product-rating">
                                <i class="fa fa-star gold" v-for='i in Math.floor(product.rating)'></i>
                                <i class="fa fa-star-half gold" v-for='i in Math.round(product.rating - Math.floor(product.rating))'></i>
                                <i class="fa fa-star" v-for='i in (5 - (Math.floor(product.rating) + Math.round(product.rating - Math.floor(product.rating))))'></i>
                            </span>
                        </div><br>
                        <div class="product-properties">
                            <span class="product-price">
                                IDR<b>{{ product.price | priceSlice }}</b>
                            </span>
                        </div>
                        <div class='atclogo' title="Add to Cart">
                            <span>
                                <i class="fas fa-cart-plus" v-on:click='addToCart(product)'></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="row">
            <div class="col text-center" style="margin-top: 5vh">
                <i class="fas fa-archive mb-4" style="font-size: 200px; height: 200px; width: 200px"></i>
                <h3 class="mt-4">Sorry, but we can't find anything like that</h3>
            </div>
        </div>
    </div>
    `,
    props: ['products'],
    methods: {
        addToCart(product) {
            app.itemcount ++
            let i = app.items.indexOf(product.name)
            if (i === -1) {
                app.items.push(product.name)
                app.cart.push({
                    name: product.name,
                    price: product.price,
                    count: 1,
                    total: product.price
                })
                app.totalsum += product.price

                app.itemsReal.push(product._id)
                app.counts.push(1)
            } else {
                app.cart[i].count ++
                app.cart[i].total += product.price
                app.totalsum += product.price
                app.counts[i] ++
            }
            
            localStorage.setItem('items', JSON.stringify(app.items))
            localStorage.setItem('itemsID', JSON.stringify(app.itemsReal))
            localStorage.setItem('cart', JSON.stringify(app.cart))
            localStorage.setItem('totalsum', app.totalsum)

            this.$emit('updatecart')
        }
    },
    filters: {
        priceSlice(value) {
            let str = String(value)
            if (str.length > 7) {
                return str.slice(0, str.length-6) + 'M'
            } else if (str.length > 3) {
                return str.slice(0, str.length-3) + 'K'
            } else {
                return str
            }
        },
        descSlice(value) {
            let i = value.length / 24
            let j = Math.floor(i)
            if (i <= 1) {
                return value
            } else {
                let str = []
                let rest = value
                for (; j >= 0; j--) {
                    str.push(rest.slice(0, 24))
                    rest = rest.slice(24)
                }
                return str.join(' ')
            }
        }
    }
})