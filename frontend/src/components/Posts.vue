<template>
  <div class="posts">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="post-header">
        <div class="post-user">{{ post.prenom }} {{ post.nom }}</div>
        <div class="post-date">{{ post.date }}</div>
      </div>
      <div class="post-image">{{ post.image }}</div>
      <div class="post-content">{{ post.message }}</div>
      <div class="modify-btn" v-if="user.userId === post.user_id">
        Modifier
      </div>
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

<style scoped lang="scss">
.posts {
  width: 80%;
  margin: auto;
  .post {
    width: 95%;
    margin: 50px auto;
    // border: 1px solid;
    padding: 50px 0;
    overflow: hidden;
    .post-user {
      margin-bottom: 5px;
    }
    .post-date {
      margin-bottom: 30px;
      font-size: 12px;
    }
    .post-content,
    .post-image {
      text-align: center;
    }
    .post-conten {
      margin-bottom: 30px;
    }
    .modify-btn {
      cursor: pointer;
      float: right;
      position: relative;
      right: 5%;
      color: #382528;
      // border: 1px solid;
      border-radius: 15px;
      padding: 3px 30px;
      &:hover {
        background-color: rgba(245, 222, 179, 0.39);
      }
    }
  }
}
</style>
