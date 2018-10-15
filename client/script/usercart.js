Vue.component('user-cart',{
    template : `
    <div class="ui segment" v-if="toggle">
    <h1> Your Shopping List  :</h1>
    <table class="ui celled table">
        <thead>
          <tr><th>Item Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Sub Total</th>
          <th>Action</th>
        </tr></thead>
        <tbody>
          <tr v-for="data in usercart">
              
                <td data-label="Item"><div class="ui center aligned segment">{{data.product.name}}</div></td>
                <td data-label="Quantity"><div class="ui center aligned segment">{{data.quantity}}</div></td>
                <td data-label="Price"><div class="ui center aligned segment">Rp. {{data.product.price}}</div></td>
                <td data-label="Sub-Total"><div class="ui center aligned segment">Rp. {{data.quantity*data.product.price}}</div></td>                      
              
              <td>
                <div class="ui center aligned segment">
                    <div class="ui buttons">
                        <button class="ui button" v-on:click="atc(data.product._id)">add</button>
                        <div class="or" data-text="or"></div>
                        <button class="ui positive button" v-on:click="min(data.product._id)">decrease</button>
                      </div>
                      <button v-on:click="tb(data.product._id)" class="ui icon button">
                          <i class="trash icon"></i>
                      </button>
                  </div>
             </td>
          </tr>
        </tbody>
    </table>
    <div class="ui center aligned segment">
    <h4> Total Price : Rp. {{totalan}}</h4>
    </div>
    
    <button class="ui positive button" v-on:click="checkouts">checkout</button>
    </div>
    `,
    methods : {
      checkouts(){
        this.$emit('checkoutevent');
      },
  
      close(){
        this.$emit('close-login');
      },
      atc(id){
          this.$emit('atcart',id)
      },
      min(id){
          this.$emit('mincart',id)
      },
      tb(id){
         this.$emit('tc',id)
      }
    },
    props:['usercart','toggle','totalan'],
    data: function(){
        return {
          email : '',
          password : ''
      };
    }
  
  });

