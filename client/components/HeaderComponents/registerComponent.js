const registeruser = {
  template: `
    <!-- Modal Register -->
    <div class="ui tiny modal modalRegister">
      <div class="header">
        REGISTER
      </div>
      <div class="content">
        <div class="ui fluid card">
          <div class="content">
            <div class="ui form">
              <div class="field">
                <label>Name</label>
                <input placeholder="Enter your full name" type="text" v-model="name">
              </div>
              <div class="field">
                <label>Picture</label>
                <input placeholder="Enter your phone number" type="file">
              </div>
              <div class="field">
                <label>Email</label>
                <input placeholder="Enter your email" type="text" v-model="email">
              </div>
              <div class="field">
                <label>Password</label>
                <input placeholder="Enter your password" type="password" v-model="password">
              </div>
              <div class="field">
                <label>Already have an count? <span onclick="login()" id="actinExtModal">signin</span></label>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="actions">
        <div class="ui deny button">Cancel</div>
        <div class="ui button" @click="btnSignup">Signup</div>
      </div>
    </div>
  `,
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      myurl: "https://ecommerceserver.harlesbayuanggara.tech"
    };
  },
  methods: {
    btnSignup: function() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      axios({
        method: "POST",
        url: `${this.myurl}/users/signup`,
        data
      })
        .then(response => {
          this.name = "";
          this.email = "";
          this.password = "";

          $(".tiny.modal.modalRegister")
            .modal({
              transition: "fade left"
            })
            .modal("hide");
        })
        .catch(err => {
          console.log(Object.values(err.response.data.err.errors)[0].message);
        });
    }
  }
};
