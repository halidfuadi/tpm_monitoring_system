<template>
  <CCard class="mb-2" style="z-index: 1;">
    <CCardHeader>
      Search
    </CCardHeader>
    <CCardBody>
      <CRow class="mb-3">
        <CCol lg="6">
          <treeselect v-model="form.line_id" :multiple="true" :options="line" placeholder="Select Line"/>
        </CCol>

        <CCol lg="6">
          <treeselect v-model="form.machine_id" :multiple="true" :options="machine" placeholder="Select Machine"/>
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
import Treeselect from 'vue3-treeselect'
import 'vue3-treeselect/dist/vue3-treeselect.css'

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
  components: { Treeselect },
  methods: {
    search() {
      let mapForm = Object.keys(this.form).map((key) => `${key}=${this.form[key]}`).join('&')
      console.log(mapForm);
      this.$emit('getLedgers', mapForm)
    },
    async getMachine(filter = {}) {
      try {
        let machine = await api.post(`/tpm/filter/machine`, filter)
        console.log(filter);
        let mapMachines = await machine.data.data.map(item => {
          return {
            id: item.machine_id,
            label: item.machine_nm
          }
        })
        this.machine = mapMachines
      } catch (error) {
        console.log(error);
      }
    },
    async getLine(filter = {}) {
      try {
        let line = await api.post(`/tpm/filter/line`, filter)
        console.log(filter);
        let maplines = await line.data.data.map(item => {
          return {
            id: item.line_id,
            label: item.line_nm
          }
        })
        this.line = maplines
      } catch (error) {
        console.log(error);
      }
    }

  },
  watch: {
    'form.line_id': function(newVal) {
      if (newVal && newVal.length > 0) {
        this.getMachine({ line_id: newVal });
      } else {
        this.getMachine();
      }
    }
  },
  mounted() {
    this.getMachine()
    this.getLine()
  },
}
</script>
