Vue.component('modal-cart',{
  props :  ['user', 'getcheckoutlist', 'getuseronline'],
  methods : {
    checkout : function(){
      axios({
        method : 'POST',
        url : 'http://localhost:3000/users/checkout',
        headers : {
          token : localStorage.getItem('token')
        },
        data : {
          user_id : this.user.id,
          list_item : this.user.cart,
          price_count : this.user.price_count,
          total_item : this.user.count
        }
      })
      .then(response => {
        this.getuseronline()
        this.getcheckoutlist()
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  template : `
    <div class="modal fade" id="modalCart" tabindex="-1" role="dialog" aria-labelledby="modalCart" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table>
              <thead style="text-align:center">
                <th>Nama</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Total Harga</th>
                <th>Action</th>
              </thead>
              <tbody v-for="value in user.cart">
                <tr>
                  <td><input class="form-control" type="text" v-bind:value="value.title" readonly></td>
                  <td><input class="form-control" type="text" v-bind:value="value.total" readonly style="text-align:center"></td>
                  <td><input class="form-control" type="text" v-bind:value="value.price" readonly style="text-align:right"></td>
                  <td><input class="form-control" type="text" v-bind:value="value.total * value.price" readonly style="text-align:right"></td>
                  <td style="text-align:center"><i class="fas fa-cart-plus"></i></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td> Total Pembelian </td>
                  <td><input class="form-control" type="text" v-bind:value="user.price_count" readonly style="text-align:right"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="checkout" data-dismiss='modal'>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  `
})