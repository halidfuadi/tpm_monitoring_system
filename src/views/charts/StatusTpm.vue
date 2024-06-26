<template>
  <!-- Start:Status -->
  <CCard class="mb-1">
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Status
          </CCardHeader>
          <CCardBody v-if="!isLoading">
            <CRow>
              <CCol v-for="stat in status" :key="stat.status_nm">
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <CInputGroup class="input-group-text text-dark" :style="`background-color: ${stat.color_tag}; font-weight: bold;`" shape="pill">
                      {{ stat.status_nm }}
                    </CInputGroup>
                  </div>
                  <input disabled type="text" class="form-control" style="font-weight: bold;" :value="stat.count">
                </div>
                <CProgress animated color="info" style="font-size: 14px; font-weight: bold;" height="30" :value="stat.percent">
                  {{ stat.percent }}%
                </CProgress>
              </CCol>
              <CCol>
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <CInputGroup class="input-group-text text-dark bg-secondary" style="font-weight: bold;" shape="pill">
                      Total
                    </CInputGroup>
                  </div>
                  <input disabled type="text" class="form-control" style="font-weight: bold;" :value="total">
                </div>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardBody v-else>
              <CSpinner as="span" size="lg" aria-hidden="true"/>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CCard>
  <!-- End:Status -->
</template>

<script>
import { CSpinner } from '@coreui/vue'
import api from '@/apis/CommonAPI'
import { CInputGroup } from '@coreui/vue'
export default {
  name: 'StatusTpm',
  data() {
    return {
      status: null,
      total: 0,
      isLoading: true
    }
  },
  watch: {
    filter: function () {
      if (this.filter) this.getStatus(this.filter)
    },
  },
  methods: {
    async getStatus(filter) {
      try {
        let status = await api.get(`/tpm/statusTpm`, '?' + filter)
        this.status = status.data.data
        let sum = 0
        for(let i=0;i<this.status.length;i++){
          sum += this.status[i].count
          console.log(sum);
        }
        this.total = sum
        for(let i=0;i<this.status.length;i++){
          this.status[i].percent = Math.ceil((this.status[i].count / sum) * 100)
        }
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    },
  },
  props: {
    filter: String,
  },
}
</script>
