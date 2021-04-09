<template>
  <div class="userComment">
    <h3 class="newComment-create-btn" @click="visible = true">Commentez</h3>
    <transition name="fade">
      <div class="overlay" v-if="visible">
        <div class="form-wrapper">
          <h2 class="center">Créez votre commentaire ici :</h2>
          <span class="form-close" @click="visible = false">X</span>
          <form class="newComment-form" @submit.prevent="sendNewComment()">
            <label for="newComent-content">Contenu</label>
            <textarea
              id="newComment-content"
              placeholder="Contenu de votre post..."
            ></textarea>
            <button class="newComment-btn" type="submit">Publier</button>
          </form>
        </div>
      </div>
    </transition>

    <h2>
      Les commentaires du post :
    </h2>
    <div class="comment" v-for="comment in comments" :key="comment.id">
      <div class="container-header">
        <div class="comment-header">
          <div class="comment-user">{{ comment.prenom }} {{ comment.nom }}</div>
          <div class="comment-date">le {{ dateFormat(comment.date) }}</div>
        </div>
        <div
          class="delete-btn"
          v-if="user.userId === comment.user_id || user.admin == 1"
          @click="deleteComment(comment.id)"
          :key="comment.id"
        >
          Supprimer
        </div>
      </div>

      <div class="comment-content">{{ comment.message }}</div>
    </div>
  </div>
</template>

<script>
// Importation de axios : requête serveur
import axios from "axios";

export default {
  name: "Comments",

  data() {
    return {
      comments: [],
      visible: false,
    };
  },
  // Chargement des fonctions avant le chargement de la page
  created() {
    this.getComments();
    this.user = JSON.parse(localStorage.user);
  },

  methods: {
    // Fonction pour récupère tout les commentaires
    getComments() {
      const postId = this.$route.params.id;
      const token = JSON.parse(localStorage.user).token;
      console.log(postId);

      axios
        .get(`http://localhost:5000/api/post/${postId}/comments`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.comments = res.data;
        });
    },

    // Fonction pour créer un commentaire
    sendNewComment() {
      const postId = this.$route.params.id;
      const token = JSON.parse(localStorage.user).token;
      //   const user = JSON.parse(localStorage.user);
      const userId = JSON.parse(localStorage.user).userId;
      const message = document.getElementById("newComment-content").value;
      axios
        .post(
          `http://localhost:5000/api/post/${postId}/comment`,
          {
            userId,
            message,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(() => {
          (this.visible = false), console.log("Commentaire crée!");
          location.reload();
        });
    },

    // Fonction pour supprimer un commentaire
    deleteComment(commentId) {
      const token = JSON.parse(localStorage.user).token;
      axios
        .delete(`http://localhost:5000/api/post/comment/${commentId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.getComments();
          console.log("Commentaire supprimé !");
        });
    },

    // Fonction de mise en forme FR de la date
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
.newComment-create-btn {
  text-align: center;
  width: 50%;
  margin: auto;
  padding: 10px;
  border-radius: 30px;
  background-color: #201d1d;
  color: white;
  max-width: 750px;
  transition-duration: 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
}
.center {
  text-align: center;
}
.overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(31, 30, 30, 0.678);
  z-index: 1;
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
.form-wrapper {
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 5%;
  width: 800px;
  height: 80%;
  border-radius: 30px;
}
.newComment-form {
  display: flex;
  flex-direction: column;
  text-align: left;
}
input {
  font-size: 1.05rem;
  padding: 10px;
  margin-bottom: 15px;
  text-align: center;
  text-align: left;
  margin-bottom: 30px;
}
label {
  color: red;
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 10px;
}
textarea {
  font-size: 20px;
  height: 200px;
  width: calc(100% - 20px);
  padding: 10px;
  resize: none;
  overflow-y: scroll;
}
#newPost-content {
  height: 200px;
  width: calc(100% - 20px);
  padding: 10px;
  resize: none;
  overflow-y: scroll;
}
.newComment-btn {
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
/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.userComment {
  width: 80%;
  margin: auto;
  h2 {
    margin-bottom: 50px;
  }
  h3 {
    width: 50%;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
    cursor: pointer;
    right: 5%;
    background-color: #201d1d;
    color: white;
    border-radius: 10px;
    padding: 3px 10px;
    transition: all 0.3s ease;
    @media all and (max-width: 600px) {
      margin-top: 20px;
    }
    &:hover {
      transition: all 0.3s ease;
      transform: scale(1.05);
    }
  }
  .container-header {
    display: flex;
    justify-content: space-between;
    @media all and (max-width: 600px) {
      display: block;
      width: 150px;
    }
  }
  .delete-btn {
    font-size: 16px;
    font-weight: bold;
    @media all and (max-width: 600px) {
      display: block;
      position: relative;
      top: 50px;
      font-size: 14px;
      font-weight: bold;
    }

    &:hover {
      color: red;
      cursor: pointer;
    }
  }
  .post-btn {
    display: none;
  }
  .is-visible {
    display: block;
  }
  .comment {
    width: 60%;
    margin: auto;
    margin-bottom: 40px;
    padding: 0px 0px 30px 10px;
    border-left: 1px solid red;
    overflow: hidden;
    .comment-user {
      margin-bottom: 5px;
    }
    .comment-date {
      font-size: 12px;
    }
    .comment-content {
      margin-bottom: 30px;
      text-align: center;
      padding-top: 20px;
      margin-bottom: 10px;
      @media all and (max-width: 600px) {
        padding-top: 0px;
      }
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
