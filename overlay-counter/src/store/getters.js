export default {
  label: state => {
    if (state.counter === 1) {
      return state.labelSingular;
    }
    return state.labelPlural;
  }
};
