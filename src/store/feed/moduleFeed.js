
import state from './moduleFeedState.js'
import mutations from './moduleFeedMutations.js'
import actions from './moduleFeedActions.js'
import getters from './moduleFeedGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}