<template>
  <div class="page-console">
    <p>欢迎使用控制台，这里是系统概览。{{ now }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const now = ref(+new Date());
</script>


<style lang="scss">
.page-console {
  padding: 20px;
}
</style>
