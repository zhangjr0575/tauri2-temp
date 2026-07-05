<template>
    <div class="brand">
        <img class="brand-icon" src="/icon.png" alt="" />
        <span class="brand-name">{{ appName }}</span>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getName } from '@/helper/system'; 

const appName = ref('');

onMounted(async () => {
    appName.value = await getName();
});
</script>

<style lang="scss">
.brand {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    &-icon {
        width: 16px;
        height: 16px;
        object-fit: contain;
    }

    &-name {
        margin-left: 10px;
        font-size: 12px;
        color: var(--text);
    }
}

[data-platform="web"] {
    .brand-icon {
        width: 28px;
        height: 28px;
    }
    .brand-name {
        font-size: 15px;
    }
}
</style>