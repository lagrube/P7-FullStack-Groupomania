<template>
  <div class="home">
    <header>
      <Navbar v-if="connected" />
    </header>
    <main>
      <Connection v-if="!connected" />

      <CreatePost v-if="connected" />
      <Posts v-if="connected" />
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Connection from "../components/Connection.vue";
import Navbar from "../components/Navbar.vue";
import Posts from "../components/Posts.vue";
import CreatePost from "../components/CreatePost.vue";

export default {
  name: "Home",
  components: {
    Connection,
    Navbar,
    Posts,
    CreatePost,
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
