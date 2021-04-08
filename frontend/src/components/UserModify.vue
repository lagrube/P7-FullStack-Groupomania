<template>
  <div class="user">
    <form class="form-user" action="" @submit.prevent="modifyProfil()">
      <label class="label-user" for="firstName">Prénom</label>
      <input
        type="text"
        id="firstName"
        minlength="3"
        placeholder=""
        v-model="this.users.prenom"
        required
      />
      <br />

      <label class="label-user" for="lastName">Nom</label>
      <input
        type="text"
        id="lastName"
        minlength="5"
        placeholder=""
        v-model="this.users.nom"
        required
      />
      <br />

      <label class="label-user bio-label" for="bio">Bio</label>
      <textarea
        type="text"
        id="bio"
        class="bio"
        minlength="5"
        placeholder=""
        v-model="this.users.bio"
        required
      />
      <br />

      <label class="label-user" for="password">Nouveau mot de passe</label>
      <input
        type="password"
        id="password"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
      />
      <p class="password-regex">
        Doit contenir 8 caractères dont 1 chiffre, 1 lettre, 1 majuscule, 1
        minuscule
      </p>

      <label class="label-user" for="control-password"
        >Confirmer mot de passe</label
      >
      <input type="password" id="control-password" /> <br />
      <div class="password-confirm error"></div>

      <button type="submit" id="signup-btn">Modifier</button>

      <div class="form error"></div>
    </form>
  </div>
</template>

<script>
// Importation de axios : requête serveur
import axios from "axios";

export default {
  name: "UserModify",

  data() {
    return {
      users: [],
      next: false,
    };
  },

  // Chargement des fonctions avant le chargement de la page
  mounted() {
    this.getOneUser();
    this.refreshPage();
  },

  methods: {
    // Fonction pour récupérer les données de l'utilisateur
    getOneUser() {
      const token = JSON.parse(localStorage.user).token;
      const userId = this.$route.params.id;

      axios
        .get(`http://localhost:5000/api/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.users = res.data[0];
          console.log(this.users);
        });
    },

    // FONCTION pour retourner sur la page profil apres un F5
    refreshPage() {
      const userId = this.$route.params.id;
      if (userId === undefined) {
        return (window.location = "/profil");
      } else {
        return;
      }
    },

    // FONCTION pour modifier son profil utilisateur
    modifyProfil() {
      const token = JSON.parse(localStorage.user).token;
      const userId = this.$route.params.id;

      const prenom = document.getElementById("firstName").value;
      const nom = document.getElementById("lastName").value;
      const password = document.getElementById("password").value;
      const bio = document.getElementById("bio").value;
      const controlPassword = document.getElementById("control-password").value;
      const passwordError = document.querySelector(".password-confirm");
      passwordError.innerHTML = "";

      // Vérification des mots de passes identiques
      if (password !== undefined || password === controlPassword) {
        if (password !== controlPassword) {
          passwordError.innerHTML = "Les mots de passe ne sont pas identique!";
        } else {
          axios
            .put(
              `http://localhost:5000/api/user/${userId}`,
              {
                newPassword: password,
                prenom,
                nom,
                bio,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              },
            )
            .then(() => {
              console.log("Utilisateur modifié!");
              window.location = "/profil";
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
  },
};
</script>

<style lang="scss">
.form-user {
  border: 1px solid red;
  width: 80%;
  margin: auto;
  border-radius: 30px;
  padding: 0 0 10% 0;
  text-align: center;
  padding: 30px 0;
  .logo {
    padding-top: 40px;
    width: 222px;
    margin: 10px 10px 15px;
    height: 80px;
    border-radius: 10px;
    border: 3px solid #555;
    background: transparent;
    caret-color: red;
    text-align: unset;
    font-family: inherit;
    font-size: 16px;
    &:focus {
      outline: none;
    }
    @media all and (max-width: 600px) {
      width: 60%;
    }
  }
  .bio {
    width: 222px;
    margin: 10px 10px 15px;
    height: 80px;
    border-radius: 10px;
    border: 3px solid #555;
    background: transparent;
    caret-color: red;
    text-align: unset;
    font-family: inherit;
    font-size: 16px;
    resize: none;
    &:focus {
      outline: none;
    }
  }
  .bio-label {
    @media all and (min-width: 519px) {
      position: relative;
      bottom: 60px;
    }
  }

  .label-user {
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
}
</style>
