<template>
  <div class="posts">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="post-header">
        <span class="post-info"
          >Posté le : {{ post.date }} par {{ post.prenom }} {{ post.nom }}</span
        >
      </div>
      <div class="post-content">{{ post.message }}</div>
      <span class="modify-btn" v-if="user.userId === post.user_id">
        Modifier</span
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Posts",
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.user);
    this.getAllPost();
  },
  methods: {
    getAllPost() {
      const token = JSON.parse(localStorage.user).token;
      axios
        .get("http://localhost:5000/api/post", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.posts = res.data.result;
        });
    },
  },
};
</script>

<style lang="scss"></style>
