<script lang="ts">
import { defineComponent, h } from "vue";

export default defineComponent({
  props: {
    horizontal: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    return () =>
      h(
        "ul",
        {
          class: [
            "list",
            props.horizontal ? "list--horizontal" : "list--vertical",
          ],
        },
        context.slots
      );
  },
});
</script>

<style lang="scss" scoped>
.list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }
}
</style>
