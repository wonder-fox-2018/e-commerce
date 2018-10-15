Vue.component('category-list', {
    data: function () {
      return {
        categories:null,
        categoryInputName:'',
        categoryInputEditName:'',
        categoryEdit:null,
        MsgInputCategory:'',
        MsgInputEditCategory:'',
      }
    },
    props: ['host'],
    methods: {
        refreshCategory(){
            console.log(this.host)
            let token= localStorage.getItem('token')
            if (token) {
                axios({
                    url: `${this.host}/categories`,
                    method: 'GET',
                    headers: {
                        token: token
                    }
                })
                .then(response => {
                   this.categories=response.data.data                             
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                })
            }
            else{
                this.$emit('parent-call-logout')
            }
        },
        doAddCategory(){
            let token= localStorage.getItem('token')
            if (token) {
                axios({
                    url: `${this.host}/categories`,
                    method: 'POST',
                    data:{
                        name:this.categoryInputName
                    },
                    headers: {
                        token: token
                    }
                })
                .then(response => {
                    if (response.data.data) {
                        this.categories=response.data.data //add tidak bisa secara local di push,karena mendapat Objectid   
                    }
                    $('#addCategoryModal').modal('hide');
                    this.MsgInputCategory=''
                    this.categoryInputName=''
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                    if(err.msg.code==11000 && err.msg.name=="MongoError")
                        this.MsgInputCategory='Category already exist' 
                })
            }
            else{
                this.$emit('parent-call-logout')
            }
        },
        doSaveEditCategory(){
            let token= localStorage.getItem('token')
            if (token) {
                axios({
                    url: `${this.host}/categories`,
                    method: 'PUT',
                    data:{
                        id: this.categoryEdit.id,
                        name:this.categoryInputEditName
                    },
                    headers: {
                        token: token
                    }
                })
                .then(response => {
                    console.log(response.data.msg) 
                    this.categoryEdit.name=this.categoryInputEditName    
                    $('#editCategoryModal').modal('hide');                                          
                    this.MsgInputEditCategory=''
                    this.categoryInputEditName=''
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                    if(err.msg.code==11000 && err.msg.name=="MongoError")
                        this.MsgInputEditCategory='Category already exist' 
                })
            }
            else{
                this.$emit('parent-call-logout')
            }
        },
        doEditCategory(idCategory,index){
            this.categoryEdit=this.categories[index]
            this.categoryInputEditName=this.categories[index].name
        },
        doDeleteCategory(idCategory,index){
            let token= localStorage.getItem('token')
            if (token) {
                axios({
                    url: `${this.host}/categories`,
                    method: 'DELETE',
                    data:{
                        id:idCategory
                    },
                    headers: {
                        token: token
                    }
                })
                .then(response => {
                    console.log(response.data.msg) 
                    this.categories.splice(index,1) //delete local 
                })
                .catch((err) => {
                    console.log(JSON.stringify(err))
                })
            }
            else{
                this.$emit('parent-call-logout')
            }
        }
    },
    created() {
        this.refreshCategory();
    },
    template: `
    <div>
        <button class="btn btn-primary addCategory" type="button" data-toggle="modal" data-target="#addCategoryModal">Add Category</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Category</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(category, indexc) in categories" :key="indexc">
                    <th scope="row">{{ indexc+1 }}</th>
                    <td>{{ category.name }}</td>
                    <td><button @click=doEditCategory(category._id,indexc)  data-toggle="modal" data-target="#editCategoryModal">Edit</button> | 
                        <button @click=doDeleteCategory(category._id,indexc)>Delete</button></td>                            
                </tr>
            </tbody>
        </table>
            <!-- modal Category -->
            <div class="modal fade" id="addCategoryModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add Category</h5>
                        </div>
                        <div class="modal-body">
                        <form>
                            <div class="form-group">               
                                <label>Name</label>
                                <input v-model="categoryInputName" type="text" class="form-control" placeholder="Enter name category">
                                <small style="color: red">{{ MsgInputCategory }}</small>
                            </div>
                            <button type="button" class="btn btn-primary" v-on:click="doAddCategory" style="margin-right: 10px">Add</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end  modal Category-->
            <!-- modal edit Category -->
            <div class="modal fade" id="editCategoryModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Category</h5>
                        </div>
                        <div class="modal-body">
                        <form>
                            <div class="form-group">               
                                <label>Name</label>
                                <input v-model="categoryInputEditName" type="text" class="form-control" placeholder="Enter name category">
                                <small style="color: red">{{ MsgInputEditCategory }}</small>
                            </div>
                            <button type="button" class="btn btn-primary" v-on:click="doSaveEditCategory" style="margin-right: 10px">Save</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end  modal Category-->
     </div>
    `
  })