<script lang="ts">
import { defineComponent } from "vue";
import BaseSelector from "./BaseSelector.vue";

export enum Pallettes {
  DEFAULT = "default",
  LIGHT = "light",
  DARK = "dark",
}

export default defineComponent({
  components: {
    BaseSelector,
  },
  emits: ["change"],
  setup(props, { emit }) {
    return {
      Pallettes,
      setTheme: (themeSelected: Pallettes) => {
        emit("change", themeSelected);
      },
    };
  },
});
</script>

<template>
  <BaseSelector
    tag="Theme: "
    id="themeSelector"
    class="a-select"
    :value="Pallettes.DEFAULT"
    @update:modelValue="setTheme"
  >
    <option :value="Pallettes.DEFAULT">Default</option>
    <option :value="Pallettes.LIGHT">Light</option>
    <option :value="Pallettes.DARK">Dark</option>
  </BaseSelector>
</template>
