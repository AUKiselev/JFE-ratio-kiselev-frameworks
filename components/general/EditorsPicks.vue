<template lang="pug">
section.editors-picks
  h2.title.headline-2(v-html="titleText")
  section.articles
    template(v-for="(item, index) of getArticles")
      ArticleComponent.article(
        :title="item.title"
        :content="item.body"
        :articleId="item.id"
        :authorId="item.userId"
      )
</template>

<script>
import ArticleComponent from '@/components/editorPicks/ArticleComponent';

export default {
  name: 'EditorsPicks',

  components: {
    ArticleComponent
  },

  computed: {
    isMainPage() {
      return this.$route.path === '/';
    },
    titleText() {
      return 'Editor&rsquo;s Picks';
    },
    getArticles() {
      if (this.isMainPage) return this.$store.state.articles.slice(0, 5);
      return this.$store.state.articles;
    }
  },
  
  mounted() {
    if (this.isMainPage) {
      this.$store.dispatch('getArticles', {
        limit: 5
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.title
  width: fit-content
  margin: 0 auto

  &::after
    content: ''
    display: block
    width: 65.5%
    height: 5px
    margin: 15px auto 0
    background-color: $headline-black

.articles
  max-width: 856px
  margin: 55px auto 0

.article + .article
  margin-top: 70px

@include pre-tablet
  .title

    &::after
      margin: 5px auto 0

  .article + .article
    margin-top: 30px

@include mobile
  .articles
    margin: 30px auto 0
</style>