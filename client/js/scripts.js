//card
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

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

    let cartModal = new jBox('Modal', {
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
    $('.continue').click(function () {
        event.preventDefault();
        location.href='#article';
        cartModal.close()
            
        
    })
    

});

//scrolling

$(document).ready(function () {
    var $root = $('html, body');
    $('.linkto').click(function() {
        var href = $.attr(this, 'href');
    
        $root.animate({
            scrollTop: $(href).offset().top
        }, 500, function () {
            window.location.hash = href;
        });
    
        return false;
    });

    $(function() {
        var header = $("header");
        $(window).scroll(function() {    
            var scroll = $(window).scrollTop();
            
            if (scroll >= 80) {
                header.css("background-image", "linear-gradient(-60deg, #141414, rgba(20,20,20,0.5))");
            } else {
                header.css("background-image", "linear-gradient(-60deg, #747474, #3d3d3d)");
            }
        });
    });
    
});


