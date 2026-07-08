<template>
    <div class="settings-about">
        <img class="settings-about-icon" src="/icon.png" />
        <div class="settings-about-name">{{ APP_NAME }}</div>
        <div class="settings-about-version">v{{ VERSION }}</div>
        <div class="settings-about-copyright">{{ COPYRIGHT }}</div>
    </div>
</template>

<script setup>
import { APP_NAME, VERSION, COPYRIGHT } from '@/config'
</script>

<style lang="scss">
.settings-about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 280px;
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
        font-size: 13px;
        color: var(--text-gray);
        margin-top: 4px;
    }

    &-copyright {
        font-size: 12px;
        color: var(--text-gray);
        margin-top: 16px;
    }
}
</style>