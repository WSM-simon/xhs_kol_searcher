<template>
  <div class="keyword-search-page">
    <n-space horizontal :size="12">
      <!-- 左侧导航栏 -->
      <SideNav />

      <ChatBox />
      <!-- 已选择的关键词 bucket -->

      <n-space vertical align="center">
        <BucketPanel :keywords="selectedKeywords" />

        <!-- 搜索按钮 -->
        <div class="footer-actions">
          <n-button
            type="primary"
            :disabled="selectedKeywords.length === 0"
            @click="handleSearch"
          >
            开始搜索
          </n-button>
        </div>
      </n-space>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import SideNav from "@/components/SideNav/SideNav.vue";
import ChatBox from "@/components/Chat/ChatBox.vue";
import BucketPanel from "@/components/SelectionPanel/SelectionPanel.vue";

import { useKeywordStore } from "@/stores/keyword";
import { useRouter } from "vue-router";
import { useMessage, NSpace } from "naive-ui";

const keywordStore = useKeywordStore();
const router = useRouter();
const message = useMessage();

const selectedKeywords = keywordStore.selectedKeywords;

function handleSearch() {
  if (selectedKeywords.length === 0) {
    message.warning("至少要选择一个关键词");
  }
  // router.push("/search-results"); // 假设下一页路由是这个
}
</script>

<style scoped>
.keyword-search-page {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 24px;
}

.footer-actions {
  margin-top: 24px;
  text-align: right;
}
</style>
