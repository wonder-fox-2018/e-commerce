Vue.component('register-form',{
    name:'register-form',
    template : `
    <div class="ui inverted segment" v-if="toggle">
      <div class="ui inverted form">
        <div class="two fields">
          <div class="field">
            <label>Name</label>
            <input placeholder="Name" type="text" v-model="name">
          </div>
          <div class="field">
            <label>Email</label>
            <input placeholder="Email" type="text" v-model="email">
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
        
        <div v-on:click="register" class="ui submit button">Submit</div>
       
      </div>
      <div class="ui warning message" v-if="status">
          <i class="close icon"></i>
          <div class="header">
             Your email already exist!
          </div>
      </div>
    </div>


    `,
    methods : {
      register(){
        const registerData = {
          name:this.name,
          email : this.email,
          password : this.password
        };
        this.$emit('register',registerData);
      },
  
      close(){
        this.$emit('close-register');
      }
    },
    props:['status','toggle'],
    data: function(){
        return {
          email : '',
          password : '',
          name:''
      };
    }
  
  });