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
    },
}
