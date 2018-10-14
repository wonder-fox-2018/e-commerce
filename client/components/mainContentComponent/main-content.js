Vue.component('main-content', {
    props : ['islogin','isadmin'],
    template: `
    <div>
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
                            <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#edits" @click="editing(item._id)"> Edit </button>
                            <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#deleteModal" @click="editing(item._id)"> Delete </button>
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

    <div class="modal" tabindex="-1" role="dialog" id="edits">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Item</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <center><p><b> ITEM ID : </b> {{sId}} </p></center>
                        <div class="form-group">
                            <label for="inputdefault">Name</label>
                            <input class="form-control" id="inputdefault" type="text" v-model='sName'>
                        </div>
                        <div class="form-group">
                            <label for="inputlg">Description</label>
                            <input class="form-control input-lg" id="inputlg" type="text" v-model='sDescription'>
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Price</label>
                            <input class="form-control" id="inputdefault" type="number" v-model='sPrice'>
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Image</label>
                            <input class="form-control" id="inputdefault" type="text" v-model='sImage'>
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Stock</label>
                            <input class="form-control" id="inputdefault" type="number" v-model='sStock'>
                        </div>
                        <div class="form-group">
                            <label for="inputdefault">Category</label>
                            <input class="form-control" id="inputdefault" type="text" v-model='sCategory'>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click='updateItem'>Save changes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="deleteModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Deletion</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <center><b><h3>Are you sure you want to delete this item ?</h3></b></center>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click='deleteItem'>Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>


    </div>
    `,
    data: function () {
        return {
            event : '',

            items: [],
            carts : [],
            cartsBadge : 0,

            selected : '',
            sId : '',
            sName : '',
            sDescription : '',
            sPrice : '',
            sImage : '',
            sStock : '',
            sCategory : ''
        }
    },
    created: function () {
        this.getAllItems()
    },
    watch : {
        islogin : function(val){
            this.getAllItems()
        },
        event : function(val){
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

        },editing : function(id) {

            axios({
                method: 'GET',
                url: `http://localhost:3000/items/edit/${id}`
            })
            .then(result => {
                this.selected = result.data
                this.sId = result.data._id
                this.sName = result.data.name
                this.sDescription = result.data.description
                this.sPrice = result.data. price
                this.sImage = result.data.img
                this.sStock = result.data.stock
                this.sCategory = result.data.category
                this.$emit('selected-data',this.selected)
            })
            .catch(err => {
                console.log(err)
            })

        },
        updateItem : function() {
            let name = this.sName
            let description = this.sDescription
            let price = this.sPrice
            let img = this.sImage
            let stock = this.sStock
            let category = this.sCategory

            let data = {
                name,
                description,
                price,
                img,
                stock,
                category
            }

            let self = this

            axios({
                method: 'PUT',
                url: `http://localhost:3000/items/update/${self.sId}`,
                data
            })
            .then(response => {
                self.event = response.data
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteItem : function(){
            let self = this

            axios({
                method: 'DELETE',
                url: `http://localhost:3000/items/delete/${self.sId}`
            })
            .then(response => {
                self.event = response.data
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})