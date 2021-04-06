<template>
  <div class="onePost">
    <div class="form-wrapper">
      <span class="form-close" @click="Cancel()">X</span>
      <form class="newPost-form" @submit.prevent="">
        <label for="newPost-content">Contenu</label>
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
import axios from "axios";
export default {
  name: "OnePost",

  data() {
    return {
      modifiedMessage: "",
      post: [],
    };
  },

  mounted() {
    this.getOnePost();
  },

  methods: {
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

    Cancel() {
      location.href = "/";
    },

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
form input {
  font-size: 1.05rem;
  padding: 10px;
  margin-bottom: 15px;
  text-align: center;
  text-align: left;
  margin-bottom: 30px;
}
form label {
  color: red;
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 10px;
}
#newPost-content {
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
