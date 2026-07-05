<template>
    <TitleBar v-if="platform === 'windows' || platform === 'linux'" />
    <aside class="app-aside" :style="layoutStyle">
        <header class="app-header" data-tauri-drag-region>
            <Brand v-if="platform == 'web'"/>
        </header>
        <SideNav />
    </aside>
    <div class="app-content" :class="{ expand }">
        <header class="app-header" data-tauri-drag-region>
            <button class="icon" @click="toggleSidebar">
                <svg><use href="/icons.svg#sidebar-icon" /></svg>
            </button>
            <span class="app-header_title">{{ pageTitle }}</span>
            <button class="icon light" @click="setTheme('dark')">
                <svg><use href="/icons.svg#sun-icon" /></svg>
            </button>
            <button class="icon dark" @click="setTheme('light')">
                <svg><use href="/icons.svg#moon-icon" /></svg>
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { setTheme, getPlatform } from '@/helper/system'

import Brand from './components/Brand.vue';
import SideNav from './components/SideNav.vue'
import TitleBar from './components/TitleBar.vue'

const route = useRoute()
const platform = getPlatform()

const expand = ref(false)
const pageTitle = computed(() => route.meta.title || '')

function toggleSidebar() {
    expand.value = !expand.value
}
</script>

<style lang="scss">
$margin: 6px;
$aside-width: 250px;
$header-height: 50px;
$footer-height: 44px;

.app {
    &-aside {
        position: fixed;
        width: $aside-width;
        inset: $margin auto $margin 0;
        padding-top: $header-height;
        box-sizing: border-box;
        overflow: auto;
        z-index: 99;

        >.app-header {
            padding-bottom: $margin;
            
        }
    }

    &-content {
        position: fixed;
        inset: $margin $margin $margin $aside-width;
        padding: $header-height 0 $footer-height;
        border: 1px solid var(--border);
        border-radius: 12px;
        background-color: var(--bg-content);
        transition: left 0.3s ease;
        z-index: 100;

        &.expand {
            left: $margin;
        }

        .light {
            display: block;
        }

        .dark {
            display: none;
        }
    }

    &-header {
        position: absolute;
        inset: 0 0 auto 0;
        height: $header-height;
        padding: 0 15px;
        box-sizing: border-box;
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

[data-theme="dark"] {
    .icon.dark {
        display: block;
    }

    .icon.light {
        display: none;
    }
}

[data-platform='macos'] {
    .expand > .app-header {
        padding-left: 76px;
    }
}
</style>
