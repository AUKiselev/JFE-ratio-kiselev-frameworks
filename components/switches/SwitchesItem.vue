<template lang="pug">
.switch-item(:class="mod")
  button.switch-button(
    :class="{'_disabled': isFirstArticle}"
    @click="goAnotherPage"
    :disabled="isFirstArticle"
  )
  p.description-text(v-html="formatedDescriptionText")
</template>

<script>
export default {
  name: 'SwitchesItem',

  props: {
    mod: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    descriptionText: {
      type: String,
      default: ''
    },
    isFirstArticle: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    formatedDescriptionText() {
      if (this.type === 'prev') {
        return `Go back: <span class="bold">${this.descriptionText}</span>`;
      }
      if (this.type === 'next') {
        return `Next up: <span class="bold">${this.descriptionText}</span>`;
      }
      return 'Неверный тип кнопки';
    },
  },

  methods: {
    goAnotherPage() {
      if (this.type === 'next') {
        return this.$router.push({name: `blog-post-id`, params: {id: this.$store.state.currentArticle.id + 1}});
      }
      if (this.type === 'prev') {
        if (this.$store.state.currentArticle.id > 1) {
          return this.$router.push({name: `blog-post-id`, params: {id: this.$store.state.currentArticle.id - 1}});
        }
        return this.$emit('haveNoArticle');
      }
      return console.log('Ошибка данных');
    }
  },
};
</script>

<style lang="sass" scoped>
.switch-item
  position: relative
  display: flex
  align-items: center
  column-gap: 35px
  width: 50%

  ::v-deep .bold
    font-weight: 700

  &._prev
    left: -25px

    & .switch-button
      background:
        position: center left 30%
        image: url('~assets/icons/left-arrow.svg')

  &._next
    right: -25px
    flex-direction: row-reverse

    & .switch-button
      transform: rotate(180deg)
      background:
        position: center left 30%
        image: url('~assets/icons/left-arrow.svg')

.switch-button
  max-width: 150px
  max-height: 150px
  width: 100%
  height: 100%
  background:
    color: $headline-black
    repeat: no-repeat
  cursor: pointer

  &._disabled
    background: 
      color: $additional-black
    cursor: default

@include pre-tablet
  .switch-item
    &._prev
      & .switch-button
        background:
          position: center left 40%
          size: 60% auto

    &._next
      & .switch-button
        transform: rotate(180deg)
        background:
          position: center left 40%
          size: 60% auto

  .switch-button
    max-width: 50px
    max-height: 50px

@include mobile
  .description-text
    display: none
</style>