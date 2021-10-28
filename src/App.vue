<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="cards">
    <Card class="cards__card" title="Awesome card">
      <button>Click me!</button><button>No, click ME!</button>
    </Card>
    <Card class="cards__card" title="Lorem ipsum">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus
        orci mauris, nec volutpat libero convallis non. Curabitur sed sagittis
        nisi. Nullam elementum augue et urna placerat, pretium sollicitudin
        nulla gravida. Donec ac pellentesque dolor. Nulla commodo auctor purus,
        ultricies bibendum mi ultrices rutrum. Pellentesque facilisis, orci nec
        fringilla pretium, magna arcu ultricies odio, eget dapibus nulla ex nec
        risus. Suspendisse potenti
      </p>
    </Card>
    <Card class="cards__card">
      <input placeholder="Type something" />
    </Card>
  </div>
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Card from "./components/Card.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Card,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.cards {
  display: flex;
  flex-direction: row;
}

.cards__card {
  flex: 1 0 0;
}
</style>
