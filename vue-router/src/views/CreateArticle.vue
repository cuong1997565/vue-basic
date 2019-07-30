<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card my-5">
                    <div class="card-body">
                        <picture-input 
                        accept = "image/jpeg,image/png"
                        size="5"
                        button-class="btn btn-danger"
                        :custom-strings = "{
                            upload : '<h1>Bummer!</h1>',
                            drag : 'Drag a GIF or GTFO'
                        }"
                        @change="onChange"
                        />
                        <select class="form-control mt-3" v-model="category">
                            <option selected>Select a category</option>
                            <option :value="category.id" :key="category.id" v-for="category in categories">
                                {{ category.name }}
                            </option>
                        </select>
                        <input type="text" v-model="title" placeholder="title" class="form-control mb-3 mt-3">
                        <wysiwyg v-model="content" />
                        <div class="text-center">
                            <button @click="createArticle()" class="btn-success btn btn-lg mt-3" :disabled="loading">
                                <i class="fa fa-spin fa-spinner" v-if="loading"></i>
                                {{ loading ? '' : 'Create Article' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PictureInput from 'vue-picture-input';
import axios from 'axios';
import config from '@/config';
export default {
    beforeRouteEnter(to, from, next) {
        if(!localStorage.getItem("auth")) {
            return next({path : "/login"});
        }
        next();
    },
    data() {
        return {
            title : "",
            content : "",
            image : null,
            categories : [],
            category : "",
            loading : false
        }
    },
    components : {
        PictureInput
    },
    mounted() {
          this.getCategories();
    },
    methods : {
        onChange(image) {
            this.image = image;
        },
        createArticle() {
            this.loading = true;
            const form = new FormData();
            form.append('file', this.image);
            form.append('upload_preset','g5ziunzg');
            form.append('api_key','132255634713478');
            axios.post('https://api.cloudinary.com/v1_1/bahdcoder/image/upload',form)
            .then((res) => {
                this.loading = false;
                 this.submitForm(res);
            })
            .catch(err => {
                this.loading = false;
                this.$noty.error("Image upload false")
            })

        },

        submitForm(response) {
            axios.post(`${config.apiUrl}/articles`, {
                title : this.title,
                content : this.content,
                category_id : this.category,
                imageUrl : response.data.secure_url
            },{
                headers : {
                    Authorization : `Bearer ${this.$root.auth.token}`
                }
            }).then(() => {
                this.loading = false;
                this.$noty.success("Article created successfully.");
                this.$router.push("/home");
            }).catch(() => {
                this.loading = false;
                this.$noty.error("Oops ! Something went wrong");
            })
        },

        getCategories() {
            const categories = localStorage.getItem("categories");
            if(categories) {
                this.categories = JSON.parse(categories);
                return ;
            }
            axios.get(`${config.apiUrl}/categories`).then(res => {
                this.categories = res.data.categories;
                localStorage.setItem("categories", JSON.stringify(this.categories));
            })
        }
    }
}
</script>
