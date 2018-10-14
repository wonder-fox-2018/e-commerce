Vue.component('side-bar', {
    template: 
    `
    <div>
        <div id="sidebar" v-on:mouseover='menuHover()' v-on:mouseleave='menuLeave()'>
            <ul class="mt-4">
                <li v-on:mouseover='menuHover()' v-on:mouseleave='menuLeave()' v-on:click='getProducts'><i class="fas fa-archive mx-4"></i><span class="menutext ml-2 mt-1">Home</span></li>
                <li v-on:mouseover='menuHover()' v-on:mouseleave='menuLeave()'><i class="fas fa-search mx-4"></i><input class="menutext ml-2 mt-1 search" type="text" placeholder="Search" v-model='keyword' v-on:keyup='search()'></li>
                <li v-on:mouseover='menuHover()' v-on:mouseleave='menuLeave()' v-for='category in categories' v-on:click='showByC(category.name)'><i v-bind:class="category.icon" class="mx-4" ></i><span class="menutext ml-2 mt-1">{{ category.name }}</span></li>
            </ul>
            <ul class="mt-4" id='bottommenu'>
                <li v-if='isadmin' v-on:mouseover='menuHover()' v-on:mouseleave='menuLeave()' v-on:click="showAP()"><i class="fab fa-asymmetrik mx-4"></i><span class="menutext ml-2 mt-1">Admin Page</span></li>
                <li v-if='islogin' v-on:mouseover='menuHover()' v-on:mouseleave='menuLeave()' v-on:click="showPH()"><i class="fas fa-shoe-prints mx-4"></i><span class="menutext ml-2 mt-1">Purchase History</span></li>
                <li v-if='!islogin' v-on:mouseover='menuHover()' v-on:mouseleave='menuLeave()' v-on:click="signModal()"><i class="fas fa-sign-in-alt mx-4"></i><span class="menutext ml-2 mt-1">Sign In / Register</span></li>
                <li v-else v-on:mouseover='menuHover()' v-on:mouseleave='menuLeave()' v-on:click="signout()"><i class="fas fa-sign-out-alt mx-4"></i><span class="menutext ml-2 mt-1">Sign Out</span></li>
                <li v-on:mouseover='menuHover()' v-on:mouseleave='menuLeave()' v-on:click="cartModal()"><i class="fas fa-shopping-cart mx-4"></i><span class="menutext ml-2 mt-1">My Cart ( {{ itemcount }} )</span></li>
                <li class='itemcount' v-if='itemcount > 0 && menuhover === false'>{{ itemcount }}</li>
                <li class='itemcount' v-else style="color: transparent">.</li>
            </ul>
        </div>
        <div id='signmodal' v-if='openSignModal'>
            <div id='redhalf' v-bind:style='{height: redhalfHeight, top: redhalfTop}'>
                <div id='signinform' v-if='isSigningIn'>
                    <input type="text" id='email' v-bind:style='{color: emailColor}' v-model='email' v-on:keyup='validateEmail()' placeholder="Email" v-on:keyup.enter='signin()'><br>
                    <input type="password" id='password' v-bind:style='{color: passwordColor}' v-model='password' v-on:keyup='validatePassword()' placeholder="Password" v-on:keyup.enter='signin()'>
                    <div id='notice' v-if='notice.length > 0' class='text-center pt-3' style="color:white; font-size: 12px; height: 3vh;">{{ notice }}</div>
                    <div id='notice' v-else style="color:transparent; height: 3vh;">.</div>
                </div>
                <div id='signupform' v-else>
                    <input type="text" id='newname' v-model='newname' placeholder="Name" v-on:keyup.enter='signup()'><br>
                    <input type="text" id='newemail' v-model='newemail' v-bind:style='{color: newEmailColor}' v-on:keyup='validateNewEmail()' placeholder="Email" v-on:keyup.enter='signup()'><br>
                    <input type="password" id='newpassword' v-model='newpassword' v-bind:style='{color: newPasswordColor}' v-on:keyup='validateNewPassword()' placeholder="Password (min. 6 characters)" v-on:keyup.enter='signup()'>
                    <div id='notice' v-if='notice.length > 0' class='text-center pt-3' style="color:white; font-size: 12px; height: 3vh;">{{ notice }}</div>
                    <div id='notice' v-else style="color:transparent; height: 3vh;">.</div>
                </div>
            </div>
            <div id='whitehalf'>
                <button id='signin-btn' v-on:click='signin()'>SIGN IN</button>
                <button id='close-btn' v-on:click='signModal()'><i class="far fa-times-circle"></i></button>
                <button id='signup-btn' v-on:click='signup()'>SIGN UP</button>
            </div>
        </div>
        <div id='cartmodal' v-if='openCartModal'>
            <div id='cartcontent'>
                <div class="row mb-4" v-for="item in cart">
                    <div class="col-xl-4">
                        <div class="row">
                            <div class="col-12 text-center text-xl-left"><strong>{{ item.name }}</strong></div>
                        </div>
                        <div class="row">
                            <div class="col-12 text-center text-xl-left">{{ item.count }} x Rp{{ item.price | currencySlice }}</div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="row">
                            <div class="col-12 text-center text-xl-right pt-2 pt-xl-4 pr-xl-4 mb-4" style="height:20px"><strong>Rp{{ item.total | currencySlice }}</strong></div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class='row no-gutters'>
                            <div class="col-5">
                                <button class="btn cartBtn" title="Remove" v-on:click="removeFromCart(item)" style='width:100%'>-</button>
                            </div>
                            <div class="col-2"></div>
                            <div class="col-5">
                                <button class="btn cartBtn" title="Add" v-on:click="addFromCart(item)" style='width:100%'>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="width: 100%" v-if='totalsum > 0 && islogin'>
                    <div class="col-6 text-left mb-4"><strong>Total:</strong></div>
                    <div class="col-6 text-right mb-4" v-if='discount > 0'><strong><span class='discount' style='padding-right: 10px'>Rp{{ totalsum * (100 - discount) / 100 | currencySlice }}</span><span style='text-decoration: line-through'>Rp{{ totalsum | currencySlice}}</span></strong></div>
                    <div class="col-6 text-right mb-4" v-else><strong>Rp{{ totalsum | currencySlice}}</strong></div>
                    <div class="col-6 text-left mb-4 py-1"><strong>Coupon:</strong></div>
                    <div class="col-6 text-right mb-4"><input type='text' class='px-2 py-1 mr-4 text-right' v-model='coupon' @keyup='checkCoupon'></div>
                    <div class="col-6 text-center">
                        <button v-on:click='cartModal()' class="btn cartBtn">Continue Shopping</button>
                    </div>
                    <div class="col-6 text-center">
                        <button id='checkOutBtn' v-on:click="checkOut()" class="btn cartBtn">Check Out</button>
                    </div>
                </div>
                <div class="row" style="width: 100%" v-else-if='totalsum > 0'>
                    <div class="col-6 text-left mb-2">Total:</div>
                    <div class="col-6 text-right mb-2"><strong>Rp{{ totalsum | currencySlice}}</strong></div>
                    <div class="col-12 text-center mb-2">You should sign in to check out</div>
                    <div class="col-12 text-center">
                        <button v-on:click='cartModal()' class="btn cartBtn">Continue Shopping</button>
                    </div>
                </div>
                <div class="row" style="width: 100%" v-else>
                    <div class="col-12 text-center mb-2" v-if='!afterCheckOut'>You haven't add anything to your cart</div>
                    <div class="col-12 text-center mb-2" v-else>Thank you very much,<br>your purchase has been processed</div>
                    <div class="col-12 text-center">
                        <button v-on:click='cartModal()' class="btn cartBtn">Continue Shopping</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    props: ['categories', 'isadmin', 'islogin', 'items', 'cart', 'itemcount', 'totalsum', 'itemsreal', 'counts'],
    data() {
        return {
            menuhover: false,
            openSignModal: false,
            openCartModal: false,
            emailColor: 'rgba(0, 0, 0, 0.5)',
            passwordColor: 'rgba(0, 0, 0, 0.5)',
            newEmailColor: 'rgba(0, 0, 0, 0.5)',
            newPasswordColor: 'rgba(0, 0, 0, 0.5)',
            redhalfHeight: '25vh',
            redhalfTop: '25vh',
            email: '',
            password: '',
            newname: '',
            newemail: '',
            newpassword: '',
            isSigningIn: true,
            notice: '',
            keyword: '',
            afterCheckOut: false,
            coupon: '',
            discount: 0
        }   
    },
    methods: {
        menuHover() {
            this.menuhover = true
        },
        menuLeave() {
            this.menuhover = false
        },
        getProducts() {
            this.$emit('getproducts')
        },
        search() {
            axios({
                url: `http://localhost:3000/products/search?keyword=${this.keyword}`
            })
            .then(data => {
                this.$emit('products', data.data)
                this.$emit('opentab', 'all')
            })
            .catch(err => {
                console.log("Not found")
            })
        },
        showByC(category) {
            axios({
                url: `http://localhost:3000/products/${category}`
            })
            .then(data => {
                this.$emit('products', data.data)
                this.$emit('opentab', category)
            })
            .catch(err => {
                console.log(err)
            })
        },
        showAP() {
            this.$emit('getproducts', true)
            this.$emit('opentab', 'ap')
        },
        showPH() {
            this.$emit('showph')
        },
        signModal() {
            this.$emit('togglebackdrop')
            this.openSignModal = !this.openSignModal
            this.email = ''
            this.newemail = ''
            this.password = ''
            this.newpassword = ''
            this.name = ''
            this.notice = ''
        },
        signin() {
            if (!this.isSigningIn) {
                this.redhalfHeight = '25vh'
                this.redhalfTop = '25vh'
                this.isSigningIn = true
                this.email = this.newemail
                this.password = this.newpassword
                this.newemail = ''
                this.newpassword = ''
                this.validateEmail()
                this.validatePassword()
                this.notice = ''
            } else {
                axios({
                    url: 'http://localhost:3000/users/login',
                    method: 'post',
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                .then(data => {
                    localStorage.setItem('token', data.data.token)
                    this.$emit('authuser', data.data.id)
                    this.$emit('isadmin', data.data.isAdmin)
                    this.$emit('islogin', true)
                    this.signModal()
                    this.$emit('comparecarts')
                })
                .catch(err => {
                    this.notice = err.response.data.message
                })
            }
        },
        signout() {
            this.$emit('authuser', '')
            this.$emit('isadmin', false)
            this.$emit('islogin', false)
            this.$emit('emptycart')
            localStorage.clear()
            this.getProducts()
        },
        signup() {
            if (this.isSigningIn) {
                this.redhalfHeight = '35vh'
                this.redhalfTop = '15vh'
                this.isSigningIn = false
                this.newemail = this.email
                this.newpassword = this.password
                this.email = ''
                this.password = ''
                this.validateNewEmail()
                this.validateNewPassword()
                this.notice = ''
            } else {
                axios({
                    url: 'http://localhost:3000/users/register',
                    method: 'post',
                    data: {
                        name: this.newname,
                        email: this.newemail,
                        password: this.newpassword
                    }
                })
                .then(data => {
                    this.notice = data.data.message
                    this.redhalfHeight = '25vh'
                    this.redhalfTop = '25vh'
                    this.isSigningIn = true
                    this.email = this.newemail
                    this.newname = ''
                    this.newemail = ''
                    this.newpassword = ''
                    this.validateEmail()
                })
                .catch(err => {
                    this.notice = err.response.data.message
                })
            }
        },
        validateEmail() {
            if (/\S+@\S+\.\S+/.test(this.email) === true) {
                this.emailColor = '#fa782e'
            } else {
                this.emailColor = 'rgba(0, 0, 0, 0.5)'
            }
        },
        validateNewEmail() {
            if (/\S+@\S+\.\S+/.test(this.newemail) === true) {
                this.newEmailColor = '#fa782e'
            } else {
                this.newEmailColor = 'rgba(0, 0, 0, 0.5)'
            }
        },
        validatePassword() {
            if (this.password.length > 5) {
                this.passwordColor = '#fa782e'
            } else {
                this.passwordColor = 'rgba(0, 0, 0, 0.5)'
            }
        },
        validateNewPassword() {
            if (this.newpassword.length > 5) {
                this.newPasswordColor = '#fa782e'
            } else {
                this.newPasswordColor = 'rgba(0, 0, 0, 0.5)'
            }
        },
        cartModal() {
            this.openCartModal = !this.openCartModal
            this.$emit('togglebackdrop')
            this.afterCheckOut = false
        },
        checkOut() {
            axios({
                url: 'http://localhost:3000/users/checkout',
                method: 'patch',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    coupon: this.coupon
                }
            })
            .then(() => {
                this.coupon = ''
                this.$emit('emptycart')
                this.afterCheckOut = true

                this.updateCart()

                localStorage.removeItem('items')
                localStorage.removeItem('itemsID')
                localStorage.removeItem('cart')
                localStorage.removeItem('totalsum')
            })
            .catch(err => {
                console.log(err)
            })
        },
        removeFromCart(item) {
            let i = app.items.indexOf(item.name)
            app.cart[i].count --
            app.cart[i].total -= item.price
            app.totalsum -= item.price
            app.counts[i] --
            
            if (app.cart[i].count === 0) {
                app.items.splice(i, 1)
                app.cart.splice(i, 1)
                app.itemsreal.splice(i, 1)
            }
            
            app.itemcount --
            this.updateCart()
            
            localStorage.setItem('items', JSON.stringify(app.items))
            localStorage.setItem('itemsID', JSON.stringify(app.itemsreal))
            localStorage.setItem('cart', JSON.stringify(app.cart))
            localStorage.setItem('totalsum', app.totalsum)
        },
        addFromCart(item) {
            let i = app.items.indexOf(item.name)
            app.cart[i].count ++
            app.cart[i].total += item.price
            app.totalsum += item.price
            app.counts[i] ++

            app.itemcount ++
            this.updateCart()

            localStorage.setItem('cart', JSON.stringify(app.cart))
            localStorage.setItem('totalsum', app.totalsum)
        },
        updateCart() {
            this.$emit('updatecart')
        },
        checkCoupon() {
            axios({
                url: `http://localhost:3000/coupons/${this.coupon}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(data => {
                if (data.data) {
                    this.discount = data.data.discount
                } else {
                    this.discount = 0
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    filters: {
        currencySlice(value) {
            let str = String(value)
            let reversed = str.split('').reverse()
            let counter = 0
            for (let i = 1; i < reversed.length; i++) {
                if (i % 3 === 0 && i + counter < reversed.length) {
                    reversed.splice(i + counter, 0, '.')
                    counter ++
                }
            }
            if (reversed.length > 10) {
                if (reversed[reversed.length-5] !== '0') {
                    return reversed.reverse().join('').slice(0, reversed.length-6) + 'M'
                } else {
                    return reversed.reverse().join('').slice(0, reversed.length-8) + 'M'
                }
            } else {
                return reversed.reverse().join('')
            }
        }
    }
})