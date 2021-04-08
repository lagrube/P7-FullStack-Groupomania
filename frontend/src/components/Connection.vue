<template>
  <div>
    <form action="" @submit.prevent="handleLogin">
      <img
        class="logo"
        src="../assets/groupomania-logo-site-1.jpg"
        alt="logo accueil"
      />
      <nav id="nav">
        <router-link to="/" class="active"> Se connecter</router-link> |
        <router-link to="/signup"> S'inscrire </router-link>
      </nav>
      <label for="email">Email</label>
      <input type="email" id="email" required />
      <br />
      <label for="password">Mot de passe</label>
      <input type="password" id="password" required />
      <br />
      <div class="error">{{ message }}</div>
      <br />
      <button type="submit" id="login-btn">Connexion</button>
    </form>
  </div>
</template>

<script>
// Importation de axios : requête serveur
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Connection",

  data() {
    return {
      message: "",
    };
  },

  computed: {
    ...mapState(["url"]),
  },

  methods: {
    // Fonction pour lancer la demande de connexion
    handleLogin() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      let token = "";
      // Oblige l'utilisateur a rentrer des données
      if (email == "" || password == "") {
        alert(
          "Veuillez entrer votre email et votre mot de passe pour vous connecter",
        );
      } else {
        axios
          .post(
            `${this.url}/user/login`,
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
<style scoped lang="scss">
form {
  border: 1px solid red;
  width: 80%;
  margin: auto;
  border-radius: 30px;
  padding: 0 0 10% 0;
  text-align: center;

  .logo {
    padding-top: 40px;
    @media all and (max-width: 600px) {
      width: 60%;
    }
  }
  label {
    width: 150px;
    display: inline-block;
  }
  input {
    margin: 10px 10px 15px;
    height: 30px;
    border-radius: 10px;
    border: 3px solid #555;
    background: transparent;
    caret-color: red;
    text-align: center;
    font-family: inherit;
    font-size: 16px;
    &:focus {
      outline: none;
    }
    &:valid {
      border: none;
      border-bottom: 2px solid #555;
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s;
    -webkit-text-fill-color: black !important;
  }
  button {
    margin-top: 20px;
    padding: 10px;
    border-radius: 25px;
    border: none;
    background-color: #e44d6610;
    font-weight: bold;

    &:hover {
      transition: all 0.5s ease;
      transform: scale(1.2);
      cursor: pointer;
      color: white;
      border-color: rgb(19, 12, 12);
      background-color: #141111;
    }
    &:active {
      outline: none;
    }
  }
  .error {
    color: red;
    font-weight: bold;
  }
}
</style>
