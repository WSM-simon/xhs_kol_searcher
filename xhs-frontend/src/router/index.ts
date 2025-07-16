import { createRouter, createWebHistory } from "vue-router";
import CounterPage from "@/pages/CounterPage.vue";
import KeywordSelectionPage from "@/pages/KeywordSelectionPage.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/counter" },
    { path: "/counter", component: CounterPage },
    { path: "/keyword-select", component: KeywordSelectionPage },
  ],
});
