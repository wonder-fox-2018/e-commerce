
Vue.component('history-form',{
    template : `
    <div class="ui segment" v-if=ht>
          <select class="ui dropdown" @click="val()" id="select_id" v-if=th>  
              <option :value="data._id" v-for="(data,index) in th">{{data.date}}</option>
          </select>
  
          <h1> Your Transaction List  :</h1>
          
          <table class="ui celled table" v-if="!dl">
              <thead>
                <tr><th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Sub Total</th>
              </tr></thead>
              <tbody>
                <tr v-for="data in st.product">

                      <td data-label="Item"><div class="ui center aligned segment">{{data.name}}</div></td>
                      <td data-label="Quantity"><div class="ui center aligned segment">{{data.quantity}}</div></td>
                      <td data-label="Price"><div class="ui center aligned segment">Rp. {{data.price}}</div></td>
                      <td data-label="Sub-Total"><div class="ui center aligned segment">Rp.{{data.price*data.quantity}} </div></td>                      
                </tr>
              </tbody>
          </table>
      <div class="ui center aligned segment" v-if="!dl">
          <h4> Total Price : Rp. {{total}}</h4>
      </div>
      
      <button v-on:click="deleteTrans()" class="ui icon button">
          <i class="trash icon"></i>
      </button>
    
      </div>

    `,
    methods : {
      deleteTrans(){
        let id = document.getElementById("select_id").value;
        this.$emit('del',id);
      },
      val(){
        let id = document.getElementById("select_id").value; 
        this.$emit('vl',id)
      }
    },
    props:['th','ht','st','total','dl'],
    data: function(){
        return {
          email : '',
          password : ''
      };
    }

})

