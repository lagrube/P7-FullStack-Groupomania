<template>
  <header>
    <nav id="nav">
      <router-link class="nav-home" to="/">
        <img
          class="logo-groupomania"
          src="@/assets/groupomania-navbar.png"
          alt="Groupomania logo"
        />
        <div class="home">Accueil</div>
      </router-link>
      <ul>
        <li>
          <router-link to="/profil">Mon compte</router-link>
        </li>
        <li>
          <img
            class="logo"
            src="@/assets/logout_3.svg"
            alt="Deconnexion"
            @click="disconnect()"
          />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    // Fonction qui déconnecter l'utilisateur tout en supprimant le localstorage et l'empeche donc de revenir sur le menu sans se connecter
    disconnect() {
      localStorage.removeItem("user");
      location.href = "/";
    },
  },
};
</script>

<style scoped lang="scss">
#nav {
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: space-between;
  margin: auto;
  .nav-home {
    flex: 2;
    border-bottom: none;
    .logo-groupomania {
      width: 200px;
      @media all and (max-width: 600px) {
        display: none;
      }
    }
    .home {
      @media all and (min-width: 601px) {
        display: none;
      }
    }
  }

  ul {
    display: flex;
    @media all and (min-width: 700px) {
      flex: 1;
    }
    justify-content: space-around;
    align-items: center;
    list-style-type: none;
    li {
      padding: 10px 0;
      margin-right: 20px;
      .logo {
        width: 25px;
        cursor: pointer;
      }
    }
  }
}
</style>
