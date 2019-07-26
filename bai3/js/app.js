Vue.component('card', {
    props: ['title', 'content'],
    data() {
        return {
            claps : 0
        }
    },
    template: `
    <div class="card">
    <div class="card-body">
        <h3 class="card-title">
           {{ title }}
        </h3>
    </div>
    <div class="card-text" style="padding: 12px">
        {{ content }}
    </div>
    <div class="text-center text-muted display-3"> {{ claps }} </div>
    <button @click="clapForArticle" class="btn btn-info btn-sm">Clap for me</button>
    <button @click="deleteArticle" class="btn btn-danger btn-sm"> Delete Me </button>
</div>
    `,
    methods: {
        deleteArticle() {
           this.$emit('delete-article',this.title);
        },
        clapForArticle() {
            this.claps ++;
        }
    }
})
new Vue({
    el: "#app",
    data: {
        articles: [
            {
                title: "Build fullstack applications with laravel and vuejs",
                content: "ontrary to popular belief . Lorem Ipsum is not simply"
            },
            {
                title: "Vuejs for beginners",
                content: "Loarem basic text"
            },
            {
                title: "New laravel course",
                content: "Some lorem content"
            },
        ]
    },
    methods: {
        removeArticle(event) {
            this.articles = this.articles.filter(articles => articles.title !== event);
        }
    }
})