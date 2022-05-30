<script lang="ts">
import { defineComponent } from "vue";

import BaseModal from "@/components/BaseModal.vue";
import BaseButton from "@/components/BaseButton.vue";

export default defineComponent({
  components: { BaseModal, BaseButton },
  props: {
    message: { type: String },
    title: { type: String },
    isError: { type: Boolean, required: true },
  },
  setup(props, { emit }) {
    const changeVisibility = (visibility: boolean) =>
      emit("update:isVisible", visibility);

    return { changeVisibility };
  },
});
</script>
<template>
  <BaseModal
    @update:isVisible="changeVisibility"
    :closeOnClickAway="false"
    :hasCloseButton="false"
  >
    <template #header>
      <h3 class="title">{{ title }}</h3>
    </template>
    <template #image>
      <img v-if="isError" src="@/assets/error.png" />
      <img v-else src="@/assets/success.png" />
    </template>

    <template #body>
      <p>{{ message }}</p>
    </template>
    <template #actions>
      <div class="wrapper">
        <BaseButton text @click="changeVisibility(false)"> OK </BaseButton>
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
