import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const APP_INIT = "APP_INIT";
export const APP_SETUP = "APP_SETUP";
export const APP_READY = "APP_READY";
export const APP_ERROR = "APP_ERROR";

export const NOTIFICATION_DISMISS = "NOTIFICATION_DISMISS";

export const SOCKET_INCREMENT = "SOCKET_INCREMENT";
export const SOCKET_DECREASE = "SOCKET_DECREASE";
export const SOCKET_RESET = "SOCKET_RESET";
export const SOCKET_COUNTER_LABEL = "SOCKET_COUNTER_LABEL";
export const SOCKET_COUNTER_POSITION = "SOCKET_COUNTER_POSITION";
export const SOCKET_COUNTER_ALIGNMENT = "SOCKET_COUNTER_ALIGNMENT";

const CounterPosition = {
  top: "top",
  bottom: "bottom"
};
Object.freeze(CounterPosition);
export { CounterPosition };

const CounterAlignment = {
  left: "left",
  right: "right",
  center: "center"
};
Object.freeze(CounterAlignment);
export { CounterAlignment };

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
    notifications: [],
    notificationData: null
  },
  mutations: {
    [APP_SETUP]: (state, config) => {
      state.counter = config.counterInitial || 0;
      state.labelSingular = config.labelSingular || "death";
      state.labelPlural = config.labelPlural || "deaths";

      state.position = CounterPosition.bottom;
      if (
        config.position &&
        config.position.toLowerCase() === CounterPosition.top
      ) {
        state.position = CounterPosition.top;
      }

      state.alignment = CounterAlignment.center;
      if (config.alignment) {
        if (config.alignment === CounterAlignment.left) {
          state.alignment = CounterAlignment.left;
        } else if (config.alignment === CounterAlignment.right) {
          state.alignment = CounterAlignment.right;
        }
      }
      if (config.notifications) {
        state.notifications = [...config.notifications];
      }
    },
    [APP_READY]: state => {
      state.ready = true;
    },
    [APP_ERROR]: (state, error) => {
      state.errors = [...state.errors, error];
    },
    [NOTIFICATION_DISMISS]: state => {
      state.notificationData = null;
    },
    [SOCKET_INCREMENT]: state => {
      state.counter += 1;
      // CHECK MILESTONE
      if (state.notifications.length > 0) {
        state.notificationData = state.notifications.find(
          i => i.target === state.counter
        );
      }
    },
    [SOCKET_DECREASE]: state => {
      state.counter = Math.max(0, state.counter - 1);
    },
    [SOCKET_RESET]: state => {
      state.counter = state.counterInitial;
      state.notificationData = null;
    },
    [SOCKET_RESET]: state => {
      state.counter = state.counterInitial;
    },
    [SOCKET_COUNTER_POSITION]: (state, data) => {
      state.position = CounterPosition.bottom;
      if (data[0] === CounterPosition.top) {
        state.position = CounterPosition.top;
      }
    },
    [SOCKET_COUNTER_ALIGNMENT]: (state, data) => {
      state.alignment = CounterAlignment.center;
      if (data[0] === CounterAlignment.left) {
        state.alignment = CounterAlignment.left;
      } else if (data[0] === CounterAlignment.right) {
        state.alignment = CounterAlignment.right;
      }
    },
    [SOCKET_COUNTER_LABEL]: (state, data) => {
      state.labelSingular = data[0].labelSingular;
      state.labelPlural = data[0].labelPlural;
    }
  },
  getters: {
    label: state => {
      if (state.counter === 1) {
        return state.labelSingular;
      }
      return state.labelPlural;
    }
  },
  actions: {
    [APP_INIT]({ commit }) {
      axios
        .get("/static/config.json")
        .then(response => {
          commit(APP_SETUP, response.data);
          commit(APP_READY);
        })
        .catch(error => commit(APP_ERROR, error));
    },
    [SOCKET_RESET]({ commit }) {
      commit();
    }
  }
});
