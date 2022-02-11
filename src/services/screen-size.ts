import { computed, ComputedRef, onMounted, onUnmounted, ref } from "vue";

const WIDTH_THRESHOLD = 700;

enum ScreenType {
  MOBILE,
  DESKTOP,
}

function getScreenType(): ComputedRef<ScreenType> {
  const windowWidth = ref(window.innerWidth);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  return computed(() =>
    windowWidth.value >= WIDTH_THRESHOLD
      ? ScreenType.DESKTOP
      : ScreenType.MOBILE
  );
}

export { getScreenType, ScreenType };
