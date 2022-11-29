<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<style>
@font-face {
  font-family: "Minecraft";
  src: local("Minecraft"), url(./assets/fonts/Minecraft.otf) format("opentype");
}

#app {
  font-family: "Minecraft";
  background-image: url("./assets/pokemon_wallpaper.jpg");
}
</style>
