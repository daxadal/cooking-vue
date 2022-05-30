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
    function setTheme(event: Event) {
      const themeSelected = (event.target as HTMLInputElement).value;
      emit("change", themeSelected as Pallettes);
    }
    return {
      Pallettes,
      setTheme,
    };
  },
});
</script>

<template>
  <BaseSelector
    tag="Tema:"
    id="themeSelector"
    class="a-select"
    @change="setTheme"
  >
    <option :value="Pallettes.DEFAULT">Por defecto</option>
    <option :value="Pallettes.LIGHT">Claro</option>
    <option :value="Pallettes.DARK">Oscuro</option>
  </BaseSelector>
</template>
