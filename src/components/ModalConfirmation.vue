<script lang="ts">
import { defineComponent } from "vue";

import BaseModal from "@/components/BaseModal.vue";
import BaseButton from "@/components/BaseButton.vue";

export default defineComponent({
  components: { BaseModal, BaseButton },
  props: {
    message: { type: String },
  },
  emits: ["confirm", "cancel"],
});
</script>
<template>
  <BaseModal
    :closeOnClickAway="false"
    :hasCloseButton="false"
    @close="$emit('cancel')"
  >
    <template #header>
      <h3 class="title">Confirm action?</h3>
    </template>
    <template #image>
      <img src="@/assets/warning.svg" />
    </template>

    <template #body>
      <p>{{ message }}</p>
    </template>
    <template #actions>
      <div class="actions">
        <BaseButton class="actions__button" text @click="$emit('cancel')">
          Cancel
        </BaseButton>
        <BaseButton class="actions__button" text @click="$emit('confirm')">
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
  gap: 64px;

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
