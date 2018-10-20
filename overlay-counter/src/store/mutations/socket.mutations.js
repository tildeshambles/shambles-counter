import {
  CounterPosition,
  CounterAlignment
} from "@/store/mutations/app.mutations";

const SocketTypes = {
  Increment: "increment",
  Decrease: "decrease",
  Reset: "reset",
  CounterPosition: "counter_position",
  CounterAlignment: "counter_alignment",
  CounterLabel: "counter_label"
};
Object.freeze(SocketTypes);
export { SocketTypes };

export const SOCKET_INCREMENT = "SOCKET_INCREMENT";
export const SOCKET_DECREASE = "SOCKET_DECREASE";
export const SOCKET_RESET = "SOCKET_RESET";
export const SOCKET_COUNTER_LABEL = "SOCKET_COUNTER_LABEL";
export const SOCKET_COUNTER_POSITION = "SOCKET_COUNTER_POSITION";
export const SOCKET_COUNTER_ALIGNMENT = "SOCKET_COUNTER_ALIGNMENT";

export const SocketMutations = {
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
};
