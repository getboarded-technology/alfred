import state from './moduleLibraryState'
import mutations from './moduleLibraryMutations'
import actions from './moduleLibraryActions'
import getters from './moduleLibraryGetters'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
