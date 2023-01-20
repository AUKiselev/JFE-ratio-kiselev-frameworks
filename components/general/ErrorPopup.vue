<template lang="pug">
.error-modal(:class="{'is-show': isShow}")
  p.error-text(v-html="errorText")
</template>

<script>
export default {
  name: 'ErrorPopup',

  props: {
    errorText: {
      type: String,
      default: 'Произошла неизвестная ошибка'
    },
    isShow: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="sass" scoped>
.error-modal
  position: fixed
  top: -1000px
  right: 10px
  max-width: 400px
  width: 100%
  padding: 20px 30px
  border: 2px solid $red
  text-align: center
  color: $red
  transition: top .5s
  z-index: 10000

  &.is-show
    top: 10px
</style>