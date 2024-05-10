import { toast } from 'vue-sonner'
import api from '@/apis/CommonAPI'

export default {
    state: {
        itemcheckData: [],
    },
    mutations: {
        setItemcheck(state, payload) {
            state.itemcheckData = payload
        },
    },
    getters: {
        GETTER_ITEMCHECK: (state) => {
            return state.itemcheckData
        },
    },
    actions: {
        async ACT_ITEMCHECKS({ commit }, filter = '') {
            try {
                const itemchecks = await api.get('/tpm/itemchecks', filter)
                commit('setItemcheck', itemchecks.data.data)
            } catch (error) {
                toast.error('Error to execution')
            }
        },

        async ACT_NEW_ITEMCHECK({ commit }, payload){
          console.log(payload);
          try {
            let resData = await api.post(`/tpm/itemchecks/addItemCheck`, payload)
            commit('setItemcheck', resData)
          } catch (error) {
            toast.error('Error to add itemcheck')
          }
        },

        async ACT_EDIT_ITEMCHECK({ commit }, payload){
          try {
            console.log(payload);
            let editData = await api.put(`/tpm/itemchecks/editItemCheck`, payload)
            commit('setItemcheck', editData)
          } catch (error) {
            toast.error('Error to edit itemcheck')
          }
        }
    },
}
