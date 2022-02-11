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
                <slot name="image" />
                <slot />
                <div v-if="modalHasBody" class="modal__body__content">
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
@use "./src/assets/styles/settings/variables";

.modal {
  &__mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: variables.$z_modal;
    width: variables.$width-100;
    height: variables.$height-100;
    margin: 0;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.45);
  }

  &__wrap {
    display: table;
    width: variables.$width-100;
    height: variables.$height-100;
    overflow: hidden;
    transition-delay: 0.05s;

    &--inner {
      display: table-cell;
      padding: variables.$space-48 0;
      vertical-align: middle;
    }
  }

  &__body {
    display: table;
    width: variables.$width-100;
    margin: 0 auto;
    overflow: hidden;
    background-color: var(--background-color);
    border: none;
    border-radius: variables.$space-16;
    outline: none;
    box-shadow: 0 0 0 variables.$space-1 rgba(0, 0, 0, 0.15),
      0 variables.$space-2 variables.$space-1 rgba(0, 0, 0, 0.1);
    cursor: default;
    transition: transform 0.2s ease-in-out;

    > img {
      display: block;
      max-width: variables.$width-100;
    }

    &--has-image {
      width: auto;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: variables.$space-16 variables.$space-32;
      font-weight: variables.$font-weight-modal-header;
      font-size: variables.$font-modal-header;
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
      padding: variables.$space-16 variables.$space-32;
      overflow: auto;
      font-size: variables.$font-modal-content;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
      // flex-direction: row-reverse;
      padding: variables.$space-16 variables.$space-32;
      background-color: var(--background-color-2);

      .button + .button {
        margin-left: variables.$space-16;
      }
    }
  }
}
</style>
