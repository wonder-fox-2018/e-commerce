Vue.component('list-item', {
    data: function(){
        return {
            host: 'http://localhost:3000',
            allItems: [],
            cart: [],
            editItemId : null,
            editItemName : '',
            editItemCategory : '',
            editItemPrice : '',
            editItemUrl : '',
            categories : [],
            editImage: false
        }
    },
    props: ['user', 'items'],
    created(){
    },
    methods: {
        addCart(id){      
            axios({
              method: 'GET',
              url: `${this.host}/items/${id}`
            })
            .then((result) => {
                console.log('item added to cart');
            //   console.log(result.data.data);
              let cek = true
              let newItem = result.data.data
              newItem.quantity = 1
              this.cart.forEach(item => {
                  if(newItem._id === item._id){
                      item.quantity+= 1
                      cek = false
                  }
              })
              if(cek){
                  this.cart.push(newItem)
              }
              localStorage.setItem('cart', JSON.stringify(this.cart))
            })
            .catch((err) => {
              console.log(err);
            });
        },
        editItemForm(id) {
            this.editImage = false
            this.getCategories()
            axios({
              method: 'GET',
              url: `${this.host}/items/${id}`
            })
            .then((result) => {
              console.log(result.data.data);
                this.editItemId = result.data.data._id
                this.editItemName = result.data.data.name
                this.editItemPrice = result.data.data.price
                this.editItemUrl = result.data.data.urlImage
                this.editItemCategory = result.data.data.category
            }).catch((err) => {
              console.log(err);
            }); 
          },
          editItem(){
            if(this.editImage === true){
                this.editImage === false
                let formData = new FormData()
                formData.append('id', this.editItemId)
                formData.append('name', this.editItemName)
                formData.append('price', this.editItemPrice)
                formData.append('image', this.editItemUrl)
                formData.append('category', this.editItemCategory)

                axios.put(`${this.host}/items/image`, formData, {
                    headers: {
                        token: localStorage.getItem('coffeeToken')
                    }
                })
                .then((result) => {
                    console.log('edit item success'); 
                    this.$emit('get-items') 
                })
                .catch((err) => {
                    console.log(err.response);
                });
            } else {
                axios({
                    method: 'PUT',
                    url: `${this.host}/items`,
                    headers: {
                      token: localStorage.getItem('token')
                    },
                    data: {
                      id: this.editItemId,
                      name: this.editItemName,
                      price: this.editItemPrice,
                      category: this.editItemCategory
                    }
                })
                .then((result) => {
                this.$emit('get-items') 
                console.log('edit item success');  
                })
                .catch((err) => {
                console.log(err.response);
                });
            }
          },
          getCategories(){
            axios({
                method: 'GET',
                url: `${this.host}/categories`
            })
            .then((result) => {
                this.categories = result.data.data
            }).catch((err) => {
                console.log(err.message)
            });
        },
        onFileChange(event) {
            this.editItemUrl = event.target.files[0]
            this.editImage = true
        },
        deleteItem(id){
            axios({
                method: 'DELETE',
                url: `${this.host}/items/${id}`,
                headers: {
                    token: localStorage.getItem('coffeeToken')
                }
            })
            .then((result) => {
                this.$emit('get-items') 
                console.log('delete Item success');
            })
            .catch((err) => {
                console.log(err.response);
            });
        }
    },
    template: `
        <!-- box product -->
        <div id="tengah">
            <div class="container-fluid">
                <div class="box-product row">
                    <div class="card col-md-3 col-sm-6 col-11" style="text-align: center;" v-for='item in items'>
                        <img class="card-img-top" :src="item.urlImage" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{item.name}}</h5>
                            <p class="">Rp. {{item.price}}</p>
            
                            <div>
                                <button type="button" class="btn btn-primary" data-toggle="modal" @click="addCart(item._id)" v-if=" user && !user.admin">AddCart</button>
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-EditItem" @click="editItemForm(item._id)" v-if=" user && user.admin">Edit</button>
                                <button type="button" class="btn btn-primary" data-toggle="modal" @click="deleteItem(item._id)" v-if=" user && user.admin">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    

        <!-- edit item -->
        <div class="modal fade" id="modal-EditItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Item</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Product Name</label>
                            <input type="text" class="form-control" v-model="editItemName" aria-describedby="emailHelp"
                                placeholder="Product name">
                        </div>
                        
                        <div class="form-group">
                            <label for="exampleInputEmail1">Category</label>
                            <select class="form-control" v-model="editItemCategory">
                                <option class="form-control" v-for="category in categories" :value=category._id>{{category.name}}</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="exampleInputEmail1">Price</label>
                            <input type="text" class="form-control" v-model="editItemPrice" aria-describedby="emailHelp"
                                placeholder="Product Price">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Image Item</label> <br>
                            <img :src="editItemUrl" alt="" style="height:150px;">
                            <input type="file" class="form-control" name="avatar" accept="image/png, image/jpeg" @change="onFileChange">
                        </div>

                        <button class="btn btn-primary" data-dismiss="modal" v-on:click="editItem">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    






    </div>
    `
})