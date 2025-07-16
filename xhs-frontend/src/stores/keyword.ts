import { defineStore } from "pinia";
// stores/keywordStore.ts
export const useKeywordStore = defineStore("keyword", {
  state: () => ({
    businessGoal: "",
    inputText: "",
    selectedKeywords: [] as string[],
  }),
  actions: {
    toggleKeyword(keyword: string) {
      if (this.selectedKeywords.includes(keyword)) {
        this.selectedKeywords = this.selectedKeywords.filter(
          (k) => k !== keyword
        );
      } else if (this.selectedKeywords.length < 5) {
        this.selectedKeywords.push(keyword);
      }
    },
  },
  persist: true,
});
