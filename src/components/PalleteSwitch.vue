<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HelloWorld",
  setup() {
    function setTheme(event: Event) {
      const html = document.documentElement;
      const themeSelected = (event.target as HTMLInputElement).value;

      html.classList.remove("light-theme", "dark-theme");

      if (themeSelected === "light") {
        html.classList.add("light-theme");
      } else if (themeSelected === "dark") {
        html.classList.add("dark-theme");
      }
    }

    return {
      setTheme,
    };
  },
});
</script>

<template>
  <label>Tema:</label>
  <select id="themeSelector" class="a-select" @change="setTheme">
    <option value="default">Por defecto</option>
    <option value="light">Claro</option>
    <option value="dark">Oscuro</option>
  </select>
</template>
