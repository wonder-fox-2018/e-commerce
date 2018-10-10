//card
$(document).ready(function () {
    $('.post-module').hover(function () {
        $(this).find('.description').stop().animate({
            height: "toggle",
            opacity: "toggle"
        }, 300);
    });
});

//article card
$(document).ready(function ($) {
    $('.buy').on('click', function (e) {
        e.preventDefault();
        $(this).parent().parent().parent().toggleClass('expanded');
    })
    setTimeout(() => {
        $(".se-pre-con").fadeOut("slow");;
    }, 1000);
});


// login register form
$(document).ready(function () {
    new jBox('Modal', {
        attach: '.registerLink',
        content: $('#login-box')
    });

    new jBox('Modal', {
        height: 350,
        attach: '.loginLink',
        content: $('#signin-box')
    });
});

//when google signin button clicked
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/login/google",
        data: {data:id_token},
    })
    .done((jwtToken)=>{
        localStorage.setItem('token',jwtToken.token)
    })
    .fail((err)=>{
        console.log(err)
    })
}


// cart
$(document).ready(function () {

    new jBox('Modal', {
        width: 900,
        attach: '.cartLink',
        content: $('#cartContainer')
    });

    // Remove Items From Cart
    $('.cartSection .remove').click(function () {
        event.preventDefault();
        $(this).parent().parent().parent().hide(400);
    })

    // Just for testing, show all items
    

});