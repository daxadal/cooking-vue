<script lang="ts">
import { defineComponent } from "vue";

export enum Pallettes {
  DEFAULT = "default",
  LIGHT = "light",
  DARK = "dark",
}

export default defineComponent({
  name: "HelloWorld",
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
  <label>Tema:</label>
  <select id="themeSelector" class="a-select" @change="setTheme">
    <option :value="Pallettes.DEFAULT">Por defecto</option>
    <option :value="Pallettes.LIGHT">Claro</option>
    <option :value="Pallettes.DARK">Oscuro</option>
  </select>
</template>
