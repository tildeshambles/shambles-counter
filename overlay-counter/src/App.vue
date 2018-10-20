<template>
  <div id="app">
    <router-view v-if="ready"/>
    <div v-else>
      Not ready
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { APP_INIT } from "@/store/actions";

export default {
  name: "app",
  computed: {
    ...mapState(["ready"])
  },
  methods: {
    ...mapActions({
      init: APP_INIT
    })
  },
  created() {
    this.init();
  }
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
body {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
#app {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
}
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  will-change: transform;
  transition: opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 2.55);
  animation: pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 2.55);
  transform-origin: center;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  animation: pop 0.4s ease-in-out;
  animation-direction: reverse;
}
@keyframes pop {
  0% {
    transform: scale(0.01);
  }
  100% {
    transform: scale(1);
  }
}
</style>
