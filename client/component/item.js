Vue.component('item-list', {
  props : ['list', 'user', 'role'],
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
  template : `
    <div class="col-lg-4 col-md-6 mb-4">
      <a href="#" style="text-decoration:none" :title="list.title">
        <div class="card h-100">
        <div class="card-img-top" 
          :style="{ 
            height : '250px', 
            backgroundImage : 'url('+list.img+')', 
            backgroundSize : 'contain',
            backgroundRepeat : 'no-repeat',
            backgroundPosition : 'center'
          }">
        </div>
          <div class="card-body">
              <h4 class="card-title">
                {{list.title}}
              </h4>
              <h5 class="card-price">
                {{list.price}}
              </h5>
          </div>
        </div>
      </a>
    </div>
  `
})