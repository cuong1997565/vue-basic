<template>
    <div class="card my-3">
        <div class="card-header">
            {{ article.title }}
        </div>
        <div class="card-body">
            <div v-html="article.content"></div>
            <router-link :to="`/article/${article.id}`" class="btn btn-primary">Read more</router-link>
        </div>
    </div>
</template>
<script>
export default {
    props: ["article"]
}
</script>
