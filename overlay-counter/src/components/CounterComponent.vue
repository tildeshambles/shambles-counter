<template>
    <div><span class="counter">{{ counter }}</span><span class="label">{{ label }}</span></div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "CounterComponent",
  computed: {
    ...mapState(["counter"]),
    ...mapGetters(["label"])
  }
};
</script>
<style lang="scss" scoped>
.counter,
.label {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
}
.label {
  padding-left: 1.5rem;
}
</style>
