export default {
  SET_DOING_ITEMS(state, value) {
    state.doingItems = value;
  },
  ADD_DOING_ITEMS(state, value) {
    state.doingItems.push(value);
  },
  REMOVE_DOING_ITEMS(state, value) {
    state.doingItems.pop(value);
  },
  ADD_DISTRIBUTED_ITEMS(state, value) {
    state.distributedItems = value;
  },
};
