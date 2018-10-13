Vue.component('sidebar-section',{
    template: 
      ` <div>
            <div v-if= "getislogin === true " id="welcomemessage" >
                <p style= "color: black">Welcome {{ usercredentials.name }} </p>
            </div>
            <div id="searchbar">
                <input class="form-control mr-sm-2" type="text" v-model= "searchkeyword" placeholder="Search" aria-label="Search">
                <hr>
                <button class="btn btn-outline-success my-2 my-sm-0" type="button" v-on:click= "getitembysearch()">Search</button>
            </div>
            <h3 class="my-4">Categories</h3>
            <div class="list-group">
                <button class="list-group-item sideBarCustom" v-on:click="getallitems()" >All Items</button> 
            </div>
            <div class="list-group">
                <button v-for="category in listcategories" class="list-group-item sideBarCustom" v-on:click= "getitembycategory(category._id)">{{ category.name }}</button>    
            </div>
            <hr>
            <div class="list-group" v-if="getislogin === true && usercredentials.role === 'admin' ">
              <h3>Admin Section</h3>
              <button class="btn btn-success my-2 my-sm-0" type="button" data-toggle="modal" data-target="#createItem" >Add Item</button>  
            </div>

            <!-- Modal part -->
            <!-- create item modal -->
            <div class="modal fade" id="createItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Name</label>
                                    <input type="text" v-model="itemname" class="form-control" aria-describedby="emailHelp" placeholder="Enter Item Name">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Category</label>
                                    <input type="text" v-model="itemcategory" class="form-control" aria-describedby="emailHelp" placeholder="Enter Category">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Image</label>
                                    <input type="text" v-model="itemurlimage" class="form-control" placeholder="Upload Image">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Price</label>
                                    <input type="text" v-model="itemprice" class="form-control" placeholder="Prie">
                                </div>
                            </form>
                            <br/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Create Item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      `,
    props: ['getcredentials','getislogin','token'],  
    data () {
       return {
        listitems: [],
        listcategories: [],
        searchkeyword: '',
        usercredentials: {},
        itemname: '',
        itemcategory: '',
        itemurlimage: '',
        itemprice: 0
       } 
    },
    methods: {
      // get all items 
      getallitems () {
        let self = this  
        axios({
          method: 'GET',
          url: 'http://localhost:3007/items/lists'       
        })
          .then(items => { 
            self.listitems = items.data.data
          })
          .catch(error => {
             console.log('ERROR Get List of Items', error)     
          })  
      },
      // get item by category
      getitembycategory (input) {
        let self = this
        let categoryid = input  
        axios({
            method: 'GET',
            url: `http://localhost:3007/categories/${categoryid}`
        })
         .then(categories => {
            self.listitems = categories.data.data.listitemcategory
         })
         .catch(error =>{
            console.log('ERROR Get List of Categories', error)  
         })
      },
      // get item by search
      getitembysearch (){
         let self = this
         let key = this.searchkeyword
         axios({
           method: 'POST',
           url: 'http://localhost:3007/items/search',
           data: {
              keyword: key    
           }    
         })
           .then(searchitems => {
             self.listitems = searchitems.data.data  
           })
           .catch(error =>{
             console.log('ERROR Get Search result', error) 
           })
      }  
    },
    created () {
      let self = this

      // get list of categories
      axios({
        method: 'GET',
        url: 'http://localhost:3007/categories/lists' 
      })
       .then(categories =>{
          self.listcategories = categories.data.data
        })
       .catch(error=>{
       })  
    },
    watch: {
       listitems (val){
          this.$emit('listitems',val)
       },
       getcredentials (val) {
          this.usercredentials = val 
       }
    } 
})