<template>
    <div class="titlebar" data-tauri-drag-region @dblclick="onDblClick">
        <Brand/>
        <div class="titlebar-controls">
            <button class="titlebar-btn" @click="onAction('minimize')">
                <svg viewBox="0 0 10 10"><line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" stroke-width="1"/></svg>
            </button>
            <button class="titlebar-btn" @click="onAction('toggleMaximize')">
                <svg v-if="!isMaximized" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1"/></svg>
                <svg v-else viewBox="0 0 10 10">
                    <rect x="2.5" y="0.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1"/>
                    <rect x="0.5" y="2.5" width="7" height="7" fill="var(--bg-content)" stroke="currentColor" stroke-width="1"/>
                </svg>
            </button>
            <button class="titlebar-btn titlebar-btn-close" @click="onAction('close')">
                <svg viewBox="0 0 10 10"><path d="M0 0L10 10M10 0L0 10" stroke="currentColor" stroke-width="1.2"/></svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getName } from '@tauri-apps/api/app';
import { getCurrentWindow } from '@tauri-apps/api/window';

import Brand from './Brand.vue';

const appName = ref('');
const isMaximized = ref(false);

const appWin = getCurrentWindow();

async function updateMaximized() {
    isMaximized.value = await appWin.isMaximized()
}

async function onAction(type) {
    switch(type) {
        case 'close':
        case 'minimize':
            appWin[type](); break;
        case 'toggleMaximize':
            await appWin.toggleMaximize();
            await updateMaximized();
    }
}

function onDblClick(e) {
    !e.target.closest('.titlebar-controls') && onAction('toggleMaximize');
}

onMounted(async () => {
    appName.value = await getName();
    isMaximized.value = await appWin.isMaximized();

    updateMaximized();
    appWin.onResized(updateMaximized);
})
</script>

<style lang="scss">
$titlebar-height: 32px;
$titlebar-btn-width: 46px;

.titlebar {
    position: fixed;
    inset: 0 0 auto;
    height: $titlebar-height;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    -webkit-user-select: none;

    &-controls {
        display: flex;
        height: $titlebar-height;
    }

    &-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: $titlebar-btn-width;
        height: 100%;
        padding: 0;
        border: none;
        background: transparent;
        color: var(--text);
        cursor: pointer;
        transition: background 0.1s ease;

        svg {
            width: 10px;
            height: 10px;
        }

        &:hover {
            background: rgba(0, 0, 0, 0.06);
        }

        &-close {
            &:hover {
                background: #C42B1C;
                color: #fff;
            }
        }
    }
}

[data-theme="dark"] {
    .titlebar-btn {
        &:hover {
            background: rgba(255, 255, 255, 0.08);
        }

        &-close:hover {
            background: #C42B1C;
        }
    }
}
</style>
