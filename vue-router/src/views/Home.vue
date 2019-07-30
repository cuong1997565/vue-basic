<template>
  <div>
    <div class="d-flex mt-4 justify-content-between">
        <button @click="getPreArticles()" :disabled="articles.prev_page_url === null" class="btn btn-warning">Prev Page</button>
        <button @click="getNextArticles()" :disabled="articles.next_page_url === null" class="btn btn-warning"> Next Page</button>
    </div>
    <div class="row">
      <div v-if="articles.data && !loading" style="width:100%">
        <div class="col-md-8 offset-md-2" v-for="article in articles.data" :key="article.id">
          <Article :article="article" />
        </div>
      </div>
      <div class="loader text-center" style="width:100%" v-else>
          <i class="fa fa-5x fa-spin fa-spinner"></i>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from "@/config";
import Article from "@/components/Article.vue";
export default {
  mounted() {
    this.getArticles();
  },
  components: {
    Article
  },
  data() {
    return {
      articles: {},
      loading : true
    };
  },
  methods: {
    getArticles(url = `${config.apiUrl}/articles`) {
        this.loading = true;
      axios.get(url).then(response => {
        this.loading = false;
        this.articles = response.data.data;
      });
    },
    getNextArticles() {
        this.getArticles(this.articles.next_page_url);
    },
    getPreArticles() {
        this.getArticles(this.articles.next_page_url);
    }
  }
};
</script>
