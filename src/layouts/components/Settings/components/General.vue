<template>
    <div class="settings-item">
        <label class="settings-item-label">基础设置</label>
        <div class="settings-item-box">
            <div class="settings-item-row">
                <div class="settings-item-row-title">
                    {{ $t('settings.theme') }}
                    <div class="settings-item-row-title-place">
                        {{ $t('settings.themePlaceholder') }}
                    </div>
                </div>
                <Select v-model="theme" :options='THEME_OPTIONS'>
                    <template #label="{ option }">
                        <svg class="select-icon">
                            <use :href="'/icons.svg#' + option.svg" />
                        </svg>
                        <span class="lang-flag">{{ $t(option.label) }}</span>
                    </template>
                </Select>
            </div>

            <div class="settings-item-row">
                <div class="settings-item-row-title">
                    {{ $t('settings.language') }}
                    <div class="settings-item-row-title-place">
                        {{ $t('settings.languagePlaceholder') }}
                    </div>
                </div>
                <Select v-model="locale" :options='AVAILABLE_LOCALES'>
                    <template #label="{ option }">
                        <span>{{ option.icon }} {{ option.label }}</span>
                    </template>
                </Select>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import { setTheme } from '@/helper/system'
import { locale, setLocale, AVAILABLE_LOCALES } from '@/locales'


const theme = ref(localStorage.getItem('theme') || 'none')

const THEME_OPTIONS = [
    { label: "settings.themeSystem", value: 'none', svg: 'pc' },
    { label: "settings.themeLight", value: 'light', svg: 'sun' },
    { label: "settings.themeDark", value: 'dark', svg: 'moon' }
]

function applyTheme(theme) {
    currentTheme.value = theme
    setTheme(theme)
}

function changeLang(lang) {
    setLocale(lang)
}
</script>

<style lang="scss" scoped>
.select-icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
}
</style>