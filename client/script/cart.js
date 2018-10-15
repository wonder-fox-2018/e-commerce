Vue.component('cart-form',{
    template : `
    <div class="ui twelve wide column" style="padding: 20px;">
          <div class="ui special four cards" style="padding: 10px;">
              <div class="card" v-for="data in datacard">
                <div class="blurring dimmable image">
                  <div class="ui dimmer">
                    <div class="content">
                      <div class="center">
                        <div class="ui inverted button">add to cart</div>
                      </div>
                    </div>
                  </div>
                  <img v-bind:src="data.imgUrl">
                </div>
                <div class="content">
                  <a class="header"><strong>{{data.name}}</strong></a>
                  <p>{{data.description}}</p>
                 
                </div>
                <div class="ui segment">
                    <div class="sub header"><strong>Price = Rp.{{data.price}}</strong></div>
                </div>

                <div class="extra content">
                  <button v-if="token&&!admin" v-on:click="addToCart(data._id)" class="ui toggle mini button active">Add To Cart</button>
                </div>
                <div class="extra content">
                  <button v-if="token&&admin" v-on:click="editData(data._id)" class="ui toggle mini button active">Edit Product</button>
                </div>
                <div class="extra content">
                  <button v-if="token&&admin" v-on:click="deleteData(data._id)" class="ui youtube button">Delete Product</button>
                </div>
              </div>
        </div>
    </div>
    `,
    methods : {
      addToCart(id){
        this.$emit('kirimid',id);
      },
      editData(id){
        this.$emit('dataid',id);
        this.$emit('dis')
      },
      deleteData(id){
        this.$emit('kirimdata',id);
      }
    },
    props:['datacard','token','admin'],
  
  });

