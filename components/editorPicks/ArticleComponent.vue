<template lang="pug">
NuxtLink.article-component(
  :to="`/blog/post/${articleId}`"
  :articleId="articleId"
  @mouseover.native="isHovered = true"
  @mouseleave.native="isHovered = false"
)
  img.thumbnail(:src="img")
  .content
    span.label(v-html="label")
    h4.title.headline-3(
      v-html="getShortTitle"
      :to="`/blog/post/${articleId}`"
      :articleId="articleId"
    )
    .content-info.text-info
      span.author(
        v-html="getAuthor"
        title="По клику сюда должна открываться страница с автором"
      )
      span.date April 25, 2012 (6 mins read)
    p.text-content(v-html="getShortContent")
</template>

<script>
import { getShortString } from '@/helpers/getShortValue';

export default {
  name: 'ArticleComponent',

  props: {
    label: {
      type: String,
      default: 'ARTICLE'
    },
    articleId: {
      type: Number,
      default: 0
    },
    authorId: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: '/img/articles/thumbnail.png'
    }
  },

  data() {
    return {
      isHovered: false
    };
  },

  computed: {
    getShortTitle() {
      if (this.title.length > 28 && !this.isHovered) {
        return getShortString(this.title, 28);
      }
      return this.title;
    },
    getShortContent() {
      if (this.content.length > 290) {
        return getShortString(this.content, 290);
      }
      return this.content;
    },

    getAuthor() {
      return this.$store.getters.getAuthorName(this.authorId);
    }
  },

  mounted() {
    this.$store.dispatch('getAuthor', this.authorId);
  },
};
</script>

<style lang="sass" scoped>
.article-component
  display: flex
  column-gap: 55px
  transition: scale .3s
  text-decoration: none
  &:hover
    cursor: pointer
    scale: 1.1

.thumbnail
  max-width: 375px
  max-height: 300px
  width: 100%
  height: auto

.content-info
  margin-top: 12px

.title
  display: block
  text-decoration: none

.author
  position: relative
  transition: color .3s
  &::after
    content: ""
    position: absolute
    bottom: -3px
    left: 50%
    transform: translateX(-50%)
    margin: 0 auto
    height: 1px
    width: 0
    background-color: $additional-black
    transition: width .3s, background-color .3s
  &:hover
    color: $headline-black
    &::after
      width: 100%
      background-color: $headline-black

.date
  &::before
    content: ''
    display: inline-block
    width: 3px
    height: 3px
    margin: 0 10px 2px
    background-color: #1C1C1C80
    border-radius: 50%

.text-content
  margin-top: 14px

@include mobile
  .article-component
    flex-direction: column
    align-items: center

  .content
    max-width: 375px
</style>