import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/getters";
import { AppActions } from "@/store/actions";
import { AppMutations } from "@/store/mutations/app.mutations";
import { SocketMutations } from "@/store/mutations/socket.mutations";
import { NotificationMutations } from "@/store/mutations/notification.mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ready: false,
    counter: 0,
    counterInitial: 0,
    labelSingular: null,
    labelPlural: null,
    position: null,
    alignment: null,
    errors: [],
    showOnZero: true,
    notifications: [],
    notificationData: null
  },
  mutations: {
    ...AppMutations,
    ...SocketMutations,
    ...NotificationMutations
  },
  getters,
  actions: AppActions
});
