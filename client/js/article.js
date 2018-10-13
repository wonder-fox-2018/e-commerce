Vue.component('article-component', {
    template: `
    <article>
                <div v-for="(product, i) in products" :key="product.id" class="productCard">
                    <div class="box-wrapper" v-bind:id="product._id">
                        <img v-bind:src="'https://picsum.photos/401/20'+product.rating+'/?random'" alt="rhcp" />
                        <div class="box-content">
                            <a class="buy" v-on:click="$emit('addtocart',product)" href="javascript:void(0)"><span><i class="fa fa-cart-plus"></i></span></a>
                            <div class="title"> {{product.productName}} </div>
                            <div class="desc"> {{product.productDesc}} </div>
                            <span class="price">Rp {{product.price}}</span>
                            <div class="footer">
                                <ul>
                                    <li v-for="n in product.rating" class="fa fa-star"></li>
                                </ul>
                            </div>
                        </div>
                        <div class="success"></div>
                    </div>
                </div>
            </article>`
    ,
    data : function(){
        return {
            products :[],

        }
    },
    created() {
        
        axios.get('http://localhost:3000/products', {})
        .then(products => {
            this.products = products.data
        })
        .catch(err => {
            console.log(err)
        })
        
    },
    methods : {

    }


})
    