<template lang="pug">
.post
  ErrorPopup(v-bind="modal")
  BlockWithImage(mod="_post")
  section.content
    h2.title.article-headline(v-html="getArticleTitle")
    .content-info.text-info
      span.author(v-html="getAuthorName")
      span.date(v-html="postData.date")
    .hashtags.text-info
      template(v-for="(item, index) of getArticleTags")
        span.hashtag(v-html="`#${item} `" :key="`post-hashtags-${index}`")
    p.paragraph.text-content(v-html="getArticleBody")
  section.author-block
    p.label(v-html="authorBlockTitle")
    .author-content
      img.avatar(:src="getAuthorAvatar")
      .author-info
        p.name.headline-3(v-html="getAuthorName")
        p.login.text-info(v-html="getAuthorEmail")
        p.about.text-info__black(v-html="postData.authorBlock.about")
  SwitchesBlock(
    :prevText="getShortPrevArticleTitle"
    :nextText="getShortNextArticleTitle"
    @haveNoArticle="showModal"
  )
</template>

<script>
import SwitchesBlock from "@/components/switches/SwitchesBlock.vue";
import { getShortString } from "~/helpers/getShortValue";
import POST_CONTENT from "@/mock/post/Post.json";

export default {
  name: "PostPage",

  components: {
    SwitchesBlock
  },

  transitions: 'page',

  data() {
      return {
          postData: Object.freeze(POST_CONTENT),
          modal: {
            isShow: false,
            errorText: 'Предыдущей статьи не существует'
          }
      };
  },

  computed: {
    getArticleTitle() {
      return this.$store.state.currentArticle.title;
    },

    getArticleTags() {
      return this.$store.state.currentArticle.tags;
    },

    getArticleBody() {
      return this.$store.state.currentArticle.body;
    },

    authorBlockTitle() {
      return 'ABOUT THE AUTHOR';
    },

    getAuthorName() {
      return this.$store.getters.getAuthorName(this.$store.state.currentAuthor?.id);
    },

    getAuthorEmail() {
      return this.$store.state.currentAuthor?.email || '';
    },

    getAuthorAvatar() {
      return this.$store.state.currentAuthor?.image || '';
    },

    articleId() {
      const lastSlashIndex = this.$route.path.lastIndexOf('/');

      return this.$route.path.slice(lastSlashIndex + 1);
    },

    getShortPrevArticleTitle() {
      if (+this.articleId > 1) {
        const prevArticle = this.$store.state.articles.find(article => article.id === +this.articleId - 1);

        if (prevArticle?.title && prevArticle?.title.length > 20) {
          return getShortString(prevArticle.title, 20);
        }

        return prevArticle?.title || '';
      }

      return {
          isFirstArticle: true,
          descriptionText: 'It\'s first article yet'
        };
    },

    getShortNextArticleTitle() {
      const nextArticle = this.$store.state.articles.find(article => article.id === +this.articleId + 1);

      if (nextArticle?.title && nextArticle?.title.length > 20) {
        return getShortString(nextArticle.title, 20);
      }
      
      return nextArticle?.title || '';
    },
  },

  mounted() {
    this.$store.dispatch('getCurrentArticleWithAuthor', this.articleId);
    if (this.articleId > 1) {
      this.$store.dispatch('getArticle', +this.articleId - 1);
    }
    this.$store.dispatch('getArticle', +this.articleId + 1);
  },

  methods: {
    goNextPage() {
        return this.$router.push({name: `blog-post-id`, params: {id: this.$store.state.currentArticle.id + 1}});
    },

    goPrevPage() {
      if (this.$store.state.currentArticle.id > 1) {
        return this.$router.push({name: `blog-post-id`, params: {id: this.$store.state.currentArticle.id - 1}});
      }
      this.modal.isShow = true;
      setTimeout(() => {
        this.modal.isShow = false;
      }, 2000);
    },

    showModal() {
      this.modal.isShow = true;
      setTimeout(() => {
        this.modal.isShow = false;
      }, 2000);
    }
  },
};
</script>

<style lang="sass" scoped>
.post
  margin-top: 40px

.content
  max-width: 655px
  margin: 55px auto 0

  .title
    text-align: center

.content-info, .hashtags
  margin-top: 15px
  text-align: center

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
  margin-top: 25px

.author-block
  max-width: 655px
  margin: 70px auto 0

.author-content
  display: flex
  justify-content: space-between
  margin-top: 15px

  .avatar
    max-width: 160px
    max-height: 160px
    width: 100%
    height: auto
    border-radius: 50%

  .author-info
    max-width: 460px

    .about
      margin-top: 15px

@include pre-tablet
  .content
    max-width: 700px
    margin: 25px auto 0

  .content-info, .hashtags
    margin-top: 8px

  .text-content
    margin-top: 8px

  .author-block
    max-width: 700px
    margin: 40px auto 0

@include mobile
  .content-info,
  .hashtags
    display: none

  .text-content
    margin-top: 20px

  .author-block
    margin: 25px auto 0

  .author-content
    justify-content: space-around
    align-items: flex-start
    .avatar
      max-width: 80px
      max-height: 80px

    .author-info
      margin-top: 30px
</style>