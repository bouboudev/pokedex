<template>
  <v-container>
    <v-row class="mb-n16">
      <v-col class="d-flex align-center justify-center zplus" cols="5">
        <v-text-field
          v-model="search"
          label="Nom du pokémon ou son ID"
          solo
          dense
          shaped
          hide-details
          :disabled="loading"
          :loading="loading"
          @keyup.enter="findByNameOrID"
        >
          <!-- changer lA TAILLE DU  text du label -->
          <template v-slot:label>
            <span class="label">Nom du pokémon ou son ID</span>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="2" class="mt-1 zplus">
        <v-btn
          class="white--text"
          @click="findByNameOrID"
          color="#DC0A2D"
          :loading="loading"
          :disabled="!search"
        >
          <v-icon>mdi-magnify</v-icon></v-btn
        >
      </v-col>
      <v-col cols="5"></v-col>
    </v-row>
    <!-- pokedex -->
    <v-row class="d-flex justify-center mb-n14">
      <v-col>
        <div id="pokedex">
          <v-tooltip top color="warning">
            <template v-slot:activator="{ on, attrs }">
              <div
                v-bind="attrs"
                v-on="on"
                id="closePokedex"
                @click="closePokedex"
              >
                <v-btn icon large class="white--text">
                  <v-icon> mdi-close-circle-outline </v-icon>
                </v-btn>
              </div>
            </template>
            <span>Fermer le pokédex</span>
          </v-tooltip>

          <div class="circles-container" v-if="loading">
            <div class="circle white"></div>
          </div>
          <div v-if="pokemon.id">
            <div class="good"></div>
            <div id="light-good"></div>
          </div>
          <div v-if="!pokemon.id && !pokemonOrNot">
            <div class="false"></div>
            <div id="light-false"></div>
          </div>

          <img src="../assets/pokedex.png" width="1000vh" />
          <div id="cry">
            <v-tooltip top color="warning">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  small
                  color="error"
                  :disabled="!pokemon.name"
                  @click="pokemonCry"
                >
                  <v-icon>mdi-play-circle-outline</v-icon>
                  Cri</v-btn
                >
              </template>
              <span>Entendre le pokémon</span>
            </v-tooltip>
          </div>
          <div id="pokemon">
            <a :href="urlPokepedia(pokemon.name)" target="_blank">
              <img :src="pokemon.image" height="170px" />
            </a>
          </div>
          <!-- Button mute -->
          <!-- TODO créer un composant pour le bouton mute -->
          <div id="mute" @click="mute">
            <div v-if="muteOrNot">
              <v-tooltip top color="warning">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on"> mdi-volume-off</v-icon>
                </template>
                <span>Allumer le son</span>
              </v-tooltip>
            </div>
            <div v-else>
              <v-tooltip top color="warning">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on"> mdi-volume-high</v-icon>
                </template>
                <span>Couper le son</span>
              </v-tooltip>
            </div>
          </div>
          <!-- informations -->
          <div id="infos">
            <div v-if="pokemonOrNot">
              <div v-for="stat in pokemon.stats" :key="stat.id">
                - {{ firstLetterUpperCase(stat.stat.name) }} =
                {{ stat.base_stat }} pt
                <br />
                <template>
                  <v-progress-linear
                    rounded
                    buffer-value="0"
                    stream
                    max="140"
                    :value="stat.base_stat"
                    color="black"
                  ></v-progress-linear>
                </template>
              </div>
            </div>
            <div else>
              <h2>
                {{ message }}
              </h2>
            </div>
          </div>
          <div id="pokemonId" v-if="pokemon.id > 0">
            <v-card class="pa-2 mt-1" flat> ID : {{ pokemon.id }} </v-card>
          </div>
          <div id="systembar">
            <SystemBar widthBar="318" />
          </div>
          <div id="evolution" class="d-flex flex-row justify-center">
            <span v-for="(evolve, index) in evolves" :key="index">
              <v-tooltip top color="warning">
                <template v-slot:activator="{ on, attrs }">
                  <v-img
                    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolve.id}.png`"
                    height="35px"
                    width="35px"
                    class="mr-4 pointer"
                    :class="
                      evolve.name === pokemon.name ? 'evolutionActive' : ''
                    "
                    @click="find(evolve.id)"
                    v-bind="attrs"
                    v-on="on"
                  >
                  </v-img>
                </template>
                {{ evolve.name }}
              </v-tooltip>
            </span>
          </div>
          <div id="pokemonName">
            <h3 class="whiter">{{ firstLetterUpperCase(pokemon.name) }}</h3>
          </div>

          <!-- Button reset -->
          <v-tooltip top color="warning">
            <template v-slot:activator="{ on, attrs }">
              <button
                id="reset"
                v-bind="attrs"
                v-on="on"
                @click="reset"
              ></button>
            </template>
            <span>Recommencer</span>
          </v-tooltip>
          <v-tooltip top color="warning">
            <template v-slot:activator="{ on, attrs }">
              <button
                id="btn-right"
                v-bind="attrs"
                v-on="on"
                @click="nextPoke"
              ></button>
            </template>
            <span>Suivant</span>
          </v-tooltip>
          <v-tooltip top color="warning">
            <template v-slot:activator="{ on, attrs }">
              <button
                id="btn-left"
                v-bind="attrs"
                v-on="on"
                :disabled="pokemon.id === 1 || pokemon.id === 0"
                @click="previusPoke"
              ></button>
            </template>
            <span>Précédent</span>
          </v-tooltip>
          <v-tooltip top color="warning">
            <template v-slot:activator="{ on, attrs }">
              <button
                id="btn-random"
                v-bind="attrs"
                v-on="on"
                @click="randomPokemon"
              ></button>
            </template>
            <span>Pokémon au hasard</span>
          </v-tooltip>
          <div id="type1">
            <a
              :href="`https://pokemon.fandom.com/wiki/${pokemon.type1}_type`"
              target="_blank"
            >
              <img height="25px" :src="colorBadge(pokemon.type1)" />
            </a>
          </div>
          <div id="type2">
            <a
              :href="`https://pokemon.fandom.com/wiki/${pokemon.type2}_type`"
              target="_blank"
            >
              <img height="25px" :src="colorBadge(pokemon.type2)" />
            </a>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SystemBar from "./SystemBar.vue";
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  name: "PokeDex",
  components: {
    SystemBar,
  },
  data: () => ({
    pokemon: {
      name: "",
      id: 0,
      image: "",
      stats: [],
      type1: "",
      type2: "",
    },
    evolves: [],
    openButtonSound: require("../assets/songs/open_button.wav"),
    openWrongSound: require("../assets/songs/wrong.mp3"),
    openRightSound: require("../assets/songs/right.wav"),
    search: "",
    stats: [],
    message: "",
    pokemonOrNot: true,
    loading: false,
    muteOrNot: false,
  }),
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
    findByNameOrID() {
      this.buttonSong();
      const search = this.search.toLowerCase();
      this.loading = true;
      this.find(search);
    },
    async find(parameter) {
      if (this.pokemonResearch) {
        parameter = this.pokemonResearch.id;
      }
      this.$store.commit("setPokemonResearch", null);

      this.evolves = [];

      this.pokemon.image =
        "https://thumbs.gfycat.com/DampSpanishCleanerwrasse-size_restricted.gif";

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios
        .get("https://pokeapi.co/api/v2/pokemon/" + parameter)
        .then((response) => {
          this.urlPokepedia(this.pokemon.name);
          this.pokemonOrNot = true;
          this.message = "";
          this.stats = response.data.stats;
          this.loading = false;
          //objet pokemon
          this.pokemon = response.data;
          //remplir la barre de recherche avec le nom du pokemon
          this.search = this.pokemon.name;
          this.pokemon.image =
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
            response.data.id +
            ".png";
          this.findEvolution(parameter);

          this.pokemon.type1 = response.data.types[0].type.name;
          //gérer les pokémons avec 2 types
          if (response.data.types[1]) {
            this.pokemon.type2 = response.data.types[1].type.name;
          } else {
            this.pokemon.type2 = "";
          }

          this.rightSong();
        })
        .catch((err) => {
          this.wrongSong();
          console.error(err);
          this.reset();
          this.pokemon.image =
            "https://steamuserimages-a.akamaihd.net/ugc/171539431148961188/2EBEBEFB36892776146A68E8BF7537B2B68AE43B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false";
          this.pokemonOrNot = false;
          this.message = "Pokémon introuvable";
          this.loading = false;
        });
    },

    async findEvolution(parameter) {
      await axios
        .get("https://pokeapi.co/api/v2/pokemon-species/" + parameter)
        .then((response) => {
          // console.log("reponse", response);
          const linkEvolution = response.data.evolution_chain.url;
          // console.log("linkEvolution", linkEvolution);
          axios
            .get(linkEvolution)
            .then((response) => {
              //evolution 1
              const idEvolves1 = response.data.chain.species.url;
              const idEvolves1Split = idEvolves1.split("/");
              const idEvolves1Final = idEvolves1Split[6];
              const nameEvolves1 = response.data.chain.species.name;
              const Evolves1 = {
                id: idEvolves1Final,
                name: nameEvolves1,
              };
              this.evolves.push(Evolves1);

              //evolution 2
              const idEvolves2 = response.data.chain.evolves_to[0].species.url;
              const idEvolves2Split = idEvolves2.split("/");
              const idEvolves2Final = idEvolves2Split[6];
              const nameEvolves2 =
                response.data.chain.evolves_to[0].species.name;
              const Evolves2 = {
                id: idEvolves2Final,
                name: nameEvolves2,
              };
              this.evolves.push(Evolves2);

              //evolution 3
              const idEvolves3 =
                response.data.chain.evolves_to[0].evolves_to[0].species.url;
              const idEvolves3Split = idEvolves3.split("/");
              const idEvolves3Final = idEvolves3Split[6];
              const nameEvolves3 =
                response.data.chain.evolves_to[0].evolves_to[0].species.name;
              const Evolves3 = {
                id: idEvolves3Final,
                name: nameEvolves3,
              };
              this.evolves.push(Evolves3);
              console.log("evolves", this.evolves);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    },

    firstLetterUpperCase(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    reset() {
      this.pokemon = {
        name: "",
        id: 0,
        image: "",
        stats: [],
        type1: "",
        type2: "",
      };
      this.evolves = [];
      this.pokemon.image =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png";
      this.message = "";
      this.pokemonOrNot = true;
      this.loading = false;
      this.search = "";
    },
    nextPoke() {
      this.buttonSong();
      this.loading = true;
      this.find(this.pokemon.id + 1);
    },
    previusPoke() {
      this.buttonSong();
      this.loading = true;
      //eviter les pokémons négatifs
      if (this.pokemon.id == 1) {
        return;
      }
      //sinon on peut aller au pokémon précédent
      this.find(this.pokemon.id - 1);
    },
    randomPokemon() {
      this.buttonSong();
      this.loading = true;
      this.find(Math.floor(Math.random() * 898) + 1);
    },
    urlPokepedia(name) {
      if (name) {
        return `https://www.pokepedia.fr/${name}`;
      }
      return "";
    },
    colorBadge(type) {
      if (type) {
        return `https://veekun.com/dex/media/types/en/${type}.png`;
      }
      return "";
    },
    buttonSong() {
      const audio = new Audio(this.openButtonSound);
      audio.volume = 0.052;
      audio.play();
    },
    wrongSong() {
      const audio = new Audio(this.openWrongSound);
      audio.volume = 0.05;
      audio.play();
    },
    rightSong() {
      const audio = new Audio(this.openRightSound);
      audio.volume = 0.05;
      audio.play();
    },
    mute() {
      // TODO refactoriser la fonction
      this.muteOrNot = !this.muteOrNot;
      if (this.muteOrNot) {
        this.openButtonSound = "";
        this.openWrongSound = "";
        this.openRightSound = "";
      } else {
        this.openButtonSound = require("../assets/songs/open_button.wav");
        this.openWrongSound = require("../assets/songs/wrong.mp3");
        this.openRightSound = require("../assets/songs/right.wav");
      }
    },
    pokemonCry() {
      const audio = new Audio(
        `https://play.pokemonshowdown.com/audio/cries/${this.pokemon.name}.mp3`
      );
      audio.volume = 0.05;
      audio.play();
    },
    closePokedex() {
      this.$emit("close");
    },
  },
  created() {
    this.pokemon.image =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png";
  },
  mounted() {
    if (this.pokemonResearch) this.find(this.pokemonResearch.id);
  },
};
</script>

<style scoped>
.label {
  font-size: 0.6rem;
  word-spacing: 1px;
}
#pokedex {
  position: relative;
}
#closePokedex {
  position: absolute;
  top: 72px;
  left: 485px;
  z-index: 1;
}
#reset {
  position: absolute;
  top: 555px;
  left: 870px;
  height: 40px;
  width: 40px;
  z-index: 1;
}
#reset:hover {
  background: #fbfb05;
  opacity: 0.3;
  box-shadow: #ffff00 10px 10px 30px;
  border-radius: 50%;
  transition-duration: 0.4s;
}
#btn-right {
  position: absolute;
  top: 555px;
  left: 680px;
  height: 40px;
  width: 40px;
  z-index: 1;
}
#btn-right:hover {
  background: #ffffff;
  opacity: 0.3;
  box-shadow: #ffffff 10px 10px 30px;
  border-radius: 15%;
  transition-duration: 0.4s;
}
#btn-left {
  position: absolute;
  top: 555px;
  left: 630px;
  height: 40px;
  width: 40px;
  z-index: 1;
}
#btn-left:hover {
  background: #ffffff;
  opacity: 0.3;
  box-shadow: #ffffff 10px 10px 30px;
  border-radius: 15%;
  transition-duration: 0.4s;
}
#cry {
  position: absolute;
  top: 435px;
  left: 310px;
}

#pokemon {
  position: absolute;
  top: 260px;
  left: 150px;
}

#systembar {
  position: absolute;
  top: 250px;
  left: 597px;
  z-index: 1;
}
#evolution {
  position: absolute;
  top: 418px;
  left: 635px;
  z-index: 1;
}
.evolutionActive {
  border: white 2px solid;
  border-radius: 15%;
  transition-duration: 0.4s;
}

#pokemonId {
  position: absolute;
  top: 475px;
  left: 180px;
  border-radius: 7px;
}
#btn-random {
  position: absolute;
  top: 550px;
  left: 73px;
  height: 40px;
  width: 40px;
  z-index: 1;
}
#btn-random:hover {
  background: #ffffff;
  opacity: 0.3;
  box-shadow: #ffffff 10px 10px 30px;
  border-radius: 50%;
}

#pokemonName {
  position: absolute;
  max-width: 150px;
  word-wrap: break-word;
  top: 650px;
  left: 140px;
  color: #303030;
  font-size: 11px;
}
.whiter {
  white-space: normal;
}

#mute {
  position: absolute;
  top: 487px;
  left: 132px;
  text-align: center;
  cursor: pointer;
}
#mute:hover {
  background: #ff0000;
  opacity: 0.3;
  box-shadow: #ff0000 10px 10px 60px;
  border-radius: 50%;
  transition-duration: 0.4s;
}

#infos {
  left: 610px;
  position: absolute;
  color: #303030;
  top: 276px;
  width: 290px;
  font-size: 10px;
}

#type1 {
  position: absolute;
  top: 650px;
  left: 600px;
  color: #303030;
  width: 138px;
  height: 46px;
  text-align: center;
}

#type2 {
  position: absolute;
  top: 650px;
  left: 770px;
  color: #303030;
  width: 133px;
  height: 44px;
  text-align: center;
}

.good {
  position: absolute;
  display: flex;
  top: 49px;
  left: 155px;
  height: 40px;
  width: 80px;
  background: #dc0a2d;
}
#light-good {
  position: absolute;
  display: flex;
  top: 50px;
  left: 239px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #00ff1a;
  box-shadow: 0 0 8px #aeffa0, inset 0 0 8px #aeffa0, 0 0 16px #37f713,
    inset 0 0 16px #37f713, 0 0 32px #37f713, inset 0 0 32px #37f713;
}
.false {
  position: absolute;
  display: flex;
  top: 49px;
  left: 195px;
  height: 40px;
  width: 80px;
  background: #dc0a2d;
}
#light-false {
  position: absolute;
  display: flex;
  top: 50px;
  left: 157px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #ff0000;
  box-shadow: 0 0 8px #ffa0a0, inset 0 0 8px #ffa0a0, 0 0 16px #f71313,
    inset 0 0 16px #f71313, 0 0 32px #f71313, inset 0 0 32px #f71313;
}
/* light animation  */
.circles-container {
  position: absolute;
  display: flex;
  top: 50px;
  left: 60px;
}

.circle {
  background: rgb(255, 255, 255);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  margin: 10px;
  height: 70px;
  width: 70px;
  transform: scale(1);
  animation: pulse 2s infinite;
}

.circle.white {
  background: rgb(255, 255, 255);
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1.1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }

  70% {
    transform: scale(0.3);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }

  100% {
    transform: scale(1.1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}
</style>
