<template lang="pug">
.wrapper
  MainHeader
  Nuxt
</template>

<script>
import MainHeader from '@/components/layout/MainHeader.vue';

export default {
  components: {
    MainHeader,
  }
};
</script>

<style lang="sass" scoped>
.wrapper
  padding: 30px 25px 25px
</style>