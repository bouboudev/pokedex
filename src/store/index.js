import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonResearch: {},
  },
  getters: {
    getPokemonResearch: (state) => {
      return state.pokemonResearch;
    },
  },
  mutations: {
    setPokemonResearch: (state, payload) => {
      state.pokemonResearch = payload;
    },
  },
  actions: {
    setPokemonResearch: (context, payload) => {
      context.commit("setPokemonResearch", payload);
    },
  },
  modules: {},
});
