<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

import BaseModal from "@/components/BaseModal.vue";
import BaseButton from "@/components/BaseButton.vue";
import { checkEnumExhausted } from "@/resources/constants-types";

export enum ModalType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export default defineComponent({
  components: { BaseModal, BaseButton },
  props: {
    message: { type: String },
    type: {
      type: String as PropType<ModalType>,
      default: ModalType.INFO,
      validator: (value: ModalType) => Object.values(ModalType).includes(value),
    },
  },
  emits: ["close"],
  setup(props) {
    const title = computed(() => {
      switch (props.type) {
        case ModalType.SUCCESS:
          return "Success";
        case ModalType.ERROR:
          return "Error";
        case ModalType.INFO:
          return "Info";
        default:
          return checkEnumExhausted(props.type);
      }
    });

    return {
      ModalType,

      title,
    };
  },
});
</script>
<template>
  <BaseModal
    :closeOnClickAway="false"
    :hasCloseButton="false"
    @close="$emit('close')"
  >
    <template #header>
      <h3 class="title">{{ title }}</h3>
    </template>
    <template #image>
      <img v-if="type === ModalType.ERROR" src="@/assets/error.png" />
      <img v-else src="@/assets/success.png" />
    </template>

    <template #body>
      <p>{{ message }}</p>
    </template>
    <template #actions>
      <div class="actions">
        <BaseButton class="actions__button" text @click="$emit('close')">
          OK
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.actions {
  width: 100%;

  display: flex;
  flex-direction: row;
  gap: 160px;

  justify-content: center;
  align-content: center;

  &__button {
    flex: 1 0 0;
  }
}

.title {
  text-align: center;
}
</style>
