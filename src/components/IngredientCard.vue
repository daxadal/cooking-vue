<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

import BaseCard from "@/components/BaseCard.vue";

import {
  Colors,
  Ingredient,
  IngredientType,
} from "@/resources/constants-types";

export default defineComponent({
  components: {
    BaseCard,
  },
  props: {
    ingredient: {
      type: Object as PropType<Partial<Ingredient>>,
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
    return { color, IngredientType };
  },
});
</script>

<template>
  <BaseCard :title="ingredient.name || '(No name)'" :color="color">
    <template #center>
      <img
        v-if="ingredient.type === IngredientType.START"
        src="@/assets/vegetables.svg"
      />
      <img
        v-else-if="ingredient.type === IngredientType.MID"
        src="@/assets/pan.svg"
      />
      <img
        v-else-if="ingredient.type === IngredientType.END"
        src="@/assets/chinese-food.svg"
      />
      <img v-else src="@/assets/question-mark.svg" />
    </template>
    <template #left-corner v-if="ingredient.id">
      <p>ID: {{ ingredient.id }}</p>
    </template>
    <template #right-corner>
      <p>Type: {{ ingredient.type || "(No type)" }}</p>
    </template>
  </BaseCard>
</template>
