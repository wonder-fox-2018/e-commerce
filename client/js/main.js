Vue.component('main-component', {
    template: `<main id="main">
    <div v-for="item in categories.slice(0,6)" :key="item.id" class="grid cs-style-3">
        <div class="mainCard">
            <figure>
                <div><img v-bind:src="'https://picsum.photos/500/30'+item._id+'/?random'" alt="img05"></div>
                <figcaption>
                    <h3> {{ item.categoryName }} </h3>
                    <span> {{ item.description }} </span>
                    <a href="#footer">Take a look</a>
                </figcaption>
            </figure>
        </div>
    </div>
</main>`,
    data: function () {
        return {
            categories: []
        }
    },
    created() {

        this.getCategories()

    },
    methods: {
        getCategories() {
            let self = this

            axios.get('http://localhost:3000/categories', {})
                .then(categories => {
                    this.categories = categories.data
                    this.$emit('clicked-show-categories', self.categories)
                })
                .catch(err => {
                    console.log(err)
                })


        },


        responAdd(val) {
            this.getCategories()
        }
    }
})