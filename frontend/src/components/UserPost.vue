<template>
  <div class="UserPost">
    <h3 @click="showPosts()">Vos posts:</h3>
    <div class="post-btn">
      <div class="post" v-for="post in posts" :key="post.id">
        <div class="post-header">
          <div class="post-user">{{ user.prenom }} {{ user.nom }}</div>
          <div class="post-date">le {{ dateFormat(post.date) }}</div>
        </div>
        <div class="post-lien">
          <a :href="post.lien_url">{{ post.lien_url }}</a>
        </div>
        <div class="post-content">{{ post.message }}</div>
        <div class="lien-modif">
          <router-link
            class="text-decoration"
            :to="{ name: 'Comments', params: { id: post.id } }"
          >
            <div class="comments">
              Commentaires
            </div>
          </router-link>

          <router-link :to="{ name: 'Post', params: { id: post.id } }">
            <div
              class="modify-btn"
              v-if="user.userId === post.user_id || user.admin == 1"
            >
              Modifier
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importation de axios : requête serveur
import axios from "axios";

export default {
  name: "UserPosts",

  data() {
    return {
      posts: [],
    };
  },

  // Chargement des fonctions avant le chargement de la page
  created() {
    this.user = JSON.parse(localStorage.user);
    this.getUserPosts();
  },

  methods: {
    // Fonction pour récupérer les post d'un seul utilisateur
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
    // Fonction pour montrer les posts utilisateur
    showPosts() {
      const visible = document.querySelector(".post-btn");
      visible.classList.toggle("is-visible");
    },
    // Fonction pour mettre en format FR la date
    dateFormat(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-FR", options);
    },
  },
};
</script>

<style scoped lang="scss">
.UserPost {
  width: 80%;
  margin: auto;
  @media all and (max-width: 700px) {
    width: 100%;
  }
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
    @media all and (max-width: 800px) {
      width: 90%;
    }
  }
  .post-btn {
    display: none;
  }
  .is-visible {
    display: block;
  }
  .lien-modif {
    display: flex;
    justify-content: space-around;
  }
  .comments {
    color: #381f1f7a;
    &:hover {
      color: #130c0c;
    }
  }
  .text-decoration {
    text-decoration: none;
  }
  .post {
    width: 60%;
    margin: auto;
    // border: 1px solid;
    overflow: hidden;
    @media all and (max-width: 800px) {
      width: 100%;
    }
    .post-user {
      margin-bottom: 5px;
    }
    .post-date {
      font-size: 12px;
    }
    .post-lien {
      border-top: 1px solid red;
      padding-top: 20px;
      text-align: center;
      margin-bottom: 10px;
    }
    .post-content {
      margin-bottom: 30px;
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
