<template>
    <div class="settings-about">
        <img class="settings-about-icon" src="/icon.png" />
        <div class="settings-about-name">{{ APP_NAME }}</div>
    </div>
    <div class="settings-item">
        <div class="settings-item-box">
            <div class="settings-item-row">
                <div class="settings-item-row-title">
                    版本信息
                    <div class="settings-item-row-title-place">v{{ VERSION }}(20260102)</div>
                </div>
                <Updater />
            </div>
            <div v-if="GITHUB_URL" class="settings-item-row external-link" @click="openExternal(GITHUB_URL)">
                <div class="settings-item-row-title">开源地址</div>
                <button class="svg-icon">
                    <svg><use href="/icons.svg#open-link" /></svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { APP_NAME, VERSION, GITHUB_URL } from '@/config'

import { openExternal } from '@/helper/system.js'

import Updater from '../../Updater.vue'
</script>

<style lang="scss">
.settings-about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 180px;
    text-align: center;

    &-icon {
        width: 64px;
        height: 64px;
        object-fit: contain;
        margin-bottom: 12px;
    }

    &-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--text);
    }

    &-version {
        margin-top: 4px;
        font-size: 13px;
        color: var(--text-gray);
    }
}

.external-link {
    cursor: pointer;
}
</style>