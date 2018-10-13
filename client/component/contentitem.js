Vue.component('content-item',{
  template: 
    `<div>
        <div class="marginTop">
            <div class="row">
                <div class="container">
                    <div id="carouselExampleControls" class="carousel slide carouselMarginCustom" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active carouselCustom">
                                <img class="d-block w-100" src="./assets/image/cosmetics1.jpg" alt="First slide">
                            </div>
                            <div class="carousel-item carouselCustom">
                                <img class="d-block w-100 " src="./assets/image/cosmetics4.jpg" alt="Second slide">
                            </div>
                            <div class="carousel-item carouselCustom">
                                <img class="d-block w-100 " src="./assets/image/cosmetics5.jpg" alt="Second slide">
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>            
                </div> 
            </div>
            <div class="row">
                <div class="col-md-12">   
                </div>
            </div>
            <div class="marginBottom"></div>
            <div>
                <div>
                    <div class="row">
                        <div v-for = "item in listitems">
                            <div class ="col-md-3">
                                <div class="itemBox">
                                    <div class="card" style="width: 18rem;">
                                        <img class="card-img-top img-fluid imgCustom" v-bind:src="item.itemurlimage" alt="Card image cap">
                                        <div class="card-body">
                                            <h5 class="card-title">{{ item.itemname }}</h5>
                                            <p class="card-text">Rp. {{ item.itemprice }}</p>
                                        </div>
                                        <hr>
                                        <div class = "card-body">
                                          <button type="button" class="btn btn-info" >Display</button>
                                          <button v-if= "getislogin === true && getcredentials.role === 'admin' " type="button" class="btn btn-warning" v-on:click="setEditData(item)" data-toggle="modal" data-target="#editItem" >Edit</button>
                                          <button v-if= "getislogin === true && getcredentials.role === 'admin' " type="button" class="btn btn-danger" >Delete</button>
                                        </div>
                                        <hr>
                                        <a v-if="getislogin !== true" data-toggle="modal" data-target="#loginMessage" class="btn btn-primary"><font color="white">Order Now</font></a>
                                        <a v-if="getislogin === true && getcredentials.role === 'user' " v-on:click= "gettemptransaction(item,item.itemprice)" class="btn btn-primary"><font color="white">Order Now</font></a>
                                    </div>
                                </div>
                            </div>    
                            <div class="col-md-1">
                            </div> 
                        </div>    
                    </div>
                    <div class="row">
                        <div>
                            <div class="col-md-12">
                                <img height="40px" width="100%" src="./assets/image/whiteBox.jpg">
                            </div>
                        </div>
                    </div>        
                </div>  
            </div>   
            <div class="row">
                <div>
                    <div class="col-md-12">
                        <img height="30px" width="100%" src="./assets/image/whiteBox.jpg">
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Part-->
        <!-- Need to Login message Modal -->
        <div class="modal fade" id="loginMessage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <label>You have to login/register first to buy</label>
                        </div>
                        <br/>
                        <br/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- edit item modal -->
        <div class="modal fade" id="editItem" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Item</h5>
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
                            <img v-bind:src="itemurlimage" width = "50px">
                            <div class="form-group">
                                <label for="exampleInputPassword1">Image</label>
                                <input type="file" v-on:change="getimage" class="form-control" id="fileedit" ref="file" placeholder="Upload Image">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Price</label>
                                <input type="text" v-model="itemprice" class="form-control" placeholder="Price">
                            </div>
                        </form>
                        <br/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-warning" v-on:click= "edititem()">Update Item</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
  props: ['getislogin','getlistitems','updatetemptransaction','updatetotalamount','gettoken','getcredentials'],  
  data () {
    return {
      listitems: [],
      temptransaction: [],
      totalamount: 0,
      itemid: '',
      itemname: '',
      itemcategory: '',
      itemurlimage: '',
      itemprice: 0,
      imageupload: ''
    }
  },
  methods: {
    gettemptransaction (val, amount){
       if(this.getislogin === true){
         this.totalamount = this.totalamount + Number(amount)
         this.temptransaction.push(val) 
       }else{
          this.totalamount = 0
          this.temptransaction = []
       } 
    },
    // send data to form edit
    setEditData (val){
       console.log('EDIT DATA-------',val)
       this.itemname = val.itemname
       this.itemcategory = val.itemcategoryid 
       this.itemurlimage = val.itemurlimage
       this.itemprice = val.itemprice
       this.itemid = val._id
    },
    // get image 
    getimage () {
      console.log('By Ref edit------', this.$refs.file.files) 
      this.imageupload = this.$refs.file.files[0] 
    },
    // edit item 
    edititem () {
      let self = this

      // upload data to GCP first
      let upladdata = new FormData()
      upladdata.append('imagefile',this.imageupload)
      console.log('Upload access edit----')
      axios.post('http://localhost:3007/items/uploads', upladdata,
        {
          headers: {
           'Content-Type': 'multipart/form-data',
           'token': self.gettoken 
          }  
        })
        .then(uploadresult => {
            self.itemurlimage = uploadresult.data.link
            console.log('Upload Sukses Edit---', uploadresult.data.link) 

            // create item
            axios({
               method: 'PUT',
               url: `http://localhost:3007/items/${self.itemid}`,
               headers:{
                 token: self.gettoken 
               },
               data: {
                 itemname: self.itemname,
                 itemcategoryid: self.itemcategory,
                 itemurlimage: self.itemurlimage,
                 itemprice: self.itemprice
               }
            })
             .then(item =>{
                console.log('Item editted-----', item.data.data) 

                 // get lists of item
                 axios({
                   method: 'GET',
                   url: 'http://localhost:3007/items/lists'   
                 })
                  .then(items => {
                     self.listitems = items.data.data 

                     // empty all unnecessary variable
                     self.itemname= '',
                     self.itemcategory= '',
                     self.itemurlimage= '',
                     self.itemprice= 0,
                     self.imageupload= ''
                     self.itemid = ''

                     // close modal
                     $('#editItem').modal('hide')
                  })
                  .catch(error =>{
                     console.log('ERROR Get List items after edit ',error)  
                  })
               })
               .catch(error =>{
                  console.log('ERROR Edit Item  ', error) 
               })
          })
          .catch(error =>{
              console.log('ERROR Upload ',error)
          })
    }
  },
  created (){
    let self = this

    // get list of items
    axios({
        method: 'GET',
        url: 'http://localhost:3007/items/lists'    
    })
      .then(items =>{
        self.listitems = items.data.data
        })
      .catch(error =>{
        console.log('ERROR Get List of Items', error)
        })
  },
  watch: {
    getlistitems (val) {
      this.listitems = val 
    },
    temptransaction (val){
      this.$emit('temptransaction',val) 
    },
    totalamount (val) {
      this.$emit('totalamount',val)
    },
    getislogin (val){},
    updatetemptransaction(val){
        this.temptransaction = val
    },
    updatetotalamount(val){
        this.totalamount = val
    }
  }  
})