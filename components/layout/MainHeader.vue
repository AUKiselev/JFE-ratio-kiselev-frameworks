<template lang="pug">
.main-header
  NuxtLink(to="/")
    img.logo(v-bind="headerData.logo")
  template(v-if="isMobile")
    button.burger-menu__button(:class="{'_opened': menuIsOpen}" @click="menuTogglerHandler")
      p.menu-button(:class="{'_opened': menuIsOpen}")
        span
    .plug(v-if="menuIsOpen" @click="menuTogglerHandler")
    nav.burger-menu(:class="{'_opened': menuIsOpen}")
      ul.burger-menu__menu-list
        template(v-for="(item, index) of headerData.navMenu")
          li(:key="`header-nav-meu-${index}`")
            NuxtLink.text-link.burger-menu__item(
              v-html="item.title"
              :to="item.to"
              @click.native="menuTogglerHandler"
            )
  template(v-else)
    nav.main-header__menu
      ul.main-header__menu-list
        template(v-for="(item, index) of headerData.navMenu")
          li(:key="`header-nav-meu-${index}`")
            NuxtLink.text-link(v-html="item.title" :to="item.to")
</template>

<script>
import HEADER from '@/mock/header/Header.json';

export default {
  name: 'MainHeader',

  data() {
    return {
      headerData: Object.freeze(HEADER),
      menuIsOpen: false
    };
  },

  computed:{
    isMobile() {
      return this.$mq === 'sm';
    }
  },

  methods: {
    menuTogglerHandler() {
      this.menuIsOpen = !this.menuIsOpen;
    },
  }
};
</script>

<style lang="sass" scoped>
.main-header
  display: flex
  align-items: center

  .main-header__menu
    margin-left: 50px
  .main-header__menu-list
    display: flex
    column-gap: 20px
    list-style: none

  .nuxt-link-exact-active
    font-weight: 700

  .burger-menu__button
    position: fixed
    top: 27px
    right: 9px
    padding: 18px 17px
    border: none
    background-color: rgba(255, 255, 255, 1)
    z-index: 11

    &._opened
      background-color: rgba(255, 255, 255, 0)

    & .menu-button
      display: flex
      align-items: center
      width: 36px
      height: 24px
      cursor: pointer

      & span
        position: relative
        display: block
        width: 36px
        height: 3px
        background-color: $headline-black
        transition: transform .3s

        &::before,
        &::after
          content: ""
          display: block
          position: absolute
          width: 36px
          height: 3px
          background-color: $headline-black

        &::before
          top: -10px
          transition: transform .3s, top .3s

        &::after
          bottom: -10px
          opacity: 1
          transition: opacity .3s

      &._opened

        & span
          background-color: $white
          transform: rotate(45deg)

          &::before
            top: 0
            background-color: $white
            transform: rotate(-90deg)

          &::after
            visibility: hidden
            opacity: 0

  .plug
    position: fixed
    left: 0
    width: calc(100vw - 200px)
    height: 200vh
    z-index: 10

  .burger-menu
    position: fixed
    right: -200px
    width: 200px
    height: 200vh
    background-color: $additional-black
    z-index: 10
    transition: right .3s

    &__menu-list
      position: fixed
      top: 100px
      right: -200px
      display: flex
      flex-direction: column
      row-gap: 20px
      z-index: 11
      transition: right .3s

    &__item
      position: relative
      color: $white

      &::before
        content: ""
        position: absolute
        top: 4px
        left: -20px
        width: 10px
        height: 10px
        background-color: rgba(0, 0, 0, 0)
        border: 2px solid $white
        border-radius: 50%

      &.nuxt-link-exact-active

        &::before
          background-color: $white

    &._opened
      right: 0

      & .burger-menu__menu-list
        right: 80px

    

@include pre-tablet
  .main-header
    justify-content: space-between
</style>