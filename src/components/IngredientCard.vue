<script lang="ts">
import {
  Colors,
  Ingredient,
  IngredientType,
} from "@/resources/constants-types";
import { computed, defineComponent, PropType } from "vue";
import BaseCard from "@/components/BaseCard.vue";

export default defineComponent({
  components: {
    BaseCard,
  },
  props: {
    ingredient: {
      type: Object as PropType<Ingredient>,
      required: true,
    },
  },
  setup(props) {
    const color = computed((): Colors => {
      switch (props.ingredient.type) {
        case IngredientType.START:
          return Colors.GREEN;
        case IngredientType.MID:
          return Colors.PURPLE;
        case IngredientType.END:
          return Colors.CYAN;
        default:
          return Colors.NEUTRAL;
      }
    });
    return { color, Colors };
  },
});
</script>

<template>
  <BaseCard :title="ingredient.name" :color="color">
    <template #center>
      <img src="@/assets/success.png" />
    </template>
    <template #left-corner>
      <p>ID: {{ ingredient.id }}</p>
    </template>
    <template #right-corner>
      <p>Type: {{ ingredient.type }}</p>
    </template>
  </BaseCard>
</template>
