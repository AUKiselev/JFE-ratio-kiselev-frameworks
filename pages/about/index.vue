<template lang="pug">
.about
  h2.title.article-headline(v-html="aboutData.title")
  .block-with-image
    .text-content
      template(v-for="(item, index) of blockWithImageText")
        p.text(v-html="item" :key="`about-upper-text-${index}`")
    img.thumbnail(v-bind="aboutData.img")
  .mainText
    template(v-for="(item, index) of mainText")
      p.paragraph.text-content(v-html="item" :key="`about-main-text-${index}`")
</template>

<script>
import ABOUT_CONTENT from '@/mock/about/About.json';

export default {
  name: "AboutPage",

  data() {
    return {
      aboutData: Object.freeze(ABOUT_CONTENT),
    };
  },

  computed: {
    blockWithImageText() {
      return this.aboutData.paragraphs.slice(0, 2);
    },

    mainText() {
      return this.aboutData.paragraphs.slice(2);
    }
  }
};
</script>

<style lang="sass" scoped>
.about
  max-width: 860px
  margin: 180px auto 0 

.title
  text-align: center

.block-with-image
  display: flex
  column-gap: 40px
  margin-top: 30px

  & .text + .text
    margin-top: 30px

.thumbnail
  max-width: 370px
  max-height: 300px
  width: 100%
  height: auto

.mainText
  margin: 30px 0 15px

.paragraph + .paragraph
  margin-top: 30px

@include pre-tablet
  .about
    margin: 40px auto 0

  .block-with-image
    column-gap: 18px
    margin-top: 50px

    & .text + .text
      margin-top: 25px

  .paragraph + .paragraph
    margin-top: 25px

@include mobile
  .block-with-image
    flex-direction: column-reverse
    row-gap: 25px
    margin-top: 30px
</style>