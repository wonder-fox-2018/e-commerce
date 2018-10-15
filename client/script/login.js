
Vue.component('login-form',{
    template : `
    <div class="ui inverted segment" v-if="toggle">
    <div class="ui inverted form">
      <div class="two fields">
        <div class="field">
          <label>Email</label>
          <input placeholder="Name" type="text" v-model="email">
        </div>
        <div class="field">
          <label>Password</label>
          <input placeholder="Password" type="password" v-model="password">
        </div>
      </div>
      <div class="inline field">
        <div class="ui checkbox">
          <input type="checkbox" tabindex="0" class="hidden">
        </div>
      </div>

      <div v-on:click="login" class="ui submit button">Submit</div>
    </div>
    <div class="ui warning message" v-if="status">
        <i class="close icon"></i>
        <div class="header">
           Your email and password didn't match!
        </div>
    </div>
  </div>

    `,
    methods : {
      login(){
        const loginData = {
          email : this.email,
          password : this.password
        };
        this.$emit('login',loginData);
      },
  
      close(){
        this.$emit('close-login');
      }
    },
    props:['status','toggle'],
    data: function(){
        return {
          email : '',
          password : ''
      };
    }
  
  });