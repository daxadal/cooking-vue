<template>
  <modal
    :isVisible="isVisible"
    @update:isVisible="changeVisibility"
    :closeOnClickAway="false"
    :hasCloseButton="false"
  >
    <template #header>
      <h3 class="title">{{ title }}</h3>
    </template>
    <template #image>
      <img src="@/assets/resources/images/placeholders/error.png" v-if="isError" />
      <img src="@/assets/resources/images/placeholders/success.png" v-else />
    </template>

    <template #body>
      <p>{{ message }}</p>
    </template>
    <template #actions>
      <div class="wrapper">
        <h-button type="primary" text @click="changeVisibility(false)"> Aceptar </h-button>
      </div>
    </template>
  </modal>
</template>

<script lang="ts">
import modal from "@/components/ui/molecules/modal/modal.vue";
import { defineComponent } from "vue";
import hButton from "@/components/ui/atoms/button/button.vue";

export default defineComponent({
  components: { modal, hButton },
  props: {
    message: { type: String },
    title: { type: String },
    isVisible: { type: Boolean, required: true },
    isError: { type: Boolean, required: true },
  },
  setup(props, { emit }) {
    function changeVisibility(visibility: boolean) {
      emit("update:isVisible", visibility);
    }
    return {
      changeVisibility,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  justify-content: center;
  width: 100%;
}
.title {
  text-align: center;
}
</style>
