<template >
  <div class="cards">
    <BaseCard class="cards__card" title="Awesome card">
      <button>Click me!</button><button>No, click ME!</button>
    </BaseCard>
    <BaseCard class="cards__card" title="Lorem ipsum">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus
        orci mauris, nec volutpat libero convallis non. Curabitur sed sagittis
        nisi. Nullam elementum augue et urna placerat, pretium sollicitudin
        nulla gravida. Donec ac pellentesque dolor. Nulla commodo auctor purus,
        ultricies bibendum mi ultrices rutrum. Pellentesque facilisis, orci nec
        fringilla pretium, magna arcu ultricies odio, eget dapibus nulla ex nec
        risus. Suspendisse potenti
      </p>
    </BaseCard>
    <BaseCard class="cards__card">
      <input placeholder="Type something" />
    </BaseCard>
  </div>
</template>

<script lang="ts">
import BaseCard from "@/components/BaseCard.vue";

export default {
  name: "Home",
  components: {
    BaseCard,
  },
};
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