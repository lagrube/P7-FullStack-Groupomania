<template>
  <div class="infos-user">
    <div class="blocLeft">
      <div class="nom-user">{{ users.nom }} {{ users.prenom }}</div>
      <img
        class="basic-img"
        src="https://cours-informatique-gratuit.fr/wp-content/uploads/2014/05/compte-utilisateur-1.png"
        alt="Image utilisateur"
      />
      <img v-if="users.image" :src="users.image" alt="user image" />
      <div class="bio">
        <span class="bold">Description:</span> <br />
        {{ users.bio }}
      </div>
    </div>
    <div class="blocRight">
      <router-link :to="{ name: 'User', params: { id: users.id } }">
        <button class="modify btn">Modifier</button>
      </router-link>
      <button class="delete btn" @click="deleteUser()">
        Supprimer son compte
      </button>
    </div>
  </div>
</template>

<script>
// Importation de axios : requête serveur
import axios from "axios";

export default {
  name: "UserProfil",

  data() {
    return {
      users: [],
    };
  },

  // Chargement des fonctions avant le chargement de la page
  created() {
    this.user = JSON.parse(localStorage.user);
    this.showPhoto();
    this.getUserProfil();
  },

  methods: {
    // Fonction pour récupérer le profil utilisateur
    getUserProfil() {
      const userId = JSON.parse(localStorage.user).userId;
      const token = JSON.parse(localStorage.user).token;

      axios
        .get(`http://localhost:5000/api/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.users = res.data[0];
          this.showPhoto();
          console.log(this.users);
        });
    },
    // Fonction pour supprimer l'utilisateur
    deleteUser() {
      const userId = JSON.parse(localStorage.user).userId;
      const token = JSON.parse(localStorage.user).token;

      axios
        .delete(`http://localhost:5000/api/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          localStorage.removeItem("user");
          console.log("Utilisateur supprimé!");
          location.href = "/";
        })
        .catch(() => console.log("err"));
    },

    showPhoto() {
      if (this.users.image) {
        const change = document.querySelector(".basic-img");
        change.classList.add("invisible");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.infos-user {
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  @media all and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
  .invisible {
    display: none;
  }
  .blocLeft {
    flex: 1.5;
    text-align: center;
    .nom-user {
      margin: 30px 0px 15px;
      font-size: 18px;
    }
    img {
      width: 120px;
      height: 100px;
      border-radius: 50%;
      min-width: 80px;
    }
    .bio {
      padding: 15px 0;
    }
    .bold {
      font-weight: bold;
    }
  }
  .blocRight {
    flex: 1.5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .btn {
      cursor: pointer;
      color: white;
      border-radius: 10px;
      padding: 3px 10px;
      border: none;
      padding: 10px;
      border-radius: 10px;
      margin: 30px;
      @media all and (max-width: 600px) {
        margin: 10px;
      }
      &:hover {
        transform: scale(1.1);
        transition: all 0.2s;
      }
      &:active {
        outline: none;
      }
      &:focus {
        outline: none;
      }
    }
    .modify {
      background-color: #201d1d;
    }
    .delete {
      background-color: rgb(172, 23, 23);
    }
  }
}
</style>
