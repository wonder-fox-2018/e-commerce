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



//test vue
let vm = new Vue({
    el: '#container',
    data: {

        welcome: 'WELCOME VUE!',

        categories: [{
                id: 1,
                description: 'Category Description',
                categoryName: 'Electronics'
            },
            {
                id: 2,
                description: 'Category Description',
                categoryName: 'Homemade'
            },
            {
                id: 3,
                description: 'Category Description',
                categoryName: 'Architect'
            },
            {
                id: 4,
                description: 'Category Description',
                categoryName: 'Buildings'
            },
            {
                id: 5,
                description: 'Category Description',
                categoryName: 'Food'
            },
            {
                id: 6,
                description: 'Category Description',
                categoryName: 'Material'
            },
            {
                id: 7,
                description: 'Category Description',
                categoryName: 'Cool'
            },
            {
                id: 8,
                description: 'Category Description',
                categoryName: 'Classy'
            },
            {
                id: 9,
                description: 'Category Description',
                categoryName: 'Common'
            },
            {
                id: 10,
                description: 'Category Description',
                categoryName: 'Travel'
            },
            {
                id: 11,
                description: 'Category Description',
                categoryName: 'Pool'
            },
            {
                id: 12,
                description: 'Category Description',
                categoryName: 'Beach'
            },
        ],
        products: [{
            "id": 1,
            "productName": "Creme De Cacao White",
            "productDesc": "Unspecified astigmatism, unspecified eye",
            "price": 184305,
            "rating": 5,
            "category": "American Reunion (American Pie 4)"
        }, {
            "id": 2,
            "productName": "Banana - Leaves",
            "productDesc": "Macular cyst, hole, or pseudohole, bilateral",
            "price": 919219,
            "rating": 4,
            "category": "German Doctor, The (Wakolda)"
        }, {
            "id": 3,
            "productName": "Wine - White, Pinot Grigio",
            "productDesc": "Lacerat intrns musc/fasc/tend unsp fngr at wrs/hnd lv, init",
            "price": 794179,
            "rating": 4,
            "category": "Free the Nipple"
        }, {
            "id": 4,
            "productName": "Pork Salted Bellies",
            "productDesc": "Pnctr w/o fb of right thumb w/o damage to nail, subs",
            "price": 517733,
            "rating": 4,
            "category": "Page One: Inside the New York Times"
        }, {
            "id": 5,
            "productName": "Beef - Ground Medium",
            "productDesc": "Disp fx of coracoid process, unspecified shoulder, sequela",
            "price": 637100,
            "rating": 5,
            "category": "Dancing Hawk, The (Tanczacy jastrzab)"
        }, {
            "id": 6,
            "productName": "Beef - Ground, Extra Lean, Fresh",
            "productDesc": "Other fracture of upper end of left radius, sequela",
            "price": 754189,
            "rating": 3,
            "category": "Another You"
        }, {
            "id": 7,
            "productName": "Wine - Red, Black Opal Shiraz",
            "productDesc": "Charcot's joint, hand",
            "price": 743774,
            "rating": 2,
            "category": "Métastases"
        }, {
            "id": 8,
            "productName": "Huck White Towels",
            "productDesc": "Corros unsp degree of unsp mult fngr (nail), inc thumb, sqla",
            "price": 890192,
            "rating": 4,
            "category": "Amazing Spider-Man, The"
        }, {
            "id": 9,
            "productName": "Flavouring - Orange",
            "productDesc": "Contracture of muscle, unspecified thigh",
            "price": 679784,
            "rating": 4,
            "category": "My Way (Mai Wei)"
        }, {
            "id": 10,
            "productName": "Yogurt - Cherry, 175 Gr",
            "productDesc": "Nondisplaced fracture of medial condyle of left femur",
            "price": 40876,
            "rating": 5,
            "category": "Return to Never Land"
        }, {
            "id": 11,
            "productName": "Juice - Orangina",
            "productDesc": "Toxic effect of cadmium and its compounds, assault, subs",
            "price": 401100,
            "rating": 2,
            "category": "Batman: Under the Red Hood"
        }, {
            "id": 12,
            "productName": "Nut - Chestnuts, Whole",
            "productDesc": "Inj/poisn/oth conseq of external causes comp preg, unsp tri",
            "price": 598437,
            "rating": 5,
            "category": "The Man Who Wouldn't Die"
        }, {
            "id": 13,
            "productName": "Wine - Jackson Triggs Okonagan",
            "productDesc": "Nondisp commnt fx shaft of humer, right arm, init for opn fx",
            "price": 470407,
            "rating": 2,
            "category": "Midsummer Night's Dream, A"
        }, {
            "id": 14,
            "productName": "Foil - 4oz Custard Cup",
            "productDesc": "Retained nonmagnetic metal fragments",
            "price": 910559,
            "rating": 2,
            "category": "Ted"
        }, {
            "id": 15,
            "productName": "Table Cloth 54x54 White",
            "productDesc": "Nondisp oblique fx shaft of unsp fibula, 7thR",
            "price": 829313,
            "rating": 2,
            "category": "Pool, The"
        }, {
            "id": 16,
            "productName": "Lime Cordial - Roses",
            "productDesc": "Pseudohypoparathyroidism",
            "price": 658086,
            "rating": 3,
            "category": "Awakenings"
        }, {
            "id": 17,
            "productName": "Yogurt - Assorted Pack",
            "productDesc": "Mature T/NK-cell lymphomas, unspecified, unspecified site",
            "price": 393130,
            "rating": 1,
            "category": "Short Circuit"
        }],
        cart: {
            _id: '23rr233d',
            cartcontent: [{
                    Product: {
                        "id": 17,
                        "productName": "Yogurt - Assorted Pack",
                        "productDesc": "Mature T/NK-cell lymphomas, unspecified, unspecified site",
                        "price": 393130,
                        "rating": 1,
                        "category": "Short Circuit"
                    },
                    qty: 3
                }, {
                    Product: {
                        "id": 15,
                        "productName": "Table Cloth 54x54 White",
                        "productDesc": "Nondisp oblique fx shaft of unsp fibula, 7thR",
                        "price": 829313,
                        "rating": 2,
                        "category": "Pool, The"
                    },
                    qty: 8
                },

            ],
            subTotal: 80000,
            shipping: 5000,
            tax: 8000,
            total: 902020,
            status: true,
        },
    }
})


// cart
$(document).ready(function () {

    new jBox('Modal', {
        width: 900,
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
