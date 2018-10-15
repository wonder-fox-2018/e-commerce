Vue.component('header-component', {
    template : `<header>
    <div class="linkBar">
        <div class="linkto" href="#article">+ SHOP</div>
        <div class="linkto" href="#footer">+ ABOUT</div>
        <div class="linkto" href="#main">+ HELP</div>
        <div onclick="signOut();">- SIGN OUT</div>

    </div>

    <div class="logoSect">H8 </div>
    <div class="linkBar">
        <div class="cartLink" href="#">+ CHART</div>
        <div :user='user'>+ {{ user.username }}</div>
        <div class="registerLink" href="#">+ SIGN UP</div>
        <div class="loginLink" href="#">+ SIGN IN</div>
    </div>
</header>`,
    props : ['user'],
    data(){
        return {
            username : 'sadkjaskdjskadjaks'
        }
    }
})