<template>
  <div class="posts">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="post-header">
        <div class="post-user">{{ post.prenom }} {{ post.nom }}</div>
        <div class="post-date">{{ post.date }}</div>
      </div>
      <div class="post-image">{{ post.image }}</div>
      <div class="post-content">{{ post.message }}</div>
      <router-link :to="{ name: 'Post', params: { id: post.id } }">
        <div class="modify-btn" v-if="user.userId === post.user_id">
          Modifier
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Posts",

  data() {
    return {
      posts: [],
    };
  },

  computed: {
    ...mapState(["url"]),
  },

  created() {
    this.user = JSON.parse(localStorage.user);
    this.getAllPost();
  },

  methods: {
    getAllPost() {
      const token = JSON.parse(localStorage.user).token;
      axios
        .get(`${this.url}/post`, {
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

<style scoped lang="scss">
.posts {
  width: 80%;
  margin: auto;
  .post {
    width: 95%;
    margin: 20px 0px 0px;
    margin: auto;
    // border: 1px solid;
    padding: 50px 0;
    overflow: hidden;
    .post-user {
      margin-bottom: 5px;
    }
    .post-date {
      font-size: 12px;
    }
    .post-image {
      text-align: center;
    }
    .post-content {
      margin-bottom: 30px;
      border-top: 1px solid red;
      padding-top: 40px;
      text-align: center;
    }
    .modify-btn {
      cursor: pointer;
      float: right;
      position: relative;
      right: 5%;
      background-color: #201d1d;
      color: white;
      border-radius: 10px;
      padding: 3px 10px;
    }
  }
}
</style>
