<template>
  <header>
    <nav id="nav">
      <router-link class="nav-home" to="/">
        <img
          class="logo-groupomania"
          src="@/assets/groupomania-navbar.png"
          alt="Groupomania logo"
        />
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
    }
  }

  ul {
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    list-style-type: none;
    li {
      padding: 10px 0;
      .logo {
        width: 25px;
        cursor: pointer;
      }
    }
  }
}
</style>
