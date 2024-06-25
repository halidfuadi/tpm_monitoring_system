<template>
  <!-- <CCard class="mb-3">
    <CCardHeader>
      <CCardTitle>ITEMCHECKS</CCardTitle>
    </CCardHeader>
    <CCardBody> -->
      <CCard class="mb-3">
        <CCardHeader>
          <CCardTitle>Monthly</CCardTitle>
        </CCardHeader>
        <CCardBody>
            <CRow class="mb-3">
              <CCol lg="8">
                <div class="card">
                  <div class="card-header">
                    Line Progress
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-4">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Month</span>
                          </div>
                          <input v-model="filterStatus.month" type="month" class="form-control" placeholder="Month">
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-body card">
                    <GraphStatusTPM :filter="filterStatus" />
                  </div>
                </div>
              </CCol>

              <CCol lg="4">
                <div class="card">
                  <div class="card-header">
                    Item
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-6">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Month</span>
                          </div>
                          <input v-model="filterStatus2.month" type="month" class="form-control" placeholder="Month">
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card-body card">
                    <GraphItem :filter="filterStatus2" />
                  </div>
                </div>
              </CCol>
            </CRow>

          </CCardBody>
      </CCard>
      <CCard class="mb-3">
          <CCardHeader>
            <CCardTitle>Yearly</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <div class="row">
              <div class="col-6">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Year</span>
                  </div>
                  <input v-model="filterStatus3.yearonly" type="year" class="form-control" placeholder="Year">
                  <!-- <CDatePicker v-model="filterStatus3.year" date="filterStatus3.year" label="Year Pick" selectionType="year" /> -->
                </div>
              </div>
            </div>
          </CCardBody>

          <CRow class="p-3">
            <!-- <CCol lg="12"> -->
              <GraphItemYearly :filter="filterStatus3" />
            <!-- </CCol> -->
          </CRow>
        </CCard>

    <!-- </CCardBody>
  </CCard> -->

  <CCard class="mb-3">
    <CCardHeader>
      <CCardTitle>ITEM TREND</CCardTitle>
    </CCardHeader>
    <CCardBody>
      <CRow class="mb-3">
        <CCol>
          <GraphTrendTPM />
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>

  <!-- <CCard class="mb-3">
    <CCardHeader>
      <CCardTitle>NOTIFICATIONS</CCardTitle>
    </CCardHeader>
    <CCardBody>
      <CRow class="mb-3">
        <CCol lg="8">
          <NewUpdate/>
        </CCol>
      </CRow>
    </CCardBody>

  </CCard> -->

  <!-- <CCard class="mb-3">
    <CCardHeader>
      Search
    </CCardHeader>
    <CCardBody class="card-body">
      <div class="row">
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Month</span>
            </div>
            <input v-model="filter.month" type="month" class="form-control" placeholder="Month">
          </div>
        </div>
        <div class="col-4">
          <select class="form-select" v-model="filter.line_id">
            <option v-for="(line, index) in getLinesOpts" :key="index" :value="line.id">
              {{ line.text }}
            </option>
          </select>
        </div>
        <div class="col-4">
          <select class="form-select" v-model="filter.machine_id">
            <option v-for="(machine, index) in getMachinesOpts" :key="index" :value="machine.id">
              {{ machine.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="card-body card">
        <GraphStandardTime :filter="filter" />
      </div>
    </CCardBody>
  </CCard> -->



</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { toast } from 'vue-sonner'
import { GET_LINES } from '../../store/lines.module'

import GraphStandardTime from '../../views/charts/GraphStandardTime.vue'
import StatusTpm from '../../views/charts/StatusTpm.vue'
import GraphStatusTPM from '../../views/charts/GraphStatusTPM.vue'
import GraphItem from '../../views/charts/GraphItem.vue'
import GraphItemYearly from '../../views/charts/GraphItemYearly.vue'
import GraphTrendTPM from '../../views/charts/GraphTrendTPM.vue'

// import NewUpdate from '../../components/Tpm/NewUpdate.vue'
import { CCardBody, CCardHeader, CCardSubtitle, CCardTitle } from '@coreui/vue'

export default {
  name: "TPMDashboard",
  data() {
    return {
      selectedMonth: moment().format('YYYY-MM'),
      filter: {
        month: `${moment().format('YYYY-MM')}`,
        line_id: -1,
        machine_id: -1,
      },

      selectedMonthStatus: moment().format('YYYY-MM'),
      filterStatus: {
        month: `${moment().format('YYYY-MM')}`
      },
      filterStatus2: {
        month: `${moment().format('YYYY-MM')}`
      },
      filterStatus3: {
        yearonly: `${moment().format('YYYY')}`
      }
    }
  },
  components: {
    GraphStandardTime,
    StatusTpm,
    GraphStatusTPM,
    GraphItem,
    // NewUpdate,
    GraphTrendTPM,
    GraphItemYearly,
  },
  computed: {
    ...mapGetters(['getLinesOpts', 'getMachinesOpts']),
  },
  watch: {
    ['filter.line_id']() {
      if (this.filter.line_id != -1) {
        this.ActionGetMachines()
      } else {
        this.filter.machine_id = -1
      }
    },
    selectedMonth() {
    },
    selectedMonthStatus(){

    },
  },
  methods: {
    async ActionGetLines() {
      try {
        await this.$store.dispatch(GET_LINES, this.filter)
      } catch (error) {
        console.log(error);
        toast.error(error)
      }
    },
    async ActionGetMachines() {
      try {
        await this.$store.dispatch(GET_MACHINES, { line_id: this.filter.line_id })
      } catch (error) {
        console.log(error);
        toast.error(error)
      }
    },
  },
  async mounted() {
    await this.ActionGetMachines()
    await this.ActionGetLines()
  }
}
</script>
<style></style>
