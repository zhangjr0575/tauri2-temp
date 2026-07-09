<template>
    <button class="updater-btn" :disabled="loading" @click="onHandle">
        <span v-if="loading" class="updater-spinner"></span>
        <template v-if="progress == 100">{{ $t('updater.relaunch') }}</template>
        <template v-else-if="progress">{{ $t('updater.progress', { progress }) }}</template>
        <template v-else-if="latestVersion">{{ $t('updater.updateTo', { version: latestVersion }) }}</template>
        <template v-else-if="!auto">{{ $t('updater.checkUpdate') }}</template>
    </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { checkUpdate, installUpdate, relaunch } from '@/helper/updater'

const props = defineProps({
    auto: {
        type: Boolean,
        default: false
    }
})

const progress = ref('')
const loading = ref(false)
const latestVersion = ref('')

async function onHandle() {
    loading.value = true

    if (progress.value == 100) {
        await relaunch()
    } else if (latestVersion.value) {
        await installUpdate(info => progress.value = info.progress)
    } else {
        latestVersion.value = await checkUpdate()
    }
    loading.value = false
}

onMounted(async () => {
    props.auto && (latestVersion.value = await checkUpdate())
})
</script>

<style lang="scss" scoped>
.updater-btn {
    display: inline-flex;
    align-items: center;
    padding: 0 10px;
    height: 24px;
    line-height: 24px;
    border: none;
    border-radius: 6px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    background-color: var(--primary);

    &:empty {
        display: none;
    }

    &:hover:not([disabled='true']) {
        opacity: 0.8;
    }

    &[disabled] {
        opacity: 0.8;
        cursor: not-allowed;
    }
}

.updater-spinner {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 4px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid currentColor;
    border-right-color: transparent;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>