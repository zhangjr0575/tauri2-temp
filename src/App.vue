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

.svg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 6px;
  color: var(--text-gray);
  background: transparent;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: var(--border);
    color: var(--text);
  }

  >svg {
    width: 18px;
    height: 18px;
  }
}
</style>
