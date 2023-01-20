<template lang="pug">
.switches
  SwitchesItem(
    mod="_prev" type="prev"
    :descriptionText="typeof prevText === 'string' ? prevText : prevText.descriptionText"
    :isFirstArticle="typeof prevText === 'string' ? false : prevText.isFirstArticle"
    @haveNoArticle="haveNoArticle"
  )
  SwitchesItem(mod="_next" type="next" :descriptionText="nextText" @haveNoArticle="haveNoArticle")
</template>

<script>
import SwitchesItem from './SwitchesItem.vue';

export default {
  name: 'SwitchesBlock',

  components: {
    SwitchesItem
  },

  props: {
    prevText: {
      type: [String, Object],
      default: ''
    },
    nextText: {
      type: String,
      default: ''
    }
  },

  methods: {
    haveNoArticle() {
      return this.$emit('haveNoArticle');
    }
  }
};
</script>

<style lang="sass">
.switches
  position: relative
  bottom: -25px
  display: flex
  justify-content: space-between
  height: 150px
  margin-top: 100px

@include pre-tablet
  .switches
    bottom: -27px
    height: 50px
    margin-top: 25px
  
@include mobile
  .switches
    bottom: -30px
    margin-top: 0
</style>