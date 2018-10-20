export default {
  label: state => {
    if (state.counter === 1) {
      return state.labelSingular;
    }
    return state.labelPlural;
  },
  findNotification: state => target =>
    state.notifications.find(i => i.target === target)
};
