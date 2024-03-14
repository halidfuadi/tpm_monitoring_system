<template>
  <!-- Start:Search -->
  <CCard class="mb-1">
    <CCardHeader>
      Search
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol lg="3">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Month</span>
            </div>
            <input v-model="form.month" type="month" class="form-control" placeholder="Month">
          </div>
        </CCol>
        <CCol lg="5">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Plant</span>
            </div>
            <input type="text" class="form-control" placeholder="Plant">
          </div>
        </CCol>
        <CCol lg="4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Shop</span>
            </div>
            <input type="text" class="form-control" placeholder="Shop">
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="3">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Line</span>
            </div>
            <input type="text" class="form-control" placeholder="Line">
          </div>
        </CCol>
        <CCol lg="3">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Machine</span>
            </div>
            <input type="text" class="form-control" placeholder="Machine">
          </div>
        </CCol>
        <CCol lg="3">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Incharge</span>
            </div>
            <input type="text" class="form-control" placeholder="Incharge">
          </div>
        </CCol>
        <CCol lg="3">
          <v-select append-to-body style="z-index: 1;" :options="status" placeholder="Status" :reduce="status => status.status_id"  v-model="form.status_id">
          <template #option="option">
            <CBadge class="text-dark" :style="`background-color: ${option.color_tag}`" shape="pill">{{option.status_nm}}</CBadge>
          </template>
          <template #selected-option="option">
            <CBadge class="text-dark" :style="`background-color: ${option.color_tag}`" shape="pill">{{option.status_nm}}</CBadge>
          </template>
        </v-select>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="12">
          <CButton class="w-100" color="outline-dark" @click="search()">
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
import { mapGetters } from 'vuex'

export default {
  name: 'SearchBar',
  data() {
    return {
      form: {
        month: `${moment().format('YYYY-MM')}`,
        plant_id: null,
        line_id: null,
        machine_id: null,
        incharge_id: null,
        status_id: null,
      },
      status: [],
    }
  },
  watch: {
    getSubmitStatus: function () {
      if (this.getSubmitStatus) {
        this.search()
        this.getStatus()
      }
    },
  },
  computed: {
    ...mapGetters(['getSubmitStatus']),
  },
  methods: {
    search() {
      let mapForm = Object.keys(this.form)
        .map((key) => `${key}=${this.form[key]}`)
        .join('&')
      this.$emit('getSchedules', mapForm)
    },
    async getStatus() {
      try {
        let status = await api.post(`/v1/status/view`)
        this.status = status.data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getStatus()
    this.search()
  },
}
</script>
