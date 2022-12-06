<template>
  <v-container>
    <!-- pokedex closed -->
    <v-row class="d-flex justify-center">
      <div id="pokedex">
        <v-tooltip color="warning">
          <template v-slot:activator="{ on, attrs }">
            <v-img
              v-bind="attrs"
              v-on="on"
              id="img_pokedex"
              :lazy-src="require('@/assets/pokedex_closed.png')"
              :src="require('@/assets/pokedex_closed.png')"
              width="550"
            >
            </v-img>
          </template>
          <h1 class="my-2">Ouvrir le Pokédex</h1>
        </v-tooltip>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PokeDex",
  data: () => ({}),
  methods: {},
};
</script>

<style scoped>
#pokedex {
  position: relative;
}
#img_pokedex {
  cursor: pointer;
}
</style>
