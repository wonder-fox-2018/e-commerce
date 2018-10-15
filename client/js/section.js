Vue.component('section-component', {
    template: `<section>
    <img src="https://picsum.photos/1200/400/?random" alt="">

    <div id="admincontainer" v-if="user.role == 'admin'">
        <div class="admin-box">
            <div>
                <h1>Add Category</h1>

                <input type="text" id="addCategoryname" v-model="categoryName" placeholder="Category Name" />
                <input type="text" id="addCategoryDescription" v-model="description" placeholder="Description" />
                <input type="text" id="addCategoryProducts" v-model="products" placeholder="Products" />
              
                <input type="submit" @click="addCategory" name="addCategorySubmit" value="Save" />
            </div>
        </div>
        

        <div class="admin-box">
            <div>
                <h1>Add Product</h1>
                <input type="text" id="addProductName" v-model="productName" placeholder="Product Name" />
                <input type="text" id="addProductDec" v-model="productDec" placeholder="Product Desc" />
                <input type="number" id="addProductPrice" v-model="price" placeholder="Product Price" />
                <input type="number" v-model="addProductRating" placeholder="Product Rating" />
                <input type="text" v-model="addProductCategory" placeholder="Category" />
                <input type="submit" @click="addProduct" name="addProduct_submit" value="Save" />
            </div>
        </div>

    </div>

</section>`,
    props : ['user'],
    data: function () {
        return {
            categoryName: '',
            description: '',
            products: '',

            productName: '',
            productDec: '',
            price: 0,
            addProductRating: 0,
            addProductCategory: ''
        }

    },
    methods: {
        addCategory: function () {
            axios({
                    method: 'post',
                    url: 'http://localhost:3000/categories/',
                    data: {
                        categoryName: this.categoryName,
                        description: this.description,
                        Products: this.products
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    },

                })
                .then((result) => {
                    this.categoryName = '',
                        this.description = '',
                        this.products = '',
                        this.$emit('respon-add-category', result.data)
                }).catch((err) => {
                    console.log(err)
                });
        },
        addProduct: function () {
            axios({
                    method: 'post',
                    url: 'http://localhost:3000/products/',
                    data: {
                        productName: this.productName,
                        productDec: this.productDec,
                        price: this.price,
                        rating: this.addProductRating,
                        category: this.addProductCategory
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    },

                })
                .then((result) => {
                        this.productName ='',
                        this.productDec='',
                        this.price='',
                        this.rating='',
                        this.category='',
                        this.$emit('respon-add-product', result.data)
                }).catch((err) => {
                    console.log(err)
                });
        }
    }
})