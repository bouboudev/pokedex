<template>
  <v-container>
    <!-- pokedex closed -->
    <v-row class="d-flex align-center justify-center mt-12">
      <div id="pokedex">
        <v-tooltip top color="warning">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" id="openPokedex">
              <v-btn large icon @click="openPokedex" class="white--text"
                ><v-icon>mdi-open-in-app</v-icon></v-btn
              >
            </div>
          </template>
          <span>Ouvrir le pokédex</span>
        </v-tooltip>
        <v-img
          id="img_pokedex"
          :src="require('@/assets/pokedex_closed.png')"
          width="550"
        >
          <div v-if="pokemons.length" id="pokemonNearby">
            <h6>Pokémons à proximité :</h6>
          </div>
          <div id="pokemonList" class="d-flex flex-column align-end">
            <v-data-table
              :headers="headers"
              :items="pokemons"
              :items-per-page="8"
              class="elevation-1 table gameboy"
              hide-default-footer
              :footer-props="{
                itemsPerPageOptions: [9],
              }"
            >
              <!-- before item -->
              <template v-slot:top>
                <systemBar widthBar="425" />
              </template>

              <template v-slot:item="{ item }">
                <tr @click="findThePokemon(item)" class="pointer text-4">
                  <td>{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <td>
                    <div class="d-flex flex-column">
                      <span v-for="(type, index) in item.types" :key="index">
                        <img height="15px" :src="colorBadge(type.type.name)" />
                      </span>
                    </div>
                  </td>
                  <td><v-img :src="item.image" width="50" /></td>
                </tr>
              </template>
              <!-- change no data available -->
              <template v-slot:no-data>
                <v-btn
                  color="gameboydark"
                  @click="pokemonNearby"
                  rounded
                  x-small
                  class="mt-6 white--text text--lighten-1"
                >
                  <v-icon small>mdi-pokemon-go</v-icon>
                  <span class="text-body-2">
                    Rechercher des pokemons à proximité
                  </span>
                </v-btn>
                <div class="d-flex align-center justify-center mt-6">
                  <v-img
                    max-width="100px"
                    src="https://media.tenor.com/gjxJnAFTKNAAAAAi/hoean-staters-pokemon.gif"
                  >
                  </v-img>
                </div>
              </template>
            </v-data-table>
          </div>
        </v-img>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import SystemBar from "./SystemBar.vue";
export default {
  name: "PokeDex",
  components: {
    SystemBar,
  },
  data() {
    return {
      headers: [
        { text: "ID", sortable: false, value: "id" },
        {
          text: "Nom",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Type", sortable: false, value: "type" },
        { text: "Image", sortable: false, value: "image" },
      ],
      pokemons: [],
      battery: {},
    };
  },
  computed: {
    ...mapState({
      pokemonResearch: (state) => state.pokemonResearch,
      state: (state) => state,
    }),
  },
  methods: {
    ...mapActions({
      setPokemonResearch: "setPokemonResearch",
    }),

    async find(parameter) {
      // pause d'une séconde
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await axios
        .get("https://pokeapi.co/api/v2/pokemon/" + parameter)
        .then((response) => {
          this.stats = response.data.stats;
          this.pokemon = response.data;
          this.pokemons.push(this.pokemon);

          this.pokemon.image =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
            response.data.id +
            ".png";
        })
        .catch((err) => {
          console.error(err);
        });
    },
    numberRandom() {
      // check if the number is already in the array
      let number = Math.floor(Math.random() * 898) + 1;
      if (this.pokemons.length > 0) {
        for (let i = 0; i < this.pokemons.length; i++) {
          if (this.pokemons[i].id === number) {
            return this.numberRandom();
          }
        }
      }
      return number;
    },
    openPokedex() {
      this.$emit("openPokedex");
      this.$store.commit("setPokemonResearch", null);
    },
    findThePokemon(item) {
      this.$store.commit("setPokemonResearch", item);
      this.$emit("openPokedex");
    },
    pokemonNearby() {
      for (let i = 0; i < 9; i++) {
        this.find(this.numberRandom());
      }
    },
    colorBadge(type) {
      if (type) {
        return `https://veekun.com/dex/media/types/en/${type}.png`;
      }
      return "";
    },
  },

  mounted() {
    this.pokemons = [];
  },
};
</script>

<style scoped>
#pokedex {
  position: relative;
}
/* Styles pour les écrans de petite taille (mobile) */
@media screen and (max-width: 767px) {
  #pokedex {
    width: 100%;
    height: 100%;

  }
  #pokemonList {
    position: absolute;
    top: 0;
    left: 0;
    width: 76%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-left: 7.8%;
    margin-top: 29.4%;
  }
  #openPokedex {
  position: absolute;
  top: 17px;
  left: 317px;
  z-index: 1;
  }
}

/* Styles pour les écrans de taille moyenne (tablette, par exemple) */
@media screen and (min-width: 768px) and (max-width: 1023px) {
  #pokedex {
    /* Ajoutez vos styles spécifiques à la version tablette ici si nécessaire */
  }
}

/* Styles pour les écrans de grande taille (desktop) */
@media screen and (min-width: 1024px) {
  #pokedex {
    /* Ajoutez vos styles spécifiques à la version desktop ici si nécessaire */
  }
  #pokemonList {
  position: absolute;
  top: 0;
  left: 0;
  width: 76%;
  height: 72%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-left: 7.8%;
  margin-top: 29.4%;
  }

  #openPokedex {
  position: absolute;
  top: 38px;
  left: 490px;
  z-index: 1;
  }
}

#pokemonNearby {
  position: absolute;
  top: 145px;
  left: 235px;
  z-index: 1;
  word-spacing: 0.5px;
}
.table {
  width: 100%;
  height: 100%;
}

.gameboy {
  background: #a1b174 !important;
  border: #2f060d solid 3px;
  border-radius: 10px;
}
.gameboydark {
  background: #717d52 !important;
}
</style>
