<template>
  <div>
    <form action="" @submit.prevent="handleSignup">
      <nav>
        <router-link to="/"> Se connecter</router-link> |
        <router-link to="/signup" class="active"> S'inscire </router-link>
      </nav>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        pattern="[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}"
        required
      />
      <br />
      <div class="email error">{{ message }}</div>

      <label for="firstName">Prénom</label>
      <input type="text" id="firstName" minlength="3" required /> <br />

      <label for="lastName">Nom</label>
      <input type="text" id="lastName" minlength="5" required /> <br />

      <label for="password">Mot de passe</label>
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

      <label for="control-password">Confirmer mot de passe</label>
      <input type="password" id="control-password" required /> <br />
      <div class="password-confirm error"></div>

      <input type="checkbox" id="terms" />
      <label for="terms" type="checkbox"
        >J'accepte les <a href="">{{ url }}</a></label
      >
      <div class="terms error"></div>

      <button type="submit" id="signup-btn">S'inscire</button>

      <div class="form error">{{ messageForm }}</div>
    </form>
  </div>
</template>

<script>
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

      if (password !== controlPassword || !terms.checked) {
        if (password !== controlPassword) {
          passwordError.innerHTML = "Les mots de passe ne sont pas identique!";
        } else if (!terms.checked) {
          termsError.innerHTML = "Veuillez accepter les conditions générales";
        }
      } else {
        axios
          .post(
            "http://localhost:5000/api/user/signup",
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

<style lang="scss"></style>
