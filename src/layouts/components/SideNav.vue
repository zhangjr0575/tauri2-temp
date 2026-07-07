<template>
    <nav class="app-nav">
        <template v-for="item in routes" :key="item.name">
            <template v-if="item.children">
                <div class="app-nav-item" @click="toggle(item.name)">
                    <span class="app-nav-item-title">{{ item.meta.i18n ? t(item.meta.title) : item.meta.title }}</span>
                    <svg class="app-nav-arrow" :class="{ open: openGroups.includes(item.name) }">
                        <use href="/icons.svg#chevron-icon" />
                    </svg>
                </div>
                <div class="app-nav-item-group" v-show="openGroups.includes(item.name)">
                    <template v-for="child in item.children" :key="child.name">
                        <router-link class="app-nav-item" v-if="!child.meta?.hidden" :to="resolvePath(item.path, child.path)" >
                            <span class="app-nav-item-title">{{ child.meta.i18n ? t(child.meta.title) : child.meta.title }}</span>
                        </router-link>
                    </template>
                </div>
            </template>
            <router-link class="app-nav-item" v-else-if="!item.meta?.hidden" :to="item.path">
                <span class="app-nav-item-title">{{ item.meta.i18n ? t(item.meta.title) : item.meta.title }}</span>
            </router-link>
        </template>
    </nav>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { t } from '@/locales';
import { routes } from '../../router';

const route = useRoute();
const openGroups = reactive([]);

function resolvePath(parentPath, childPath) {
    if (!childPath || childPath.startsWith('/')) return childPath || parentPath;

    return parentPath.replace(/\/$/, '') + '/' + childPath
}

function toggle(key) {
    const index = openGroups.indexOf(key)
    
    index > -1 ? openGroups.splice(index, 1) : openGroups.push(key);
}

function expandForPath(path) {
    for (const item of routes) {
        if (!item.children) continue;

        const match = item.children.some(
            child => resolvePath(item.path, child.path) === path
        )
        match && !openGroups.includes(item.name) && openGroups.push(item.name);
    }
}

watch(() => route.path, expandForPath, { immediate: true })
</script>

<style lang="scss">
.app-nav {
    padding: 12px;
    user-select: none;

    &-item {
        display: flex;
        align-items: center;
        height: 32px;
        padding: 0 12px;
        margin-bottom: 4px;
        border-radius: 8px;
        color: var(--text-gray);
        text-decoration: none;
        font-size: 14px;
        cursor: pointer;

        &:hover {
            background: var(--border);
            color: var(--text);
        }

        &.router-link-active {
            background: var(--border);
            color: var(--text);
            font-weight: 500;
        }

        &-title {
            flex: 1;
        }

        &-group {
            &>.app-nav-item {
                padding-left: 28px;
            }
        }
    }

    &-arrow {
        width: 14px;
        height: 14px;
        transition: transform 0.2s ease;

        &.open {
            transform: rotate(90deg);
        }
    }
}
</style>
