import { ref } from "vue";

export const isUserAuthenticated = ref(
  Boolean(localStorage.getItem("authenticationToken"))
);

export const getAuthenticationToken = (): string | null =>
  localStorage.getItem("authenticationToken");

export const setAuthenticationToken = (token: string): void => {
  localStorage.setItem("authenticationToken", token);
  isUserAuthenticated.value = true;
};

export const unsetAuthenticationToken = (): void => {
  localStorage.removeItem("authenticationToken");
  isUserAuthenticated.value = false;
};
