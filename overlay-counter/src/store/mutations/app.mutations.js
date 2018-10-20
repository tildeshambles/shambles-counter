export const APP_SETUP = "APP_SETUP";
export const APP_READY = "APP_READY";
export const APP_ERROR = "APP_ERROR";

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

export const AppMutations = {
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

    if (config.showOnZero !== undefined) {
      state.showOnZero = config.showOnZero;
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
  }
};
