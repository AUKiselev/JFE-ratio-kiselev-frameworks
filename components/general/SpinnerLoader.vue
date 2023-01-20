<template lang="pug">
.loader(:class="{'is-show': isShow}")
</template>

<script>
export default {
  name: 'SpinnerLoader',

  computed: {
    isShow() {
      return this.$store.state.isFetching;
    }
  }
};
</script>

<style lang="sass" scoped>
.loader
  position: fixed
  display: none
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 80px
  height: 80px
  z-index: 1000

  &.is-show
    display: block

.loader:after
  content: " "
  position: relative
  display: block
  width: 64px
  height: 64px
  margin: 8px
  border-radius: 50%
  border: 6px solid #fff
  border-color: #000 transparent #000 transparent
  animation: lds-dual-ring 1.2s linear infinite

@keyframes lds-dual-ring 
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>