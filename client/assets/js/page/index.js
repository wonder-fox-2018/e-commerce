var app = new Vue({
    el: '#app',
    data: { 
      host: 'http://localhost:3000',
      user: null,
      items: [],
      Categories: []
    },
    methods: {
      getUserData(){
        axios({
          method: 'GET',
          url: `${this.host}/users`,
          headers: {
            token: localStorage.getItem('coffeeToken')
          }
        })
        .then((result) => {
          app.user = result.data.data
        }).catch((err) => {
          localStorage.clear()
          console.log(err);
        });
      },
      removeUserData(){
        this.user = null
      },
      getAllItem(){
        axios({
            methods: 'GET',
            url: `${this.host}/items`
        })
        .then((result) => {
            this.items = result.data.data                
        }).catch((err) => {
            console.log(err);
        });
      }
    },
    created() {
      this.getAllItem()
      let token = localStorage.getItem('coffeeToken')
      if(token){
        this.getUserData()
      }
    },
    computed: {
      // computAllItems(){
      //   return this.allItems
      // }
    }
  })
  
  
  

  
  
  // function onSignIn(googleUser) {
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   $.ajax ({
  //     method: 'POST',
  //     url: 'http://localhost:3000/glogin',
  //     headers: {
  //       gtoken: id_token
  //     }
  //   })
  //   .done(data => {
  //     localStorage.setItem('token', data.token)
  //   })
  //   .fail(err => {
  //     console.log(err);
  //   })
  // }
  
  
  //   function signOut() {
  //     localStorage.clear()
  //     var auth2 = gapi.auth2.getAuthInstance();
  //     auth2.signOut().then(function () {
  //       console.log('User signed out.');
  //     });
  //   }
  