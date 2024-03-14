import { createStore } from 'vuex'
import scheduleModule from './schedule.module'
import userModule from './user.module'
import findingModule from './findings.module'
import executionModule from './execution.module'
import itemcheckModule from './itemcheck.module'
import historyModule from './history.module'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    schedule: scheduleModule,
    user: userModule,
    execution: executionModule,
    findings: findingModule,
    itemchecks: itemcheckModule,
    history: historyModule,
  },
})
