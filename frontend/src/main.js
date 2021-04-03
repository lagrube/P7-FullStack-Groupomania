import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Vue from "vue";

// Vue.config.productionTip = false;

// //ApiUrl
// Vue.prototype.$apiUrl = "http://localhost:5000/api";
// //User / Token
// if (localStorage.user != undefined) {
//   Vue.prototype.$token = JSON.parse(localStorage.user).token;
//   Vue.prototype.$user = JSON.parse(localStorage.user);
// }

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
