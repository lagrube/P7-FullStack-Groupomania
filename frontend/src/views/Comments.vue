<template>
  <div class="post">
    <header>
      <Navbar v-if="connected" />
    </header>
    <main>
      <Connection v-if="!connected" />
      <Comments v-if="connected" />
    </main>
  </div>
</template>

<script>
import Connection from "../components/Connection.vue";
import Navbar from "../components/Navbar.vue";
import Comments from "../components/Comments.vue";

export default {
  name: "Post",

  components: {
    Connection,
    Navbar,
    Comments,
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

<style lang="scss">
.center {
  text-align: center;
  margin: 50px;
}
</style>
