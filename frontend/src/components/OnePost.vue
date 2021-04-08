<template>
  <div class="onePost">
    <div class="form-wrapper">
      <span class="form-close" @click="Cancel()">X</span>
      <form class="newPost-form" @submit.prevent="">
        <label class="titre" for="newPost-content">Contenu</label>
        <textarea
          id="newPost-content"
          placeholder="Modifiez votre message..."
          v-model="this.modifiedMessage"
        ></textarea>
        <div class="flex-btn">
          <button
            class="newPost-btn btn-width"
            type="submit"
            @click="modifyPost()"
          >
            Modifier
          </button>
          <button
            class="deletePost-btn btn-width"
            type="submite"
            @click="deletePost()"
          >
            Supprimer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// Importation de axios : requête serveur
import axios from "axios";

export default {
  name: "OnePost",

  data() {
    return {
      modifiedMessage: "",
      post: [],
    };
  },

  // Chargement des fonctions avant le chargement de la page
  mounted() {
    this.getOnePost();
    this.refreshPage();
  },

  methods: {
    // Fonction pour récupérer un seul post
    getOnePost() {
      const token = JSON.parse(localStorage.user).token;
      const postId = this.$route.params.id;
      console.log("post id:" + postId);
      axios
        .get(`http://localhost:5000/api/post/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.post = res.data.result[0];
          console.log(this.post);
          console.log(this.post.message);
        });
    },
    // Fonction pour revenir sur la page HOME apres un F5
    refreshPage() {
      const userId = this.$route.params.id;
      if (userId === undefined) {
        return (window.location = "/");
      } else {
        return;
      }
    },
    // Fonction annuler qui permet de retourner sur la page HOME
    Cancel() {
      location.href = "/";
    },
    // Fonction pour modifier un post
    modifyPost() {
      const token = JSON.parse(localStorage.user).token;
      const postId = this.$route.params.id;
      const message = this.modifiedMessage;
      const lien = "'vide'";
      axios
        .put(
          `http://localhost:5000/api/post/${postId}`,
          {
            message,
            lien_url: lien,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          location.href = "/";
          console.log("Post modifié !");
        })
        .catch(() => {
          console.log("marche pas");
        });
    },
    // Fonction pour supprimer un post
    deletePost() {
      const token = JSON.parse(localStorage.user).token;
      const postId = this.$route.params.id;
      axios
        .delete(`http://localhost:5000/api/post/${postId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          location.href = "/";
          console.log("Post supprimé !");
        });
    },
  },
};
</script>

<style lang="scss">
.newPost {
  padding: 20px 20px 0px 20px;
}
.form-wrapper {
  margin: auto;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 5%;
  width: 800px;
  height: 80%;
  border-radius: 30px;
}
.form-close {
  cursor: pointer;
  align-self: flex-end;
  font-size: 18px;
  margin-right: 15px;
  &:hover {
    color: red;
  }
}
.newPost-form {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.titre {
  color: red;
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 10px;
}
#newPost-content {
  font-size: 20px;
  height: 200px;
  width: calc(100% - 20px);
  padding: 10px;
  resize: none;
  overflow-y: scroll;
}
.newPost-btn {
  margin-top: 20px;
  padding: 10px;
  font-size: 1.1rem;
  color: white;
  background-color: #201d1d;
  border: none;
  border-radius: 10px;
  transition-duration: 0.2s;
  cursor: pointer;
}
.flex-btn {
  display: flex;
  justify-content: space-around;
  .btn-width {
    width: 40%;
    &:hover {
      transform: scale(1.02);
    }
  }
  .deletePost-btn {
    margin-top: 20px;
    padding: 10px;
    font-size: 1.1rem;
    color: white;
    background-color: rgb(172, 23, 23);
    border: none;
    border-radius: 10px;
    transition-duration: 0.2s;
    cursor: pointer;
    &:hover {
      transform: scale(1.02);
    }
  }
}
</style>
