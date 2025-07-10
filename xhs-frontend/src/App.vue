<template>
  <n-message-provider>
    <router-view />
    <!-- renders CounterPage -->
  </n-message-provider>
</template>

<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
</script>
