<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { useMessage } from "naive-ui";

const counter = useCounterStore();
const message = useMessage();
</script>

<template>
  <section class="counter-page">
    <h1>Pinia Counter Page</h1>
    <n-card title="click machine">Count: {{ counter.count }}</n-card>
    <n-button
      type="primary"
      @click="
        counter.increment();
        message.success('OH GOOOD');
      "
      >Click me</n-button
    >
  </section>
</template>

<style scoped>
.counter-page {
  text-align: center;
  margin-top: 40px;
}
button {
  padding: 6px 14px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
