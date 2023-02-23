<template>
  <v-container>
    <div v-show="!pokedexOpenOrClosed">
      <PokedexClosed @openPokedex="openPokedex" />
    </div>
    <transition name="fade">
      <div v-if="pokedexOpenOrClosed">
        <Pokedex @close="pokedexOpenOrClosed = !pokedexOpenOrClosed" />
      </div>
    </transition>
    <v-row>
      <v-col class="d-flex align-center justify-center mt-3" cols="12">
        <a href="https://github.com/bouboudev" target="_blank">
          <v-card class="pt-1 px-2" elevation="12">
            <h4>Pokédex de <span class="red--text"> Bouzid KRITA </span></h4>
          </v-card>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Pokedex from "@/components/Pokedex.vue";
import PokedexClosed from "@/components/PokedexClosed.vue";

export default {
  name: "HomeView",
  components: {
    PokedexClosed,
    Pokedex,
  },
  data: () => ({
    pokedexOpenOrClosed: false,
  }),
  methods: {
    openPokedex() {
      this.pokedexOpenOrClosed = true;
    },
    closePokedex() {
      this.pokedexOpenOrClosed = false;
    },
  },
};
</script>
<style scoped>
a {
  outline: none;
  text-decoration: none;
}
a:link {
  color: #000000;
}
a:visited {
  color: #000000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
