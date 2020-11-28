import { createWebHistory, createRouter } from "vue-router";
import VHome from "@/components/views/ViewHome.vue";
import VCarte3D from "@/components/views/ViewCesium.vue";
import VCarte2D from "@/components/views/ViewOpenlayers.vue";
import NotFound404 from "@/components/errors/404page.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: VHome,
  },
  {
    path: "/carte2D",
    name: "Carte2D",
    component: VCarte2D,
  },
  {
    path: "/carte3D",
    name: "Carte3D",
    component: VCarte3D,
  },
  {
    path: "/:catchAll(.*)",
    name: "404 page",
    component: NotFound404,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;