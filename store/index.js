export const state = () => ({
  isFetching: false,
  articles: [],
  currentArticle: {},
  authors: [],
  currentAuthor: {}
});

export const mutations = {
  FETCHING(state) {
    state.isFetching = true;
  },

  FETCHED(state) {
    state.isFetching = false;
  },

  SET_ARTICLES(state, payload) {
    state.articles = payload;
  },

  ADD_ARTICLE(state, payload) {
    state.articles.push(payload);
  },

  ADD_AUTHOR(state, payload) {
    state.authors.push(payload);
  },

  SET_CURRENT_ARTICLE(state, payload) {
    state.currentArticle = payload;
  },

  SET_CURRENT_AUTHOR(state, payload) {
    state.currentAuthor = payload;
  },
};

export const getters = {
  getAuthorName(state) {
    return authorId => {
      const author = state.authors.find(item => item.id === authorId);

      if (author?.firstName && author?.lastName) {
        return `${author.firstName} ${author.lastName}`;
      }

      return '';
    };
  }
};

export const actions = {
  async getArticles({ commit, state, dispatch }, { limit=10, skip=0 }) {
    commit('FETCHING');
    try {
      const responseData = await this.$axios.$get(`posts?limit=${limit}&skip=${skip}`);

      if (!state.articles.length) {
        commit('SET_ARTICLES', responseData.posts);
      } else {
        dispatch('addArticles', responseData.posts);
      }
    } catch (error) {
      console.error(error.data);
    } finally {
      commit('FETCHED');
    }
  },

  async getArticle({ commit, dispatch }, articleId) {
    commit('FETCHING');
    try {
      const responseData = await this.$axios.$get(`posts/${articleId}`);

      await dispatch('articleValidationAndAdd', responseData);
      await dispatch('getAuthor', responseData.userId);
      return responseData;
    } catch (error) {
      console.error(error.data);
    } finally {
      commit('FETCHED');
    }
  },

  async getCurrentArticleWithAuthor({ commit, dispatch }, articleId) {
    commit('FETCHING');
    try {
      const responseData = await dispatch('getArticle', articleId);

      commit('SET_CURRENT_ARTICLE', responseData);

      await dispatch('setCurrentAuthor', responseData.userId);

    } catch (error) {
      console.error(error.data);
    } finally {
      commit('FETCHED');
    }
  },

  async getAuthor({ state, commit }, authorId) {
    commit('FETCHING');
    try {
      const responseData = await this.$axios.$get(`users/${authorId}`);

      const isAddedAuthor = state.authors.find(elem => {
        return elem.id === responseData.id;
      });

      if (isAddedAuthor) return;

      commit('ADD_AUTHOR', responseData);
    } catch (error) {
      console.error(error.data);
    } finally {
      commit('FETCHED');
    }
  },

  setCurrentAuthor({ state, commit }, authorId) {
    const currentAuthor = state.authors.find(elem => elem.id === authorId);

    commit('SET_CURRENT_AUTHOR', currentAuthor);
  },

  articleValidationAndAdd({ commit, state }, article) {
    const isAddedArticle = !!state.articles.find(e => e.id === article.id);
    if (!isAddedArticle) {
      commit('ADD_ARTICLE', article);
    }
  },

  async addArticles({ dispatch }, articles) {
    for (let i = 0; i < articles.length; i++) {
      await dispatch('articleValidationAndAdd', articles[i]);
    }
  }
};