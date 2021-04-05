<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: cursive;
  max-width: 1200px;
  margin: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #381f1f7a;
    text-decoration: none;

    &.router-link-exact-active {
      color: #e44d66;
      border-bottom: 2px solid;
    }
  }
}

@mixin smartphone {
  @media all and (max-width: 600px) {
    @content;
  }
}

// @mixin tablette-pc {
//   @media screen and (min-width: 600px) {
//     @content;
//   }
// }
</style>
