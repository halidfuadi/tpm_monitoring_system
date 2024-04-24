<template>
  <!-- Start:Status -->
  <CCard class="mb-1">
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Status
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol v-for="stat in status" :key="stat.status_nm">
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <CBadge class="text-dark" :style="`background-color: ${stat.color_tag}`" shape="pill">
                        {{ stat.status_nm }}</CBadge>
                    </span>
                  </div>
                  <input disabled type="text" class="form-control" :value="stat.count">
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CCard>
  <!-- End:Status -->
</template>

<script>
import api from '@/apis/CommonAPI'
export default {
  name: 'StatusTpm',
  data() {
    return {
      status: null,
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
        let status = await api.get(`/tpm/status`, '?' + filter)
        this.status = status.data.data
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
