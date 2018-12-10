Vue.component('modal-addproduct', {
  props : ['refresh'],
  data : function(){
    return {
      title : '',
      price : '',
      total : 1,
      img : '',
      description : '',
      category : '',
      qty : '',
    }
  },
  methods : {
    getMemeImg(link) {
      this.image = link.target.files[0]
    },
    addProduct : function(){
      let formdata = new FormData()
      formdata.append('image', this.image)
      axios.post('http://localhost:3000/upload', formdata)
      .then((image) => {
        let url = image.data.link
        axios({
          method : 'POST',
          url : 'http://localhost:3000/products/add',
          headers : {
            token : localStorage.getItem('token')
          },
          data : {
            title : this.title,
            price : this.price,
            total : 1,
            img : url,
            description : this.description,
            category : this.category,
            qty : this.qty
          }
        })
        .then(response => {
          this.title = ''
          this.price = ''
          this.img = ''
          this.description = ''
          this.category = ''
          this.qty = ''
          this.refresh()
        })
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  template: `
    <div class="modal fade" id="modalAddProduct" tabindex="-1" role="dialog" aria-labelledby="modalAddProduct" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputTitle">Title</label>
                  <input type="email" class="form-control" v-model="title" placeholder="title">
                </div>
              </div>
              <div class="form-group">
                <label for="inputDescription">Description</label>
                <textarea class="form-control" v-model="description" placeholder="Your Product description ..."></textarea>
              </div>
              <div class="form-group">
                <label for="inputImage">img</label>
                <input type="file" class="form-control" id="inputPassword3" placeholder="image" v-on:change="getMemeImg($event)">
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputPrice">Price</label>
                  <input type="text" class="form-control" v-model="price">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputQty">Qty</label>
                  <input type="text" class="form-control" v-model="qty">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputCategory">Category</label>
                  <input type="text" class="form-control" v-model="category">
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="addProduct" data-dismiss="modal">Add Product</button>
          </div>
        </div>
      </div>
    </div>
  `
})