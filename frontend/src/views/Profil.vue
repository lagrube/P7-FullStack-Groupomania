<template>
  <div>
    <header v-if="connected">
      <Navbar />
    </header>
    <main>
      <Connection v-if="!connected" />

      <User-profil v-if="connected" />
      <UserPost v-if="connected" />
    </main>
  </div>
</template>

<script>
import Connection from "../components/Connection.vue";
import Navbar from "../components/Navbar.vue";
import UserPost from "../components/UserPost.vue";
import UserProfil from "../components/UserProfil.vue";

export default {
  name: "Profil",

  components: {
    Navbar,
    UserProfil,
    Connection,
    UserPost,
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
        console.log("Utilisateur connecté !");
      } else if (localStorage.user == undefined) {
        this.connected = false;
        console.log("Utilisateur non connecté !");
      }
    },
  },
};
</script>
, Connection

<style lang=""></style>
