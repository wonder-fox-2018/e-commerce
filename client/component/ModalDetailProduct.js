Vue.component('modal-detail-product',{
  props:['productdata', 'user', 'role'],
  methods : {
    toCart : function(list){
      this.user.price_count = this.user.price_count + list.price
      this.user.count=this.user.count+1
      let status=0
      if(this.user.cart.length > 0){
        for(let i = 0; i < this.user.cart.length;i++){
          if(this.user.cart[i]._id === list._id){
            this.user.cart[i].total=this.user.cart[i].total+1
            status=1
            break
          }
        }
      }else{
        this.user.cart.push(list)
        status = 1
      }
      if(status==0){
        this.user.cart.push(list)
      }
    },
  },
  template :`
    <div class="modal fade" id="modalDetailProduct" tabIndex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Detail Product
            </h5>
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="card h-100">
            <div class="card-img-top mt-2" 
              :style="{
                height : '250px', 
                backgroundImage : 'url('+productdata.img+')', 
                backgroundSize : 'contain',
                backgroundRepeat : 'no-repeat',
                backgroundPosition : 'center'
              }">
            </div>
              <div class="card-body">
                  <h4 class="card-title">
                    {{productdata.title}}
                  </h4>
                  <p class="card-description">
                    {{productdata.description}}
                  </p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
              <button class="btn btn-success" @click="toCart(productdata)" data-dismiss="modal">
                Buy
              </button>
          </div>
        </div>
      </div>
    </div>
  `
})
