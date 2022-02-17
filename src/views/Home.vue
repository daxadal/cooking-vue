<template>
  <div class="cards">
    <BaseCard
      class="cards__card"
      title="Awesome card"
      leftCorner="cornerL"
      rightCorner="cornerR"
    >
      <template #center>
        <button>Click me!</button><button>No, click ME!</button>
      </template>
    </BaseCard>
    <BaseCard class="cards__card" title="Lorem ipsum" leftCorner="cornerL">
      <template #center>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus
          orci mauris, nec volutpat libero convallis non. Curabitur sed sagittis
          nisi. Nullam elementum augue et urna placerat, pretium sollicitudin
          nulla gravida. Donec ac pellentesque dolor. Nulla commodo auctor
          purus, ultricies bibendum mi ultrices rutrum. Pellentesque facilisis,
          orci nec fringilla pretium, magna arcu ultricies odio, eget dapibus
          nulla ex nec risus. Suspendisse potenti
        </p>
      </template>
    </BaseCard>
    <BaseCard class="cards__card" rightCorner="cornerR">
      <template #center> <input placeholder="Type something" /> </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseCard from "@/components/BaseCard.vue";

export default defineComponent({
  name: "Home",
  components: {
    BaseCard,
  },
});
</script>

<style>
.cards {
  display: flex;
  flex-direction: row;
}

.cards__card {
  flex: 1 0 0;
}
</style>
