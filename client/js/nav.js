Vue.component('nav-component', {
    template : `
    <nav>
    <div class="categoriesContainer">
        <ul>
            <li v-for="item in categories" :key="item.id" class="fa fa-star">
                {{ item.categoryName }}
            </li>
        </ul>
    </div>
</nav>
    
    `,
    props : ['categories'],
    // methods : {
    //     responAdd(val) {
    //         this.categories.push(val)
    //       }
    // }
})