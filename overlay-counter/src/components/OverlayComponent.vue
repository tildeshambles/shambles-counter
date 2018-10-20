<template>
    <div class="overlay">
        <div class="overlay-top" v-bind:class="containerClasses"><CounterComponent v-if="position === CounterPosition.top"/></div>
        <div class="overlay-middle">
            <NotificationComponent v-if="notificationData"/>
        </div>
        <div class="overlay-bottom" v-bind:class="containerClasses"><CounterComponent v-if="position === CounterPosition.bottom"/></div>
    </div>
</template>

<script>
import CounterComponent from "@/components/CounterComponent.vue";
import NotificationComponent from "@/components/NotificationComponent.vue";
import { mapState } from "vuex";

import { CounterPosition, CounterAlignment } from "@/store";

export default {
  name: "OverlayComponent",
  data() {
    return {
      timer: null,
      CounterPosition
    };
  },
  computed: {
    ...mapState(["position", "alignment", "notificationData"]),
    containerClasses() {
      return {
        "align-left": this.alignment === CounterAlignment.left,
        "align-center": this.alignment === CounterAlignment.center,
        "align-right": this.alignment === CounterAlignment.right
      };
    }
  },
  components: {
    CounterComponent,
    NotificationComponent
  }
};
</script>

<style lang="scss" scoped>
.overlay {
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;

  padding: 1.5rem;
}
.overlay-top,
.overlay-bottom {
  flex: 0 0 auto;
}
.overlay-middle {
  flex: 1 1 100%;
}

.overlay-top,
.overlay-bottom,
.overlay-middle {
  display: flex;
  flex-direction: row;
}

.overlay-middle {
  justify-content: center;
  align-items: center;
}

.align-left {
  justify-content: flex-start;
}
.align-center {
  justify-content: center;
}
.align-right {
  justify-content: flex-end;
}
</style>
