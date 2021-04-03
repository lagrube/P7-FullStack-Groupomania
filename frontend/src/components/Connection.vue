<template>
  <div>
    <form action="" @submit.prevent="handleLogin">
      <nav>
        <router-link to="/" class="active"> Se connecter</router-link> |
        <router-link to="/signup"> S'inscire </router-link>
      </nav>
      <label for="email">Email</label>
      <input type="email" id="email" required />
      <br />
      <label for="password">Mot de passe</label>
      <input type="password" id="password" required />
      <br />
      <div class="error-login">{{ message }}</div>
      <br />
      <button type="submit" id="login-btn">Se connecter</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Connection",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    handleLogin() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      let token = "";
      if (email == "" || password == "") {
        alert(
          "Veuillez entrer votre email et votre mot de passe pour vous connecter",
        );
      } else {
        axios
          .post(
            "http://localhost:5000/api/user/login",
            {
              email,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, //Renvoi du token par l'api en cas d'authentification
              },
            },
          )
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            console.log("Connexion réussi!");
            location.reload();
          })
          .catch((err) => {
            if (err.response.status >= 400) {
              this.message = "Combinaison incorrecte!";
            }
          });
      }
    },
  },
};
</script>
<style lang="scss"></style>
