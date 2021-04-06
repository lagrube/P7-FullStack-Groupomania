<template>
  <div class="post">
    <Connection v-if="!connected" />

    <Navbar v-if="connected" />
    <OnePost v-if="connected" />
  </div>
</template>

<script>
import Connection from "../components/Connection.vue";
import Navbar from "../components/Navbar.vue";
import OnePost from "../components/OnePost.vue";

export default {
  name: "Post",

  components: {
    Connection,
    Navbar,
    OnePost,
  },

  data() {
    return {
      connected: true,
    };
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

  created() {
    this.checkConnected();
  },
};
</script>
