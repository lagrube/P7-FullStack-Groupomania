<template>
  <div class="UserPost">
    <h3 @click="showPosts()">Vos posts:</h3>
    <div class="post-btn">
      <div class="post" v-for="post in posts" :key="post.id">
        <div class="post-header">
          <div class="post-user">{{ user.prenom }} {{ user.nom }}</div>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserPosts",

  data() {
    return {
      posts: [],
    };
  },

  created() {
    this.user = JSON.parse(localStorage.user);
    this.getUserPosts();
  },

  methods: {
    getUserPosts() {
      const userId = JSON.parse(localStorage.user).userId;
      const token = JSON.parse(localStorage.user).token;

      axios
        .get(`http://localhost:5000/api/post/user/${userId}/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.posts = res.data.result;
        });
    },

    showPosts() {
      const visible = document.querySelector(".post-btn");
      visible.classList.toggle("is-visible");
    },
  },
};
</script>

<style scoped lang="scss">
.UserPost {
  width: 80%;
  margin: auto;
  h3 {
    width: 50%;
    margin: 40px auto;
    text-align: center;
    cursor: pointer;
    right: 5%;
    background-color: #201d1d;
    color: white;
    border-radius: 10px;
    padding: 3px 10px;
    transition: all 0.3s ease;
    &:hover {
      transition: all 0.3s ease;
      transform: scale(1.05);
    }
  }
  .post-btn {
    display: none;
  }
  .is-visible {
    display: block;
  }
  .post {
    width: 60%;
    margin: auto;
    // border: 1px solid;
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
      text-align: center;
      padding-top: 40px;
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
