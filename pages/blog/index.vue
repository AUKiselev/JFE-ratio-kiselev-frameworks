<template lang="pug">
.blog
  SpinnerLoader
  BlockWithImage.title-block(
    :mod="isMobile ? '_bg-hidden' : ''"
    :bgImage="titleData.bgImage"
    :content="topBlockData"
  )
  EditorsPicks.editors-picks
  .loader-block(@click="loadMoreArticles()")
</template>

<script>
import TITLE_BLOCK from '@/mock/title/TitleBlock.json';

import { getDataForBlockWithImage } from '@/helpers/getDataForBlockWithImage';

export default {
  name: "BlogPage",

  data() {
      return {
          titleData: Object.freeze(TITLE_BLOCK),
          articleCount: 10
      };
  },

  computed: {
    isMobile () {
      return this.$mq === 'sm';
    },

    topBlockData() {
      if (this.$store.state.articles[0] && Object.keys(this.$store.state.articles[0])) {
        return getDataForBlockWithImage(this.$store.state.articles[0], this.titleData.content);
      }
      return this.titleData.content;
    },
  },

  mounted() {
    this.observe();
  },

  methods: {
    loadMoreArticles() {
      if (this.$store.state.articles.length >= 145) return;
      this.$store.dispatch('getArticles', {
        skip: this.articleCount
      });
      this.articleCount += 10;
    },

    observe() {
      const loadingObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadMoreArticles();
          }
        });
      });

      loadingObserver.observe(document.querySelector('.loader-block'));
    }
  }
};
</script>

<style lang="sass" scoped>
.title-block
  margin-top: 45px

.editors-picks
  margin-top: 50px

.loader-block
  height: 80px

@include pre-tablet
  .loader-block
    height: 50px
</style>