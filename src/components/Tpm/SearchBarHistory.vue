<template>
  <!-- Start:Search -->
  <CCard class="mb-1">
    <CCardHeader>Search</CCardHeader>
    <CCardBody>
      <CRow>
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
        <CCol lg="6" v-if="GETTER_ITEMCHECK.length > 0">
          <v-select
            append-to-body
            style="z-index: 1"
            :options="GETTER_ITEMCHECK"
            label="itemcheck_nm"
            placeholder="Itemcheck"
            :reduce="(itemcheck) => itemcheck.uuid"
            v-model="form.itemcheck_id"
          >
            <template #option="option">
              {{ option.itemcheck_nm }}
            </template>
            <template #selected-option="option">
              {{ option.itemcheck_nm }}
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
import { mapGetters } from 'vuex'

export default {
  name: 'SearchBarHistory',
  data() {
    return {
      form: {
        itemcheck_id: null,
      },
      status: [],
    }
  },
  computed: {
    ...mapGetters(['getSubmitStatus', 'GETTER_ITEMCHECK']),
  },
  methods: {
    search() {
      let mapForm = Object.keys(this.form)
        .map((key) => `${key}=${this.form[key]}`)
        .join('&')
      this.$emit('getHistory', '?' + mapForm)
    },
    getItemchecks() {
      try {
        this.$store.dispatch('ACT_ITEMCHECKS')
      } catch (error) {
        alert(error)
      }
    },
  },
  mounted() {
    this.search()
    this.getItemchecks()
  },
}
</script>
