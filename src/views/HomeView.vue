<template>
  <div class="home" @click="openPokedex">
    <div v-if="!pokedexOpenOrClosed">
      <PokedexClosed />
    </div>
    <div v-else>
      <Pokedex />
    </div>
    <v-row>
      <v-col class="d-flex align-center justify-center my-6" cols="12">
        <a href="https://github.com/bouboudev" target="_blank">
          <v-card class="pt-1 px-2" elevation="12">
            <h2>Pokédex de <span class="red--text"> Bouzid KRITA </span></h2>
          </v-card>
        </a>
      </v-col>
    </v-row>
  </div>
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
</style>
