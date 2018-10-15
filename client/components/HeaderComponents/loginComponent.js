const loginuser = {
  template: `
  <!-- Modal Login -->
  <div class="ui tiny modal modalLogin">
    <div class="header">
      LOGIN
    </div>
    <div class="content">
      <div class="ui fluid card">
        <div class="content">
          <div class="ui form">
            <div class="field">
              <label>Email</label>
              <input placeholder="Enter your email" type="text" v-model="emailLogin">
            </div>
            <div class="field">
              <label>Password</label>
              <input placeholder="Enter your password" type="password" v-model="passwordlLogin">
            </div>
            <div class="field">
              <label>Din't have a count? <span onclick="register()" id="actinExtModal">signup</span></label>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="actions">
      <div class="ui deny button">Cancel</div>
      <div class="ui button" v-on:click="actionSignin">Signin</div>
    </div>
  </div>
  `,
  props: ["getStatusMarketFromCreate"],
  data: function() {
    return {
      emailLogin: "",
      passwordlLogin: "",
      isLogin: false,
      statusMarket: false,
      myurl: "http://localhost:3000"
    };
  },
  created() {
    this.getTtoken();
    this.getStatusMarket();
  },
  methods: {
    getTtoken: function() {
      let token = localStorage.getItem("token");
      if (token) {
        this.isLogin = true;
        this.$emit("status-login", this.isLogin);
      } else {
        this.isLogin = false;
        this.$emit("status-login", this.isLogin);
      }
    },
    getStatusMarket: function() {
      let statusMarket = localStorage.getItem("statusMarket");
      if (statusMarket == "true") {
        this.statusMarket = true;
        this.$emit("status-market", this.statusMarket);
      } else {
        this.statusMarket = false;
        this.$emit("status-market", this.statusMarket);
      }
    },
    actionSignin: function() {
      axios({
        method: "POST",
        url: `${this.myurl}/users/signin`,
        data: {
          email: this.emailLogin,
          password: this.passwordlLogin
        }
      })
        .then(response => {
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("statusMarket", response.data.statusMarket);
          this.getTtoken();
          this.getStatusMarket();
          $(".tiny.modal.modalLogin")
            .modal({ transition: "fade right" })
            .modal("hide");
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    }
  },
  watch: {
    getStatusMarketFromCreate: function(val) {
      this.getStatusMarket();
    }
  }
};
