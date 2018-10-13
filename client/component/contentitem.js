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
                                        <a v-if="getislogin !== true" data-toggle="modal" data-target="#loginMessage" class="btn btn-primary"><font color="white">Order Now</font></a>
                                        <a v-if="getislogin === true" class="btn btn-primary"><font color="white">Order Now</font></a>
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
    </div>
    `,
  props: ['getislogin','getlistitems'],  
  data () {
    return {
      listitems: [],
      token: ''
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
     } 
  }  
})