<template>
  <CModal :visible="is_show" backdrop="static" @close="changesShow()">
    <CModalHeader closeButton>Assign PIC</CModalHeader>
    <CModalBody>
      <CRow>
        <CCol lg="6">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Machine</span>
            </div>
            <input
              disabled
              type="text"
              class="form-control"
              placeholder="Machine"
              :value="machine_nm"
            />
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="12">
          <v-select
            :options="users"
            label="user_nm"
            multiple
            v-model="userSelected"
          >
            <template #option="option">
              <span>{{ option.noreg }}-{{ option.user_nm }}</span>
            </template>
            <template #selected-option="option">
              <span>{{ option.noreg }}-{{ option.user_nm }}</span>
            </template>
          </v-select>
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="primary"
        @click="assignPic()"
        :disabled="userSelected.length == 0"
        >Assign</CButton
      >{{ ' ' }}
      <CButton @click="changesShow()">Cancel</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import api from '@/apis/CommonAPI'
import { mapGetters } from 'vuex'

export default {
  name: 'ModalPic',
  data() {
    return {
      users: [],
      is_show: false,
      userSelected: [],
    }
  },
  watch: {
    incharge_id: function () {
      if (this.incharge_id) this.getUsers(this.incharge_id)
    },
    isShow: function () {
      this.is_show = this.isShow
    },
    getSubmitStatus: {
      handler() {
        console.log(this.getSubmitStatus)
        this.is_show = false
        this.changesShow()
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['getSubmitStatus']),
  },
  methods: {
    async getUsers(incharge_id = null) {
      try {
        let { data } = await api.get(
          `/v1/users`,
          `?incharge_id=${incharge_id}`,
        )
        console.log(data)
        this.users = data.data
      } catch (error) {
        console.log(error)
      }
    },
    changesShow() {
      this.userSelected = []
      if (this.is_show) {
        this.is_show = false
      } else {
        this.is_show = true
      }
      this.$emit('showChanges', this.is_show)
    },
    async assignPic() {
      try {
        let mapIdUsers = this.userSelected.map((user) => {
          return user.user_id
        })
        const newObj = {
          schedule_id: this.schedule_id,
          user_ids: mapIdUsers,
        }
        console.log(newObj)
        this.$store.dispatch('ADD_PIC_SCHEDULE', newObj)
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getUsers()
  },
  props: {
    incharge_id: String,
    isShow: Boolean,
    schedule_id: String,
    machine_nm: String,
  },
}
</script>
