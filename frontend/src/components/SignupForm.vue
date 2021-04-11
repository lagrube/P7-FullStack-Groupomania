<template>
  <div>
    <form action="" @submit.prevent="handleSignup()">
      <img
        class="logo"
        src="../assets\groupomania-logo-site-1.jpg"
        alt="logo-signup"
      />
      <nav id="nav">
        <router-link to="/"> Se connecter</router-link> |
        <router-link to="/signup" class="active"> S'inscrire </router-link>
      </nav>
      <label class="label" for="email">Email</label>
      <input
        type="email"
        id="email"
        pattern="[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}"
        required
      />
      <br />
      <div class="email error">{{ message }}</div>

      <label class="label" for="firstName">Prénom</label>
      <input type="text" id="firstName" pattern="[A-Za-z]{3,32}" required />
      <br />

      <label class="label" for="lastName">Nom</label>
      <input type="text" id="lastName" pattern="[A-Za-z]{5,32}" required />
      <br />

      <label class="label" for="password">Mot de passe</label>
      <input
        type="password"
        id="password"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
        required
      />
      <p class="password-regex">
        Doit contenir 8 caractères dont 1 chiffre, 1 lettre, 1 majuscule, 1
        minuscule
      </p>

      <label class="label" for="control-password">Confirmer mot de passe</label>
      <input type="password" id="control-password" required /> <br />
      <div class="password-confirm error"></div>

      <div class="terms-center">
        <input type="checkbox" id="terms" class="terms" />
        <label for="terms" type="checkbox" class="terms"
          >J'accepte les <a href="">{{ url }}</a></label
        >
      </div>
      <div class="terms error"></div>

      <button type="submit" id="signup-btn">S'inscrire</button>

      <div class="form error">{{ messageForm }}</div>
    </form>
  </div>
</template>

<script>
// Importation de axios : requête serveur
import axios from "axios";

export default {
  name: "SignupForm",

  data() {
    return {
      message: "",
      messageForm: "",
      url: "conditions générales",
    };
  },

  methods: {
    // Fonction pour s"inscrire
    handleSignup() {
      const email = document.getElementById("email").value;
      const prenom = document.getElementById("firstName").value;
      const nom = document.getElementById("lastName").value;
      const password = document.getElementById("password").value;
      const controlPassword = document.getElementById("control-password").value;
      const terms = document.getElementById("terms");

      const termsError = document.querySelector(".terms.error");
      const passwordError = document.querySelector(".password-confirm.error");

      termsError.innerHTML = "";
      passwordError.innerHTML = "";
      this.message = "";
      this.messageForm = "";

      // Vérification si les mots de passes sont identiques et si les conditions générales sont coché
      if (password !== controlPassword || !terms.checked) {
        if (password !== controlPassword) {
          passwordError.innerHTML = "Les mots de passe ne sont pas identique!";
        } else if (!terms.checked) {
          termsError.innerHTML = "Veuillez accepter les conditions générales";
        }
      } else {
        axios
          .post(
            `http://localhost:5000/api/user/signup`,
            {
              email,
              password,
              prenom,
              nom,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          )
          .then((res) => {
            if (res.status === 201) {
              console.log("Utilisateur crée !");
              location.href = "/";
            }
          })
          .catch((err) => {
            if (err.response.status === 401) {
              this.message = "Email déja utilisé!";
            }
            if (err.response.status === 400) {
              this.messageForm = "Formulaire non conforme!";
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
  .label {
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
  .terms {
    @media all and (max-width: 400px) {
      display: none;
    }
  }
  p {
    font-size: 13px;
    margin: 0 10px 0;
  }
  .error {
    color: red;
    font-weight: bold;
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
  .terms-center {
    display: flex;
    width: 300px;
    margin: auto;
    align-items: center;
  }
}
</style>
