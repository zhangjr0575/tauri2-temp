<template>
    <div class="select" :class="{ disabled }" v-clickOutside="close">
        <div class="select-trigger" @click="toggle">
            <span class="select-value" :class="{ placeholder: isEmpty }">
                <template v-if="isEmpty">{{ placeholder }}</template>
                <slot v-else name="label" :option="currentOption" :value="modelValue">{{ currentOption.label }}</slot>
            </span>
            <button v-if="clearable && !isEmpty && !disabled" class="svg-icon select-clear" @click.stop="clear">
                <svg><use href="/icons.svg#close" /></svg>
            </button>
            <svg v-else class="select-arrow" :class="{ open: visible }"><use href="/icons.svg#right" /></svg>
        </div>
        <transition name="fade">
            <div v-if="visible" class="select-dropdown" @click.stop>
                <div v-if="normalizedOptions.length === 0" class="select-empty">{{ emptyText }}</div>
                <template v-else>
                    <template v-for="item in normalizedOptions" :key="item.value">
                        <div class="select-option" :class="{ active: currentOption.value == item.value, disabled: item.disabled }" @click="onSelect(item)">
                            <span class="select-option-label">
                                <slot name="label" :option="item">{{ item.label }}</slot>
                            </span>
                            <svg v-if="currentOption.value == item.value" class="select-option-check">
                                <use href="/icons.svg#correct" />
                            </svg>
                        </div>
                    </template>
                </template>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { t } from '@/locales'
import { ref, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number, Boolean, Object],
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    },
    placeholder: {
        type: String,
        default: t('packages.select.placeholder')
    },
    emptyText: {
        type: String,
        default: t('packages.select.emptyPlaceholder')
    },
    disabled: {
        type: Boolean,
        default: false
    },
    clearable: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:modelValue', 'change'])

const visible = ref(false)

// 兼容 { label, value } 结构与原始值两种写法
const normalizedOptions = computed(() =>props.options.map((item) => typeof item === 'object' && item !== null ? item : { label: item, value: item }))
const isEmpty = computed(() => props.modelValue === '' || props.modelValue === null || props.modelValue === undefined)
const currentOption = computed(() => normalizedOptions.value.find((item) => item.value === props.modelValue) || null)

function toggle() {
    if (props.disabled) return
    visible.value = !visible.value
}
function open() {
    if (props.disabled) return
    visible.value = true
}
function close() {
    visible.value = false
}
function onSelect(item) {
    if (item.disabled) return

    if (item.value !== props.modelValue) {
        emit('update:modelValue', item.value)
        emit('change', item.value)
    }
    close()
}
function clear() {
    emit('update:modelValue', '')
    emit('change', '')
    close()
}

defineExpose({ open, close })
defineOptions({ name: 'Select' })
</script>

<style lang="scss">
.select {
    position: relative;
    display: inline-block;
    width: 160px;
    min-width: 160px;

    &.disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &-trigger {
        display: flex;
        align-items: center;
        gap: 6px;
        min-height: 36px;
        padding: 0 10px;
        cursor: pointer;
        border-radius: 8px;
        box-sizing: border-box;
        border: 1px solid var(--border);
        
        color: var(--text);
        background: var(--bg-content);
        transition: border-color 0.15s ease;

        .select.disabled & {
            cursor: not-allowed;
        }

        &:hover {
            border-color: var(--primary);
        }
    }

    &-value {
        flex: 1;
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &.placeholder {
            color: var(--text-gray);
        }
    }

    &-arrow {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
        color: var(--text-gray);
        transition: transform 0.2s ease;
        transform: rotate(90deg);

        &.open {
            transform: rotate(-90deg);
        }
    }

    &-clear {
        width: 22px;
        height: 22px;
        flex-shrink: 0;

        >svg {
            width: 14px;
            height: 14px;
        }
    }

    &-dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        max-height: 240px;
        overflow-y: auto;
        padding: 4px;
        z-index: 1000;
        background: var(--bg-content);
        border: 1px solid var(--border);
        border-radius: 8px;
        box-shadow: var(--shadow);
    }

    &-empty {
        padding: 8px 12px;
        text-align: center;
        color: var(--text-gray);
    }

    &-option {
        display: flex;
        align-items: center;
        min-height: 32px;
        padding: 0 10px;
        cursor: pointer;
        border-radius: 6px;
        color: var(--text);
        transition: background 0.15s ease;

        &:hover {
            background: var(--border);
        }
        &.active {
            color: var(--primary);
            font-weight: 500;
        }
        &.disabled {
            cursor: not-allowed;
            opacity: 0.5;

            &:hover {
                background: transparent;
            }
        }

        &-label {
            flex: 1;
            display: flex;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        &-check {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
            margin-left: 6px;
            color: var(--primary);
        }
    }
}
</style>
