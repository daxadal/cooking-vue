import { computed, ComputedRef, onMounted, onUnmounted, ref } from "vue";

const WIDTH_THRESHOLD = 700;

enum SCREEN_TYPE {
  MOBILE,
  DESKTOP,
}

function useScreenType(): ComputedRef<SCREEN_TYPE> {
  const windowWidth = ref(window.innerWidth);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  const setScreenType = (): SCREEN_TYPE =>
    windowWidth.value >= WIDTH_THRESHOLD ? SCREEN_TYPE.DESKTOP : SCREEN_TYPE.MOBILE;

  return computed(() => setScreenType());
}

export { useScreenType, SCREEN_TYPE };
