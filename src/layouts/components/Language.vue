<template>
    <div class="lang-switch" v-clickOutside="closeMenu">
        <button class="svg-icon lang-btn" @click="openMenu">
            <svg><use href="/icons.svg#globe" /></svg>
        </button>
        <transition name="fade">
            <div v-if="menuVisible" class="lang-menu" @click.stop>
                <template v-for="item in AVAILABLE_LOCALES" :key="item.value">
                    <div class="lang-menu-item" :class="{ active: locale === item.value }" @click="switchLang(item.value)">
                        <span class="lang-menu-icon">{{ item.icon }}</span>
                        <span>{{ item.label }}</span>
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { locale, setLocale, AVAILABLE_LOCALES } from '@/locales'

const menuVisible = ref(false)

function switchLang(lang) {
    closeMenu()
    setLocale(lang)
}

function closeMenu() {
    menuVisible.value = false
}

function openMenu() {
    menuVisible.value = true
}
</script>

<style lang="scss">
.lang-switch {
    position: relative;

    &-btn {
        cursor: pointer;
    }
}

.lang-menu {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    min-width: 120px;
    background: var(--bg-content);
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 4px;
    z-index: 1000;

    &-item {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        font-size: 14px;
        color: var(--text);
        cursor: pointer;
        border-radius: 6px;
        transition: background 0.15s ease;

        &:hover {
            background: var(--border);
        }

        &.active {
            color: var(--text);
            font-weight: 500;
            background: var(--border);
        }
    }

    &-icon {
        font-size: 16px;
        margin-right: 8px;
        flex-shrink: 0;
    }
}
</style>