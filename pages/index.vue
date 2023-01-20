<template lang="pug">
.main-page
  BlockWithImage.title-block(
    :mod="isMobile ? '_bg-hidden' : ''"
    :bgImage="titleData.bgImage"
    :content="topBlockData"
  )
  EditorsPicks.editors-picks
  BlockWithImage.footer-block(
    :mod="isMobile ? '_bg-hidden' : ''"
    :bgImage="footerData.bgImage"
    :content="footerBlockData"
  )
</template>

<script>
import TITLE_BLOCK from '@/mock/title/TitleBlock.json';
import FOOTER_BLOCK from '@/mock/footer/FooterBlock.json';

import { getDataForBlockWithImage } from '@/helpers/getDataForBlockWithImage';

export default {
  name: "HomePage",

  data() {
      return {
          titleData: Object.freeze(TITLE_BLOCK),
          footerData: Object.freeze(FOOTER_BLOCK),
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

    footerBlockData() {
      const lastArticle = this.$store.state.articles[this.$store.state.articles.length - 1] || null;
      if (lastArticle && Object.keys(lastArticle)) {
        return getDataForBlockWithImage(lastArticle, this.footerData.content);
      }
      return this.titleData.content;
    }
  }
};
</script>

<style lang="sass" scoped>
.title-block
  margin-top: 45px

.editors-picks
  margin-top: 50px

.footer-block
  margin-top: 75px
</style>