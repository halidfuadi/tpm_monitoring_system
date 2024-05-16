<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          NEW ITEM
        </CCardHeader>
        <CCardBody class="tableFixHead">
          <template v-if="dataUpdate > 0">
          <CRow>
              <CCol class="mb-3" lg="6" v-for="(item, i) in dataUpdate" :key="i">
                <CCard>
                  <CCardHeader>
                    <CCardTitle> {{ item.machine_nm }}</CCardTitle>
                  </CCardHeader>
                  <CCardBody>
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
                  </CCardBody>
                  <CCardFooter>
                    <CButton class="btn btn-sm col me-3" color="success" @click="approve(item)">
                      APPROVE
                    </CButton>
                    <CButton class="btn btn-sm col" color="danger" style="max-width: 100px">
                      DENY
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
            </template>
          <template v-else>
            <CCard>
              <CCardBody>
                NO DATA
              </CCardBody>
            </CCard>
          </template>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol>
      <CCard>
        <CCardHeader>
          CHANGED ITEM
        </CCardHeader>
        <CCardBody class="tableFixHead">
          <!-- <CRow> -->
            <template v-if="dataUpdatedItem.length > 0">
              <CCol class="mb-3" lg="12" v-for="(update, i) in dataUpdatedItem" :key="i">
                <CCard>
                  <CCardHeader>
                    <CCardTitle>{{ update.machine_nm }}</CCardTitle>
                  </CCardHeader>

                  <CCardBody>
                    <CCardSubtitle class="mb-2 text-body-secondary">
                      {{ update.itemcheck_nm_old }}
                    </CCardSubtitle>
                    <CAccordion>
                      <CAccordionItem>
                        <CAccordionHeader>
                          DETAIL
                        </CAccordionHeader>
                        <CAccordionBody>
                          <CTable>
                            <CTableHead>
                              <CTableRow>
                                <CTableHeaderCell scope="col">COLUMN</CTableHeaderCell>
                                <CTableHeaderCell scope="col">OLD</CTableHeaderCell>
                                <CTableHeaderCell scope="col">NEW</CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              <CTableRow>
                                <CTableDataCell>ITEM NAME</CTableDataCell>
                                <CTableDataCell>{{ update.itemcheck_nm_old }}</CTableDataCell>
                                <CTableDataCell>{{ update.itemcheck_nm_new }}</CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableDataCell>METHOD</CTableDataCell>
                                <CTableDataCell>{{ update.method_check_old }}</CTableDataCell>
                                <CTableDataCell>{{ update.method_check_new }}</CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableDataCell>DURATION</CTableDataCell>
                                <CTableDataCell>{{ update.duration_old }}</CTableDataCell>
                                <CTableDataCell>{{ update.duration_new }}</CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableDataCell>MP</CTableDataCell>
                                <CTableDataCell>{{ update.mp_old }}</CTableDataCell>
                                <CTableDataCell>{{ update.mp_new }}</CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableDataCell>PERIOD</CTableDataCell>
                                <CTableDataCell>{{ update.val_periodic_old }} {{ update.period_id_old }}</CTableDataCell>
                                <CTableDataCell>{{ update.val_periodic_new }} {{ update.period_id_new }}</CTableDataCell>
                              </CTableRow>
                              <CTableRow>
                                <CTableDataCell>STANDARD</CTableDataCell>
                                <CTableDataCell>{{ update.standard_measurement_old }}</CTableDataCell>
                                <CTableDataCell>{{ update.standard_measurement_new }}</CTableDataCell>
                              </CTableRow>
                            </CTableBody>
                          </CTable>
                        </CAccordionBody>
                      </CAccordionItem>
                    </CAccordion>
                  </CCardBody>

                  <CCardFooter>
                    <CButton class="btn btn-sm col me-3" color="success" @click="approveEdit(update)">
                      APPROVE
                    </CButton>
                    <CButton class="btn btn-sm col" color="danger" style="max-width: 100px">
                      DENY
                    </CButton>
                  </CCardFooter>
                </CCard>
              </CCol>
            </template>
            <template v-else>
              <CCard>
                <CCardBody>
                  NO DATA
                </CCardBody>
              </CCard>
            </template>
          <!-- </CRow> -->
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import api from '@/apis/CommonAPI'
import { CAccordion, CAccordionBody, CAccordionItem, CCard, CCardFooter, CCardHeader, CCol } from '@coreui/vue';
import { logo } from '../../assets/brand/logo';
export default {
  name: 'newUpdate',
  data() {
    return {
    }
  },
  methods:{
    async approve(data){
      this.$store.dispatch('ACT_APPROVE_ITEMCHECK', data)
    },

    async approveEdit(data){
      this.$store.dispatch('ACT_APPROVE_UPDATED_ITEMCHECK', data)
    }
  },
  props: {
    dataUpdate: [],
    dataUpdatedItem: []
  }
}
</script>

<style scoped>
.tableFixHead {
  overflow-y: auto;
  height: 350px;
  z-index: 1;
}

</style>
