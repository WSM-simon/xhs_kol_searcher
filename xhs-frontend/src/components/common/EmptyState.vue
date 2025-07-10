<template>
  <div class="empty-state">
    <n-result
      status="404"
      title="暂无内容"
      description="我们还没找到任何关键词，请尝试添加一些吧！"
    >
      <template #footer>
        <n-button type="primary" @click="onAddKeyword">手动添加关键词</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "add"): void
}>()

function onAddKeyword() {
  emit("add")
}
</script>

<style scoped>
.empty-state {
  padding: 32px;
  text-align: center;
}
</style>
