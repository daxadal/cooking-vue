<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import { ScreenType, getScreenType } from "@/services/screen-size";

export default defineComponent({
  name: "modal",
  inheritAttrs: false,
  props: {
    closeOnClickAway: { type: Boolean, default: true },
    hasCloseButton: { type: Boolean, default: true },
    width: { type: String },
  },
  setup(props, { emit, slots }) {
    const modalRef = ref<HTMLElement | null>();
    const modalHasHeader = "header" in slots;
    const modalHasBody = "body" in slots;
    const modalHasActions = "actions" in slots;
    const modalHasImage = "image" in slots;
    const modalBody = ref<HTMLElement | null>();
    const screenType = getScreenType();

    function close() {
      emit("update:isVisible", false);
    }

    function onClickAway() {
      if (props.closeOnClickAway) {
        close();
      }
    }

    const onlyHasImage = computed(
      () =>
        !modalHasActions && !modalHasBody && !modalHasHeader && modalHasImage
    );

    return {
      close,
      onClickAway,
      modalRef,
      modalBody,
      modalHasActions,
      modalHasBody,
      modalHasHeader,
      onlyHasImage,
      screenType,
      ScreenType,
    };
  },
});
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-bind="$attrs" ref="modalRef" class="modal__mask">
        <transition name="drop-top">
          <div class="modal__wrap">
            <div
              class="modal__wrap--inner"
              tabindex="0"
              @click.self="onClickAway"
            >
              <div
                class="modal__body"
                ref="modalBody"
                :class="onlyHasImage ? 'modal__body--has-image' : ''"
                :style="
                  !onlyHasImage && screenType === ScreenType.DESKTOP
                    ? { maxWidth: '35rem', width }
                    : { maxWidth: '22rem' }
                "
              >
                <div class="modal__body__header">
                  <div class="modal__body__header__title">
                    <slot v-if="modalHasHeader" name="header" />
                  </div>
                  <div>
                    <span
                      v-if="hasCloseButton"
                      @click="close"
                      style="vertical-align: center; cursor: pointer"
                    >
                      Cerrar
                    </span>
                  </div>
                </div>
                <div v-if="modalHasBody" class="modal__body__content">
                  <slot name="image" />
                  <slot name="body" />
                </div>
                <div v-if="modalHasActions" class="modal__body__footer">
                  <slot name="actions" />
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
.modal {
  &__mask {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.45);
  }

  &__wrap {
    display: table;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    transition-delay: 0.05s;

    &--inner {
      display: table-cell;
      vertical-align: middle;
    }
  }

  &__body {
    text-align: center;
    margin: 0 auto;
    background-color: var(--neutral-foreground);
    border: 1px solid var(--neutral-detail);
    border-radius: 16px;
    transition: transform 0.2s ease-in-out;

    &--has-image {
      width: auto;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 32px;
      font-weight: 500;
      font-size: 1.125rem;
      line-height: 1;
      text-align: left;

      &__title {
        flex: 1 0 auto;
      }

      & + .modal__content {
        padding-top: 0;
      }
    }

    &__content {
      background-color: var(--neutral-background);
      padding: 16px 32px;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      padding: 16px 32px;
      gap: 16px;
    }
  }
}
</style>
