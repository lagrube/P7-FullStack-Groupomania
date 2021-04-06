import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import Post from "../views/Post.vue";
// import Signup from "../views/Signup.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
  {
    path: "/profil",
    name: "Profil",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profil.vue"),
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Post.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
