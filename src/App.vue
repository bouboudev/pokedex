<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

@font-face {
  font-family: "Minecraft";
  src: local("Minecraft"), url(./assets/fonts/Minecraft.otf) format("opentype");
}

#app {
  font-family: "Press Start 2P", cursive;
  background-image: url("./assets/pokemon_wallpaper.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  word-spacing: -9px;
}
.pointer {
  cursor: pointer;
}
.zplus {
  z-index: 2;
}
.electric {
  /* gradient  */
  background: #f8d030;
  background: -webkit-linear-gradient(to right, #f8d030, #e0c068);
  background: linear-gradient(to right, #f8d030, #e0c068);
}
.grass {
  /* gradient  */
  background: #78c850;
  background: -webkit-linear-gradient(to right, #78c850, #64a048);
  background: linear-gradient(to right, #78c850, #64a048);
}
.fire {
  /* gradient  */
  background: #f08030;
  background: -webkit-linear-gradient(to right, #f08030, #e85818);
  background: linear-gradient(to right, #f08030, #e85818);
}
.water {
  /* gradient  */
  background: #6890f0;
  background: -webkit-linear-gradient(to right, #6890f0, #445e9c);
  background: linear-gradient(to right, #6890f0, #445e9c);
}
.normal {
  /* gradient  */
  background: #a8a878;
  background: -webkit-linear-gradient(to right, #a8a878, #a8a878);
  background: linear-gradient(to right, #a8a878, #a8a878);
}
.fighting {
  /* gradient  */
  background: #c03028;
  background: -webkit-linear-gradient(to right, #c03028, #a02020);
  background: linear-gradient(to right, #c03028, #a02020);
}
.flying {
  /* gradient  */
  background: #a890f0;
  background: -webkit-linear-gradient(to right, #a890f0, #a890f0);
  background: linear-gradient(to right, #a890f0, #a890f0);
}
.poison {
  /* gradient  */
  background: #a040a0;
  background: -webkit-linear-gradient(to right, #a040a0, #682a68);
  background: linear-gradient(to right, #a040a0, #682a68);
}
.ground {
  /* gradient  */
  background: #e0c068;
  background: -webkit-linear-gradient(to right, #e0c068, #c0a050);
  background: linear-gradient(to right, #e0c068, #c0a050);
}
.rock {
  /* gradient  */
  background: #b8a038;
  background: -webkit-linear-gradient(to right, #b8a038, #a89030);
  background: linear-gradient(to right, #b8a038, #a89030);
}
.bug {
  /* gradient  */
  background: #a8b820;
  background: -webkit-linear-gradient(to right, #a8b820, #909018);
  background: linear-gradient(to right, #a8b820, #909018);
}
.ghost {
  /* gradient  */
  background: #705898;
  background: -webkit-linear-gradient(to right, #705898, #705898);
  background: linear-gradient(to right, #705898, #705898);
}
.steel {
  /* gradient  */
  background: #b8b8d0;
  background: -webkit-linear-gradient(to right, #b8b8d0, #a8a8c0);
  background: linear-gradient(to right, #b8b8d0, #a8a8c0);
}
.psychic {
  /* gradient  */
  background: #f85888;
  background: -webkit-linear-gradient(to right, #f85888, #e04070);
  background: linear-gradient(to right, #f85888, #e04070);
}
.ice {
  /* gradient  */
  background: #98d8d8;
  background: -webkit-linear-gradient(to right, #98d8d8, #78c8c8);
  background: linear-gradient(to right, #98d8d8, #78c8c8);
}
.dragon {
  /* gradient  */
  background: #7038f8;
  background: -webkit-linear-gradient(to right, #7038f8, #7038f8);
  background: linear-gradient(to right, #7038f8, #7038f8);
}
.dark {
  /* gradient  */
  background: #705848;
  background: -webkit-linear-gradient(to right, #705848, #705848);
  background: linear-gradient(to right, #705848, #705848);
}
.fairy {
  /* gradient  */
  background: #f0b6bc;
  background: -webkit-linear-gradient(to right, #f0b6bc, #e898a8);
  background: linear-gradient(to right, #f0b6bc, #e898a8);
}
.shadow {
  /* gradient  */
  background: #705898;
  background: -webkit-linear-gradient(to right, #705898, #705898);
  background: linear-gradient(to right, #705898, #705898);
}
</style>
