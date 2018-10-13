Vue.component('cart-component', {
    template : `
    <div id="cartContainer" style="display:none;">
                <div class="wrap cf">

                    <div class="heading cf">
                        <h1>My Cart</h1>
                        <a href="#article"  class="continue">Continue Shopping</a>
                    </div>
                    <div class="cart">
                        <ul class="cartWrap">
                            <li v-for="(item, index) in cart.cartcontent" class="items even">

                                <div class="infoWrap">
                                    <div class="cartSection">
                                        <img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" class="itemImg" />
                                        <p class="itemNumber"> {{item.Product.id}} </p>
                                        <h3> {{ item.Product.productName}} </h3>

                                        <p> <input type="text" class="qty" v-bind:placeholder="item.qty" /> x
                                            {{item.Product.price}}</p>

                                        <p class="stockStatus"> In Stock</p>
                                    </div>


                                    <div class="prodTotal cartSection">
                                        <p> {{ item.qty * item.Product.price }} </p>
                                    </div>
                                    <div class="cartSection removeWrap">
                                        <a href="#" v-on:click="deleteFromCart(item.Product.id)" class="remove">x</a>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>

                    <div class="subtotal cf">
                        <ul>
                            <li class="totalRow"><span class="label">Subtotal</span><span class="value">
                                    {{cart.subTotal}}
                                </span></li>

                            <li class="totalRow"><span class="label">Shipping</span><span class="value">
                                    {{cart.shipping}}
                                </span></li>

                            <li class="totalRow"><span class="label">Tax</span><span class="value"> {{cart.tax}} </span></li>
                            <li class="totalRow final"><span class="label">Total</span><span class="value">
                                    {{cart.total}}
                                </span></li>
                            <li class="totalRow"><a href="#" class="btn continue">Checkout</a></li>
                        </ul>
                    </div>

                </div>
            </div>
    
    `,
    props : {
        cart : {
            default: function () {
                return { message: 'hello' }
              },
            type : Object
        }
    },
    methods : {
        deleteFromCart: function (productId) {
            let index = this.cart.cartcontent.findIndex(cartItem => {
                return cartItem.Product.id == productId
            })
            this.cart.cartcontent.splice(index, 1)
        },
    }
  
})