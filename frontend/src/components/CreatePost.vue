<template>
  <div class="newPost">
    <div class="newPost-create-btn" @click="visible = true">
      Ajouter un nouveau post
    </div>
    <transition name="fade">
      <div class="overlay" v-if="visible">
        <div class="form-wrapper">
          <span class="form-close" @click="visible = false">X</span>
          <form class="newPost-form" @submit.prevent="sendNewPost()">
            <label for="newPost-content">Contenu</label>
            <textarea
              id="newPost-content"
              placeholder="Contenu de votre post..."
            ></textarea>
            <button class="newPost-btn" type="submit">Publier</button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewPost",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    sendNewPost() {
      const token = JSON.parse(localStorage.user).token;
      //   const user = JSON.parse(localStorage.user);
      const userId = JSON.parse(localStorage.user).userId;
      const message = document.getElementById("newPost-content").value;
      axios
        .post(
          "http://localhost:5000/api/post",
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
          (this.visible = false),
            console.log("Message crée!"),
            location.reload();
        });
    },
  },
};
</script>

<style scoped lang="scss">
.newPost {
  padding: 20px 20px 0px 20px;
}
.newPost-create-btn {
  text-align: center;
  width: 50%;
  margin: auto;
  padding: 10px;
  border-radius: 30px;
  background-color: #201d1d;
  color: white;
  max-width: 750px;
  font-size: 1.2rem;
  transition-duration: 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
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
/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
