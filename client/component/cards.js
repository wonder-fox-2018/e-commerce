Vue.component('cards', {
  props: ['lists', 'islogin'],
  template: `
  <div class="ui eleven wide column">
      <div class="ui link cards">
        <div class="ui special cards" id="cards-template">
          <div class="search" style="padding-top:50px;"></div>
          <div class="ui special cards">
            <div class="card" v-for='item in lists' :key='item._id'>
              <div class="blurring dimmable image">
                <div class="ui dimmer">
                  <div clasfs="content">
                    <div class="center">
                      <div class="ui inverted button" >Add to
                          
                      </div>
                    </div>
                  </div>
                </div>
                <img :src="item.image_url">
              </div>
              <div class="content">
                <a class="header">{{ item.name }}</a>
                <p>( {{ item.category }} )</p>
                <div class="meta">
                  <span class="date">Rp {{ moneyFormat(item.price) }} </span>
                </div>
              </div>
              <div class="extra content">
                <p>
                  Quantity:
                  {{ item.quantity }}
                </p>
                <button type="submit" class="btn btn-success" @click='$emit("addtocart",item)' v-if="islogin">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {

    }
  },
  methods: {
    moneyFormat(amount, decimalCount = 0, decimal = ",", thousands = ".") {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      }
    }
   
  }
})