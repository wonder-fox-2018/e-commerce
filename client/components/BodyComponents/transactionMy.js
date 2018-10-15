const myTransaction = {
  template: `
  <div class="ui cards">
    <div class="card" style="width:800px;" v-for="(transaction, index) in myTransaction" :key="index">
      <div class="content">
        <div class="header">
          {{ customerName }}
        </div>
        <div class="meta">
          {{ transaction.market[0].name }}
        </div>
        <div class="meta">
          Date of transaction : ( {{ new Date(transaction.createdAt).getHours() }}:{{ new Date(transaction.createdAt).getMinutes() }}, {{ new Date(transaction.createdAt).getMonth() }}/{{ new Date(transaction.createdAt).getDate()+1 }}/{{ new Date(transaction.createdAt).getFullYear() }}  ) 
        </div>
        <div class="description">
          <table class="ui striped table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Amount</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in transaction.products" :key="index">
                <td>{{ product.name }}</td>
                <td>{{ product.totalItem }}</td>
                <td>Rp. {{ product.totalPrice }}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>Sub Total</th>
                <th></th>
                <th>Rp. {{ transaction.subTotalPrice }}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
  `,
  data: function() {
    return {
      customerName: "",
      myTransaction: [],
      myurl: "https://ecommerceserver.harlesbayuanggara.tech"
    };
  },
  created() {
    this.getMyTrransaction();
  },
  methods: {
    getMyTrransaction: function() {
      axios({
        method: "GET",
        url: `${this.myurl}/transaction/mytransactions`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          this.myTransaction = result.data.user.transactions;
          this.customerName = result.data.user.name;
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
