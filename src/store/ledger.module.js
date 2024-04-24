import { toast } from 'vue-sonner'
import api from '@/apis/CommonAPI'

export default {
  state: {
    itemcheckData: [],
  },
  mutations: {

  },
  getters: {
    GETTER_LEDGER_DATA: (state) => {
      return state.itemcheckData
    },
  },
  actions: {
    async ACT_ITEMCHECKS({ commit }, filter = '') {
      try {
        const itemchecks = await api.get('/v1/ledgers/', filter)
        console.log(itemchecks);
        commit('setItemcheck', itemchecks.data.data)
      } catch (error) {
        toast.error('Error to execution')
      }
    },
  },
}
