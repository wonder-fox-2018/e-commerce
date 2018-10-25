function login() {
  $(".tiny.modal.modalLogin")
    .modal({
      transition: "fade right"
    })
    .modal("show");
}

function register() {
  $(".tiny.modal.modalRegister")
    .modal({
      transition: "fade left"
    })
    .modal("show");
}

function shoppingCart() {
  $(".large.modal.modalShopingCart")
    .modal({
      transition: "horizontal flip"
    })
    .modal("show");
}

function updateProduct() {
  $(".tiny.modal.modalUpdateProduct")
    .modal({
      transition: "horizontal flip"
    })
    .modal("show");
}

// function closemodalupdateproduct() {
//   $(".tiny.modal.modalUpdateProduct")
//     .modal({
//       transition: "horizontal flip"
//     })
//     .modal("hide");
// }
