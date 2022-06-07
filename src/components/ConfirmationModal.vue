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
    @close="$emit('cancel')"
    :closeOnClickAway="false"
    :hasCloseButton="false"
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
      <div class="wrapper">
        <BaseButton text @click="$emit('cancel')"> Cancel </BaseButton>
        <BaseButton text @click="$emit('confirm')"> OK </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.wrapper {
  justify-content: center;
  width: 100%;
}
.title {
  text-align: center;
}
</style>
