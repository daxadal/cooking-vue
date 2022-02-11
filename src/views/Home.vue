<template>
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
  <BaseButton text @click="showModalError"> Modal </BaseButton>
  <InformationModal
    v-if="isInfoVisible"
    @update:isVisible="isInfoVisible = $event"
    :title="modalTitle"
    :message="modalMessage"
    :isError="isError"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import BaseCard from "@/components/BaseCard.vue";
import InformationModal from "@/components/InformationModal.vue";

export default defineComponent({
  name: "Home",
  components: {
    BaseCard,
    InformationModal,
  },
  setup() {
    const isInfoVisible = ref(false);
    const modalTitle = ref();
    const modalMessage = ref();
    const isError = ref(true);

    function showModalError() {
      isError.value = true;
      modalTitle.value = "Error";
      modalMessage.value = "Mensaje de error";
      isInfoVisible.value = true;
    }

    return {
      isInfoVisible,
      modalTitle,
      modalMessage,
      isError,
      showModalError,
    };
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
