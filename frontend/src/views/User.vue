<template>
  <div>
    <header>
      <Navbar v-if="connected" />
    </header>
    <main>
      <Connection v-if="!connected" />

      <h2 class="center">Modification de votre profil :</h2>
      <UserModify v-if="connected" />
    </main>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import UserModify from "../components/UserModify.vue";
export default {
  components: { UserModify, Navbar },

  name: "User",

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

<style scoped lang="scss">
.center {
  text-align: center;
  margin: 50px;
}
</style>
