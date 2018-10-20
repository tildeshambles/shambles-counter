<template>
  <div class="home">
    <OverlayComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import OverlayComponent from "@/components/OverlayComponent.vue";

export default {
  name: "home",
  components: {
    OverlayComponent
  }
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
}
</style>
