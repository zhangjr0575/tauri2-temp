<template>
    <Teleport to="body">
        <transition name="fade">
            <div v-if="visible" class="dialog-overlay" @click.self="close">
                <div class="dialog" :style="{ width }">
                    <button class="svg-icon dialog-close" @click="close">
                        <svg><use href="/icons.svg#close" /></svg>
                    </button>
                    <slot />
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '620px'
    }
})
const visible = ref(false)
const emit = defineEmits(['close'])

function open() {
    visible.value = true
}
function close() {
    visible.value = false
    emit('close')
}

function onKeydown(e) {
    e.key === 'Escape' && visible.value && close()
}

onMounted(() => {
    document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
})
defineExpose({ close, open })
defineOptions({ name: 'Dialog' })
</script>

<style lang="scss">
.dialog-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.dialog {
    position: relative;
    max-width: 90vw;
    max-height: 80vh;
    border-radius: 12px;
    overflow: hidden;
    background: var(--bg-content);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);

    &-close {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
    }
}
</style>
