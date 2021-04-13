<template>
  <div class="posts">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="container-header">
        <div class="user-header">
          <img class="user-image" v-if="post.image" :src="post.image" alt="" />
          <div class="post-user">{{ post.prenom }} {{ post.nom }}</div>
        </div>
        <div class="post-date">le {{ dateFormat(post.date) }}</div>
      </div>

      <div class="post-lien">
        <img v-if="post.image_url" :src="post.image_url" alt="image" />
        <a v-if="post.lien_url" :href="post.lien_url">{{ post.lien_url }}</a>
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

        <router-link
          v-if="user.userId === post.user_id || user.admin == 1"
          :to="{ name: 'Post', params: { id: post.id } }"
        >
          <div class="modify-btn">
            Modifier
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// Importation de axios : requête serveur
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Posts",

  data() {
    return {
      posts: [],
      likes: "",
    };
  },

  computed: {
    ...mapState(["url"]),
  },

  // Chargement des fonctions avant le chargement de la page
  created() {
    this.user = JSON.parse(localStorage.user);
    this.getAllPost();
  },

  methods: {
    // Fonction pour récupérer tout les posts
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
          console.log(this.posts);
        });
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
.posts {
  width: 80%;
  margin: auto;
  .post {
    width: 95%;
    margin: 30px 0px 50px 0px;
    // border: 1px solid;
    border-radius: 50px;
    padding: 20px;
    background-color: rgba(255, 0, 0, 0.055);
    .lien-modif {
      display: flex;
      justify-content: space-around;
    }
    .user-header {
      display: flex;
      align-items: center;
      .user-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }

    .post-user {
      font-weight: bold;
      margin-bottom: 5px;
    }
    .post-date {
      font-size: 12px;
    }
    .post-image {
      text-align: center;
    }
    .post-lien {
      border-top: 1px solid red;
      padding-top: 20px;
      margin-bottom: 10px;
      text-align: center;
      img {
        width: 350px;
        height: 200px;
        @media all and (max-width: 600px) {
          width: 200px;
          height: 150px;
        }
      }
    }
    .post-content {
      margin-bottom: 30px;
      text-align: center;
    }
    .comments {
      color: #381f1fea;
      &:hover {
        color: #130c0c;
        font-weight: bold;
      }
    }
    .text-decoration {
      text-decoration: none;
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
