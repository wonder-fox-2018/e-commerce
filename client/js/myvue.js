var app = new Vue({
    el: '#app',
    data: {
        items: ''
    },
    created: function () {
        this.getAllItems()
    },
    methods: {
        getAllItems: function () {
            let self = this
            axios({
                    method: "GET",
                    url: 'http://localhost:3000/items'
                })
                .then(function (result) {
                    self.items = result.data.items
                })
        }
    }
})