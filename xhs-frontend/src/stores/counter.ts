import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
    name: "John Doe",
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    async fetchCount() {
      const data = await fetch("/api/count").then((res) => res.json());
      this.count = data.count;
    },
  },
  persist: true,
});
