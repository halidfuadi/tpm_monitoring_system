<template>
  <CCard class="mb-3">
    <CCardHeader>
      Search
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol lg="6">
          <v-select append-to-body style="z-index: 1;" :options="line" placeholder="Lines"
            :reduce="line => line.line_id" v-model="form.line_id">
            <template #option="option">
              <span>{{ option.line_nm }}</span>
            </template>
            <template #selected-option="option">
              <span>{{ option.line_nm }}</span>
            </template>
          </v-select>
        </CCol>

        <CCol lg="6">
          <v-select append-to-body style="z-index: 1;" :options="machine" placeholder="Machines"
            :reduce="machine => machine.machine_id" v-model="form.machine_id">
            <template #option="option">
              <span>{{ option.machine_nm }}</span>
            </template>
            <template #selected-option="option">
              <span>{{ option.machine_nm }}</span>
            </template>
          </v-select>
        </CCol>

      </CRow>
      <CRow>
        <CCol lg="12">
          <CButton class="w-100" color="outline-dark" @click="search">
            Search
          </CButton>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
  <!-- End:Search -->
</template>

<script>
import moment from 'moment'
import api from '@/apis/CommonAPI'

export default {
  name: 'SearchBarLedger',
  data() {
    return {
      form: {
        line_id: null,
        machine_id: null,
      },
      machine: [],
      line: [],
    }
  },
  methods: {
    search() {
      let mapForm = Object.keys(this.form).map((key) => `${key}=${this.form[key]}`).join('&')
      console.log(mapForm);
      this.$emit('getLedgers', mapForm)
    },
    async getMachine() {
      try {
        let machine = await api.post(`/tpm/filter/machine`)
        this.machine = machine.data.data
      } catch (error) {
        console.log(error);
      }
    },
    async getLine() {
      try {
        let line = await api.post(`/tpm/filter/line`)
        this.line = line.data.data
      } catch (error) {
        console.log(error);
      }
    }

  },
  mounted() {
    this.getMachine()
    this.getLine()
  },
}
</script>
