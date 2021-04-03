<template>
  <div class="home">
    <Connection v-if="!connected" />
  </div>
</template>

<script>
// @ is an alias to /src
import Connection from "@/components/Connection.vue";

export default {
  name: "Home",
  components: {
    Connection,
  },
  data() {
    return {
      connected: true,
    };
  },

  created() {
    this.checkConnected();
  },

  methods: {
    checkConnected() {
      if (localStorage.user !== undefined) {
        this.connected = true;
        console.log("Utilisateur connecté!");
      } else if (localStorage.user == undefined) {
        this.connected = false;
        console.log("Utilisateur non connecté!");
      }
    },
  },
};
</script>
