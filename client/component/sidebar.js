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
        </div>
      `,
    props: ['getcredentials','getislogin'],  
    data () {
       return {
        listitems: [],
        listcategories: [],
        searchkeyword: '',
        usercredentials: {}
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