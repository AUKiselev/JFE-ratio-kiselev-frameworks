<template lang="pug">
div.block-with-image(:class="mod")
  img.block-bg(v-bind="bgImage")
  section.content-block
    span.label(v-html="content.label")
    h3.title.headline-3(v-html="content.title")
    .content-info.text-info
      span.author(v-html="getAuthor")
      span.date(v-html="content.date")
    p.text-content(v-html="content.textContent")
</template>

<script>
export default {
  name: "BlockWithImage",

  props: {
    mod: {
      type: String,
      default: ""
    },
    bgImage: {
      type: Object,
      default: () => ({
        src: "/img/title-block/image-bg.png",
      })
    },
    content: {
      type: Object,
      default: () => ({
        label: "FEATURED ARTICLE",
        title: "World&rsquo;s Most Dangerous Technology Ever Made.",
        authorId: 1,
        date: "May 7, 2019 (10 mins read)",
        // eslint-disable-next-line max-len
        textContent: "Proident aliquip velit qui commodo officia qui consectetur dolor ullamco aliquip elit incididunt. Ea&nbsp;minim ex&nbsp;consectetur excepteur. Ex&nbsp;laborum nostrud mollit sint consectetur Lorem amet aliqua do&nbsp;enim. Commodo duis dolor anim excepteur. In&nbsp;aliquip mollit nulla consequat velit magna."
      })
    }
  },

  computed: {
    getAuthor() {
      return this.$store.getters.getAuthorName(this.content.authorId);
    }
  }
};
</script>

<style lang="sass" scoped>
.block-with-image
  position: relative
  min-height: 600px

  & .block-bg
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    width: 100%
    height: 100%

  & .content-block
    position: absolute
    top: -1px
    left: 45px
    max-width: 510px
    width: 38.75%
    padding: 75px 40px 95px
    background-color: $white

  & .content-info
    margin-top: 12px

  & .date
    &::before
      content: ''
      display: inline-block
      width: 3px
      height: 3px
      margin: 0 10px 2px
      background-color: #1C1C1C80
      border-radius: 50%

  & .text-content
    margin-top: 14px

  &._footer-block
    & .content-block
      top: 55px
      right: 80px
      left: auto

  &._post
    & .content-block
      display: none

  &._bg-hidden
    min-height: auto

    & .block-bg
      display: none

    & .content-block
      position: static
      max-width: none
      width: 100%
      padding: 0

@include pre-tablet
  .block-with-image
    min-height: 600px

    & .content-block
      max-width: 375px
      padding: 20px

    & .title
      margin-top: 8px

    & .content-info
      margin-top: 8px

    & .text-content
      margin-top: 8px

@include mobile
  .block-with-image
    &._post
      min-height: auto

      .block-bg
        position: relative
        height: auto
</style>