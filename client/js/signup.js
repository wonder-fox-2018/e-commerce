Vue.component('signup-component', {
    template: `<div id="login-box" style="display:none;">
    <div class="left">
        <h1>Sign up</h1>

        <input type="text" id="registerUsername" v-model="username" placeholder="Username" />
        <input type="text" id="registerEmail" v-model="email" placeholder="E-mail" />
        <input type="password" id="registerPassword" v-model="password" placeholder="Password" />
        <input type="test" id="role" v-model="role" placeholder="Password" />

        <input type="submit" @click="register" name="registerSubmit" value="Sign Me Up" />
    </div>

    <div class="right">
        <span class="loginwith">Sign in with<br />social network</span>
        <button class="social-signin google">Log in with Google+</button>
    </div>
    <div class="or">OR</div>
</div>`,

    data: function () {
        return {
            username: '',
            email: '',
            password: '',
            role: '',
        }

    },
    methods: {
        register: function () {
            axios({
                    method: 'post',
                    url: 'http://localhost:3000/users/',
                    data: {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        role: this.role ? this.role : 'customer' 
                    }
                })
                .then((jwtToken) => {
                    console.log(jwtToken)
                    localStorage.setItem('token', jwtToken.data.token)
                }).catch((err) => {
                    console.log(err)
                });
        }
    }


})