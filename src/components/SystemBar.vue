<template>
  <v-card :width="widthBar" class="transparent elevation-0">
    <v-system-bar lights-out dark>
      <span class="text-body-2">{{ hours }}</span>
      <v-spacer></v-spacer>
      <v-icon>mdi-pokemon-go</v-icon>
      <v-icon>{{ iconWifi }}</v-icon>
      <v-icon>mdi-signal-cellular-3</v-icon>
      <v-icon>{{ iconBattery }}</v-icon>
    </v-system-bar>
  </v-card>
</template>

<script>
export default {
  name: "SystemBar",
  props: {
    widthBar: Number,
  },
  data() {
    return {
      battery: {},
    };
  },
  computed: {
    hours() {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return hours + ":" + minutes;
    },
    iconBattery() {
      if (this.battery.charging === false) {
        if (this.battery.level > 0.5) {
          return "mdi-battery-50";
        } else if (this.battery.level > 0.2) {
          return "mdi-battery-20";
        } else if (this.battery.level > 0.1) {
          return "mdi-battery-10";
        } else {
          return "mdi-battery-alert";
        }
      } else {
        return "mdi-battery-charging-50";
      }
    },
    iconWifi() {
      console.log(navigator);
      if (this.networkPercentage() > 5) {
        return "mdi-wifi-strength-3";
      } else if (this.networkPercentage() > 2) {
        return "mdi-wifi-strength-2";
      } else if (this.networkPercentage() > 1) {
        return "mdi-wifi-strength-1";
      } else {
        return "mdi-wifi-strength-alert-outline";
      }
    },
  },
  methods: {
    getBattery() {
      return navigator.getBattery().then((battery) => {
        this.battery = battery;
      });
    },
    networkPercentage() {
      console.log(navigator.connection.downlink);
      return navigator.connection.downlink;
    },
  },

  mounted() {
    this.getBattery();
    this.networkPercentage();
  },
};
</script>

<style scoped></style>
