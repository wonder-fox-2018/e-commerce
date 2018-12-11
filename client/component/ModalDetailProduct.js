Vue.component('modal-detail-product',{
  props:['productId'],
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
            ID : {{productId}}
          </div>
        </div>
      </div>
    </div>
  `
})
