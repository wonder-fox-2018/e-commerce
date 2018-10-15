Vue.component('modal-register', {
    props : ['register'],
    methods :{
        signup: function(){
            axios({
                method : 'POST',
                url : 'http://localhost:3000/signup',
                data : {
                    email : this.register.email,
                    password : this.register.password,
                    name : this.register.name,
                    address : this.register.address,
                    city : this.register.city,
                    state : this.register.state,
                    zip : this.register.zip
                }
            })
            .then(register => {
                console.log(register)
                this.register.email = ''
                this.register.password =''
                this.register.name = ''
                this.register.address =''
                this.register.city = ''
                this.register.state =''
                this.register.zip =''
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    template : `
    <div class="modal fade" id="modalRegister" tabindex="-1" role="dialog" aria-labelledby="modalRegister" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Register</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail" v-model="register.email" placeholder="Email">
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword" v-model="register.password" placeholder="Password">
              </div>
            </div>
            <div class="form-group">
              <label for="inputName">Name</label>
              <input type="text" class="form-control" id="inputName" v-model="register.name" placeholder="Your Name ... ">
            </div>
            <div class="form-group">
              <label for="inputAddress">Address</label>
              <input type="text" class="form-control" id="inputAddress" v-model="register.address" placeholder="1234 Main St">
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity" v-model="register.city">
              </div>
              <div class="form-group col-md-4">
                <label for="inputState">state</label>
                <input type="text" class="form-control" id="inputState" v-model="register.state">
              </div>
              <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip" v-model="register.zip">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" v-on:click="signup" data-dismiss="modal">Register</button>
        </div>
      </div>
    </div>
  </div>
    `
})

Vue.component('modal-addproduct', {
    props : ['refresh'],
    data : function(){
        return {
            title : '',
            price : '',
            total : 1,
            img : '',
            description : '',
            category : '',
            qty : '',
        }
    },
    methods : {
        getMemeImg(link) {
          this.image = link.target.files[0]
          console.log("ini image", this.image);
        },
        addProduct : function(){

          let formdata = new FormData()
          formdata.append('image', this.image)

          axios.post('http://localhost:3000/upload', formdata)
          .then((image) => {
            let url = image.data.link
            
            console.log(url)
            axios({
              method : 'POST',
              url : 'http://localhost:3000/products/add',
              headers : {
                  token : localStorage.getItem('token')
              },
              data : {
                  title : this.title,
                  price : this.price,
                  total : 1,
                  img : url,
                  description : this.description,
                  category : this.category,
                  qty : this.qty
              }
            })
            .then(response => {
                console.log(response)
                this.title = ''
                this.price = ''
                this.img = ''
                this.description = ''
                this.category = ''
                this.qty = ''
                this.refresh()
            })
          })
          .catch((err) => {
              console.log(err);
              
          });
          
            
        }
    },
    template: `
    <div class="modal fade" id="modalAddProduct" tabindex="-1" role="dialog" aria-labelledby="modalAddProduct" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Product</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputTitle">Title</label>
                <input type="email" class="form-control" v-model="title" placeholder="title">
              </div>
            </div>
            <div class="form-group">
              <label for="inputDescription">Description</label>
              <textarea class="form-control" v-model="description" placeholder="Your Product description ..."></textarea>
            </div>
            <div class="form-group">
              <label for="inputImage">img</label>
              <input type="file" class="form-control" id="inputPassword3" placeholder="image" v-on:change="getMemeImg($event)">
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputPrice">Price</label>
                <input type="text" class="form-control" v-model="price">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputQty">Qty</label>
                <input type="text" class="form-control" v-model="qty">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCategory">Category</label>
                <input type="text" class="form-control" v-model="category">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" v-on:click="addProduct" data-dismiss="modal">Add Product</button>
        </div>
      </div>
    </div>
  </div>
    `
})

Vue.component('modal-login',{
    props : ['login', 'getToken', 'getuseronline'],
    methods : {
        signin : function(){
            axios({
                method : 'POST',
                url : 'http://localhost:3000/signin',
                data : {
                    email : this.login.email,
                    password : this.login.password
                }
            })
            .then(response => {
                // console.log(response)
                localStorage.setItem('token', response.data.token)
                this.getToken()
                this.getuseronline()

                this.login.email = ''
                this.login.password = ''
            })
            .catch(err => {
                console.log(err)
            })
        }

    },
    template:`
    <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="modalLogin" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="inputEmail">Email address</label>
              <input type="email" class="form-control" v-model="login.email" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input type="password" class="form-control" v-model="login.password" placeholder="Password">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="signin" data-dismiss="modal">Sign In</button>
        </div>
      </div>
    </div>
  </div>
    `
})

Vue.component('modal-cart',{
    props :  ['user', 'getcheckoutlist', 'getuseronline'],
    methods : {
        checkout : function(){
            // this.getuseronline()
            axios({
                method : 'POST',
                url : 'http://localhost:3000/users/checkout',
                headers : {
                    token : localStorage.getItem('token')
                },
                data : {
                    user_id : this.user.id,
                    list_item : this.user.cart,
                    price_count : this.user.price_count,
                    total_item : this.user.count
                }
            })
            .then(response => {
                console.log('test')
                // console.log(response)
                this.getuseronline()
                this.getcheckoutlist()
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    template : `
    <!-- Modal cart -->
    <div class="modal fade" id="modalCart" tabindex="-1" role="dialog" aria-labelledby="modalCart" aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="exampleModalCenterTitle">Cart</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body">
             <table>
               <thead style="text-align:center">
                 <th>Nama</th>
                 <th>Jumlah</th>
                 <th>Harga</th>
                 <th>Total Harga</th>
                 <th>Action</th>
               </thead>
               <tbody v-for="value in user.cart">
                 <tr>
                   <td><input class="form-control" type="text" v-bind:value="value.title" readonly></td>
                   <td><input class="form-control" type="text" v-bind:value="value.total" readonly style="text-align:center"></td>
                   <td><input class="form-control" type="text" v-bind:value="value.price" readonly style="text-align:right"></td>
                   <td><input class="form-control" type="text" v-bind:value="value.total * value.price" readonly style="text-align:right"></td>
                   <td style="text-align:center"><i class="fas fa-cart-plus"></i></td>
                 </tr>
               </tbody>
               <tbody>
                 <tr>
                   <td></td>
                   <td></td>
                   <td> Total Pembelian </td>
                   <td><input class="form-control" type="text" v-bind:value="user.price_count" readonly style="text-align:right"></td>
                 </tr>
               </tbody>
             </table>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
             <button type="button" class="btn btn-primary" @click="checkout" data-dismiss='modal'>Save changes</button>
           </div>
         </div>
       </div>
     </div>
    `
})

Vue.component('modal-checkout',{
    props :  ['checkout','user','getcheckoutlist', 'getuseronline'],
    template : `
    <!-- Modal checkout -->
    <div class="modal fade" id="modalCheckout" tabindex="-1" role="dialog" aria-labelledby="modalCheckout" aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="exampleModalCenterTitle">Checkout</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body">
             <table v-for="list in checkout">
               <thead style="text-align:center">
                 <th>Nama</th>
                 <th>Jumlah</th>
                 <th>Harga</th>
                 <th>Total Harga</th>
                 <th>Action</th>
               </thead>
               <tbody v-for="value in list.list_item">
                 <tr>
                   <td><input class="form-control" type="text" v-bind:value="value.title" readonly></td>
                   <td><input class="form-control" type="text" v-bind:value="value.total" readonly style="text-align:center"></td>
                   <td><input class="form-control" type="text" v-bind:value="value.price" readonly style="text-align:right"></td>
                   <td><input class="form-control" type="text" v-bind:value="value.total * value.price" readonly style="text-align:right"></td>
                   <td style="text-align:center"><i class="fas fa-cart-plus"></i></td>
                 </tr>
               </tbody>
               <tbody>
                 <tr>
                   <td></td>
                   <td></td>
                   <td> Total Pembelian </td>
                   <td><input class="form-control" type="text" :value="list.price_count" readonly style="text-align:right"></td>
                 </tr>
               </tbody>
             </table>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
           </div>
         </div>
       </div>
     </div>
    `
})