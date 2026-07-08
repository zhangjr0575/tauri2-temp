<template>
    <button class="svg-icon" @click="dialogRef.open()">
        <svg><use href="/icons.svg#settings" /></svg>
    </button>
    <Dialog ref="dialogRef" width="660px">
        <div style="height: 500px; display: flex;">
            <aside class="settings-sidebar">
                <div class="settings-sidebar-title">{{ $t('settings.title') }}</div>
                <template v-for="item in categories" :key="item.key">
                    <div class="settings-sidebar-nav" :class="{ active: activeCategory === item.key }" @click="activeCategory = item.key">
                        <svg class="settings-sidebar-nav-icon"><use :href="`/icons.svg#${item.icon}`" /></svg>
                        <span>{{ $t(item.label) }}</span>
                    </div>
                </template>
            </aside>
            <div class="settings-content">
                <General v-if="activeCategory === 'general'" />
                <About v-else-if="activeCategory === 'about'" />
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue'

import { APP_NAME } from '@/config'

import About from './components/About.vue'
import General from './components/General.vue'

const dialogRef = ref()
const activeCategory = ref('general')

const categories = [
    { key: 'general', label: 'settings.general', icon: 'settings', params: { appName: APP_NAME } },
    { key: 'about', label: 'settings.about', icon: 'info' },
]
</script>

<style lang="scss">
$sidebar-width: 180px;

.settings-sidebar {
    width: $sidebar-width;
    padding: 0 10px 10px;
    box-sizing: border-box;
    background-color: var(--bg);

    &-title {
        font-size: 16px;
        font-weight: 600;
        padding: 12px 10px;
    }

    &-nav {
        display: flex;
        align-items: center;
        gap: 6px;
        height: 34px;
        padding: 0 10px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        color: var(--text-gray);

        &:hover, &.active {
            background: var(--border);
            color: var(--text);
            font-weight: 500;
        }

        &-icon {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
        }
    }
}

.settings-content {
    position: absolute;
    inset: 40px 0 0 $sidebar-width;
    overflow: auto;
    background-color: var(--bg-content);
}

.settings-item {
    padding: 20px;
    margin-bottom: 24px;

    &-label {
        display: block;
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        font-weight: 500;
        color: var(--text-gray);
    }

    &-box {
        border-radius: 8px;
        background-color: var(--bg);
        border: 1px solid var(--border);
    }

    &-row {
        display: flex;
        align-items: center;
        padding: 15px;
        border-top: 1px solid var(--border);

        &:first-child {
            border-top: none;
        }

        &-title {
            flex: 1;
            flex-shrink: 0;

            &-place {
                font-size: 12px;
                margin-top: 4px;
                color: var(--text-gray);
            }
        }
    }
}



[data-theme="dark"] {
    .settings-theme-btn.active,
    .settings-lang-btn.active {
        background: rgba(64, 158, 255, 0.15);
    }
}
</style>
