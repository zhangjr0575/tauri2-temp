<template>
    <div class="settings-item">
        <label class="settings-item-label">{{ $t('settings.basic') }}</label>
        <div class="settings-item-box">
            <div class="settings-item-row">
                <div class="settings-item-row-title">
                    {{ $t('settings.theme') }}
                    <div class="settings-item-row-title-place">{{ $t('settings.themePlaceholder') }}</div>
                </div>
                <Select v-model="theme" :options='THEME_OPTIONS' @change="setTheme">
                    <template #label="{ option }">
                        <svg class="select-icon"><use :href="'/icons.svg#' + option.svg" /></svg>
                        <span>{{ $t(option.label) }}</span>
                    </template>
                </Select>
            </div>
            <div class="settings-item-row">
                <div class="settings-item-row-title">
                    {{ $t('settings.language') }}
                    <div class="settings-item-row-title-place">{{ $t('settings.languagePlaceholder') }}</div>
                </div>
                <Select v-model="locale" :options='AVAILABLE_LOCALES' @change="setLocale">
                    <template #label="{ option }">
                        <span>{{ option.icon }} {{ option.label }}</span>
                    </template>
                </Select>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import { setTheme, getTheme } from '@/helper/system'
import { setLocale, getLocale, AVAILABLE_LOCALES } from '@/locales'

const theme = ref(getTheme())
const locale = ref(getLocale())

const THEME_OPTIONS = [
    { label: "settings.themeSystem", value: 'none', svg: 'pc' },
    { label: "settings.themeLight", value: 'light', svg: 'sun' },
    { label: "settings.themeDark", value: 'dark', svg: 'moon' }
]
</script>

<style lang="scss" scoped>
.select-icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
}
</style>