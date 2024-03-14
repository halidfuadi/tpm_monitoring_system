import { toast } from 'vue-sonner'
import api from '@/apis/CommonAPI'

export default {
  state: {
    is_submit: null,
    scheduleData: null,
  },
  mutations: {
    setSubmit(state, payload) {
      state.is_submit = payload
    },
    setSchedule(state, payload) {
      state.scheduleData = payload
    },
  },
  getters: {
    getSubmitStatus: (state) => {
      return state.is_submit
    },
    GETTER_SCHEDULE_DATA: (state) => {
      return state.scheduleData
    },
  },
  actions: {
    async ADD_PIC_SCHEDULE({ commit }, payload) {
      try {
        console.log(payload)
        const newObj = {
          schedule_id: payload.schedule_id,
          user_ids: payload.user_ids,
        }
        let inserted = await api.post(`/v1/schedules/add/pic`, newObj)
        commit('setSubmit', inserted)
        toast.success('Success to add pic')
      } catch (error) {
        toast.error('Error to add pic')
      }
    },
    async ACT_GET_SCHEDULE({ commit }, payload) {
      try {
        let filter = Object.keys(payload)
          .map((key) => {
            if (key !== 'is_detail') return `${key}=${payload[key]}`
          })
          .join('&')
        let rawData = await api.get(`/v1/schedules`, '?' + filter)
        const schedules = rawData.data.data
        if (Object.keys(payload).indexOf('is_detail') !== -1) {
          const detailSchedule = schedules[payload['is_detail']][0]
          commit('setSchedule', detailSchedule)
        } else {
          commit('setSchedule', schedules)
        }
      } catch (error) {
        toast.error('Error to get detail schedule')
      }
    },
  },
}
