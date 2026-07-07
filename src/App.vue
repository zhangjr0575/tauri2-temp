<template>
  <Layout />
</template>

<script setup>
import Layout from './layouts/index.vue';
</script>

<style lang="scss">
@import url('@/assets/styles/theme.scss');
@import url('@/assets/styles/animation.scss');

:root {
    color-scheme: light dark;
    font-size: 14px;
    min-height: 100vh;
    color: var(--text);
    user-select: none;
    -webkit-user-select: none;
    background-color: var(--bg);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

body {
  margin: 0;
}

.page {
  padding: 15px;
}
</style>
