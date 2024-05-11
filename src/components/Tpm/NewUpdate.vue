<template>
  <CCard class="mb-3">
    <CCardHeader>
      Changes in Ledger
    </CCardHeader>
    <CCardBody>
      <CRow class="justify-content-center">
        <CCol v-for="(item, i) in dataUpdate" :key="i">
          <CCard style="width: 18rem">
            <CCardBody>
              <CCardTitle>{{ item.line_nm }} | {{ item.machine_nm }}</CCardTitle>
              <CCardSubtitle class="mb-2 text-body-secondary">
                <CRow>
                  <CCol lg="6">
                    {{ item.itemcheck_nm }}
                  </CCol>
                  <CCol lg="6" class="text-end">
                    {{ item.val_periodic }} {{ item.period_nm }}
                  </CCol>
                </CRow>
              </CCardSubtitle>
              <CCardText>{{ item.reasons }}</CCardText>
              <CButton class="btn btn-sm col me-3" color="success" @click="">
                APPROVE
              </CButton>
              <CButton class="btn btn-sm col" color="danger" style="max-width: 100px">
                DENY
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
import api from '@/apis/CommonAPI'
import { CCol } from '@coreui/vue';
export default {
  name: 'newUpdate',
  data() {
    return {
      dataUpdate: null
    }
  },
  props: {
    dataUpdate: []
  }
}
</script>
