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
    }, 2000);
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

// cart
$(document).ready(function () {

    new jBox('Modal', {
        width : 900,
        attach: '.cartLink',
        content: $('#cartContainer')
    });

    // Remove Items From Cart
    $('a.remove').click(function () {
        event.preventDefault();
        $(this).parent().parent().parent().hide(400);
    })

    // Just for testing, show all items
    $('a.btn.continue').click(function () {
        $('li.items').show(400);
    })

});