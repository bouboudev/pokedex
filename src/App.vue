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
  word-spacing: -9px;
}
.pointer {
  cursor: pointer;
}
</style>
