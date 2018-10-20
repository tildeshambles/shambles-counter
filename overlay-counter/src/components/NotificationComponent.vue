<template>
    <transition name="fade">
    <div class="notify">
        <div class="notify-body">
            <img v-if="notificationData.image" :src="notificationData.image">
            <h1>{{ notificationData.message }}</h1>
        </div>
    </div>
    </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { NOTIFICATION_DISMISS } from "@/store";

export default {
  name: "NotificationComponent",
  data() {
    return {
      audio: null
    };
  },
  computed: {
    ...mapState(["notificationData"])
  },
  methods: {
    ...mapMutations({
      dismiss: NOTIFICATION_DISMISS
    })
  },
  created() {
    if (this.notificationData.sound) {
      this.audio = new Audio(this.notificationData.sound);
    }
  },
  mounted() {
    this.audio.play();
    setTimeout(() => {
      this.dismiss();
    }, 5000);
  }
};
</script>
<style lang="scss" scoped>
.notify {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;

  img {
    max-width: 100%;
    border-radius: 0.75rem;
    margin-bottom: 1.5rem;
  }
  background: rgba(0, 0, 0, 0.4);
  color: white;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
}
</style>
