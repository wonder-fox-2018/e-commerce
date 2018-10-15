Vue.component('signin-component', {
    template : `
    <div id="signin-box" style="display:none;">
                <div class="left">
                    <input type="text" id="loginUsername" name="username" placeholder="Username" />
                    <input type="password" id="loginPassword" name="password" placeholder="Password" />
                    <input type="submit" name="login_submit" value="Sign In" />
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                </div>
            </div>
    `
})