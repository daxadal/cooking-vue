<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
    },
    tag: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    return {
      onChange: function (event: Event) {
        const input = event.target as HTMLInputElement;

        emit("update:modelValue", input.value);
      },
    };
  },
});
</script>

<template>
  <div class="wrapper">
    <label :for="id" v-if="tag" class="wrapper__label">{{ tag }}</label>
    <input
      :id="id"
      :type="type"
      @input="onChange"
      class="wrapper__input"
      v-bind="$attrs"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;

  &__label {
    flex: 0 0 auto;
    align-self: center;
    padding: 8px;
  }
  &__input {
    flex: 1 1 0;
    padding: 6px 16px;
    font-family: inherit;
    line-height: 1;
    border: 1px solid var(--neutral-detail);
    border-radius: 8px;
    outline: none;

    color: var(--neutral-text);
    background-color: var(--neutral-foreground);

    &:focus {
      border-color: var(--neutral-text);
    }
  }
}
</style>
