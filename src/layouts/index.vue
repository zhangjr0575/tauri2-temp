<template>
    <aside class="app-aside">
        <header class="app-header" data-tauri-drag-region></header>
        <SideNav />
    </aside>
    <div class="app-content" :class="{ expand }">
        <header class="app-header" data-tauri-drag-region>
            <button class="icon" @click="toggleSidebar">
                <svg><use href="/icons.svg#sidebar-icon" /></svg>
            </button>
            <span class="app-header_title">{{ pageTitle }}</span>
            <button class="icon" @click="toggleTheme">
                <svg v-if="isDark"><use href="/icons.svg#sun-icon" /></svg>
                <svg v-else><use href="/icons.svg#moon-icon" /></svg>
            </button>
        </header>
        <main class="app-main">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </main>
        <footer class="app-footer">
            &copy; 2026 My App. All rights reserved.
        </footer>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import SideNav from './components/SideNav.vue'

const route = useRoute()
const pageTitle = computed(() => route.meta.title || '')

const expand = ref(false)
const isDark = ref(false)

let userFixedTheme = localStorage.getItem('theme')

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')

function applyDark(dark) {
    isDark.value = dark
    document.documentElement.classList.toggle('dark', dark)
}

function onSystemChange(e) {
    !userFixedTheme && applyDark(e.matches)
}

function toggleSidebar() {
    expand.value = !expand.value
}

function toggleTheme() {
    userFixedTheme = isDark.value ? 'light' : 'dark'

    applyDark(!isDark.value)
    localStorage.setItem('theme', userFixedTheme)
}

onMounted(() => {
    applyDark(userFixedTheme ? userFixedTheme === 'dark' : colorScheme.matches)
    
    colorScheme.addEventListener('change', onSystemChange)
})

onUnmounted(() => {
    colorScheme.removeEventListener('change', onSystemChange)
})
</script>

<style lang="scss">
$margin: 3px;
$aside-width: 250px;
$header-height: 50px;
$footer-height: 44px;
$traffic-light-width: 95px;

.app {
    &-aside {
        position: fixed;
        width: $aside-width;
        padding-top: $header-height;
        inset: $margin 0 $margin 0;
        overflow: auto;
        border-radius: 0 0 12px 12px;
        box-sizing: border-box;
        z-index: 99;
    }

    &-content {
        position: fixed;
        inset: $margin $margin $margin $aside-width + $margin;
        padding-top: $header-height;
        padding-bottom: $footer-height;
        border-radius: 12px;
        border: 1px solid var(--border);
        background-color: var(--bg-content);
        transition: left 0.3s ease;
        z-index: 100;

        &.expand {
            left: $margin;

            .app-header {
                padding-left: $traffic-light-width;
            }
        }
    }

    &-header {
        position: absolute;
        inset: 0 0 auto 0;
        height: $header-height;
        padding: 0 15px;
        border-bottom: 1px solid var(--border);
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: padding-left 0.3s ease;

        &_title {
            flex: 1;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    &-main {
        position: absolute;
        inset: $header-height 0 $footer-height 0;
        overflow: auto;
    }

    &-footer {
        position: absolute;
        inset: auto 0 0 0;
        height: $footer-height;
        line-height: $footer-height;
        border-top: 1px solid var(--border);
        text-align: center;
        color: var(--text-gray);
        padding: 0 15px;
        box-sizing: border-box;
        transition: padding-left 0.3s ease;
    }
}

.icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--text-gray);
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
        background: var(--border);
        color: var(--text);
    }

    > svg {
        width: 18px;
        height: 18px;
    }
}
</style>
