<template>
  <Toaster position="top-center" closeButton />
  <ModalItemcheck :isShow="isShow" :ledger_id="ledger_id" :machine_nm="machine_nm"
    @showChanges = "showChanges(state)"/>
  <SearchBar @getSchedules="getLedgers" />
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="overflow-auto" lg="12">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="no text-center">No</th>
                <th class="line text-center">Line</th>
                <th class="mc text-center">Machine</th>
                <th class="item-check text-center">Item Check No</th>
                <th class="actions text-center">Actions</th>
              </tr>
              <tr>
              </tr>
            </thead>

            <tbody v-if="ledgers.length > 0">
              <tr v-for="(ledger, i) in ledgers" :key="i">
                <td class="text-center" >{{ i + 1 }}</td>
                <td class="line text-center">{{ ledger?.line_nm }}</td>
                <td class="mc text-center">{{ ledger?.machine_nm }}</td>
                <td class="item-check text-center">{{ ledger?.num_item_checks }}</td>
                <td class="actions row">
                  <CButton class="btn btn-sm col" color="success" v-bind="props" @click="showDetail(ledger)" style="max-width: 100px">
                    ITEMCHECKS
                  </CButton>
                  <CButton class="btn btn-sm col" color="danger" style="max-width: 100px">
                    DELETE
                  </CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter>
      <CRow class="justify-content-between">
        <CCol lg="2">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Limit</span>
            </div>
            <select class="form-control" v-model="filtered.rowsPerPage">
              <option v-for="limit in limitOpts" :key="limit.label" :value="limit.value">
                {{ limit.label }}
              </option>
            </select>
          </div>
        </CCol>
        <CCol lg="3">
          <ul class="pagination m-0">
            <li class="page-item disabled">
              <button class="page-link">Previous</button>
            </li>
            <li v-for="page in pages" class="page-item">
              <button class="page-link">1</button>
            </li>
            <li class="page-item">
              <button class="page-link">Next</button>
            </li>
          </ul>
        </CCol>
      </CRow>
    </CCardFooter>
  </CCard>
</template>

<script>
import api from '@/apis/CommonAPI'
import { Toaster } from "vue-sonner";

import ModalItemcheck from '@/components/Tpm/ModalItemcheck'
import SearchBar from '@/components/Tpm/SearchBar'
import StatusTpm from '@/components/Tpm/StatusTpm'

export default {
  name: 'TpmLedger',
  data() {
    return {
      filtered: {
        currentPage: 1,
      },
      rowsPerPage: 5,
      maxVisible: 5,
      modelValue: 10,

      isShow: false,
      filter: null,
      schedule_id: null,
      
      ledgers: [],
      ledger_id: null,
      line_nm: null,
      machine_nm: null,
      num_item_checks: null,

      limitOpts: [{
        label: 5,
        value: 5
      }, {
        label: 10,
        value: 10
      }, {
        label: 100,
        value: 100
      }, {
        label: 'All',
        value: -1
      }],
    }
  },
  computed: {
    pages() {
      function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start)
      }

      const max = this.maxVisible
      const middle = Math.floor(this.maxVisible / 2)
      const pageNum = Math.ceil(this.rowsNumber / this.rowsPerPage)

      if (pageNum < max) {
        return range(1, pageNum)
      }

      let start = this.modelValue - middle;
      let end = this.modelValue + middle;

      // If we're close to the end
      if (this.modelValue >= pageNum - middle) {
        start = pageNum - max + 1;
        end = pageNum;
      }

      return range(Math.max(1, start), Math.max(end, max))
    },
  },
  methods: {
    onPageClick(page) {
      this.$emit('update:modelValue', page)
    },
    onPageBack() {
      if (this.modelValue - 1 >= 1) {
        this.onPageClick(this.modelValue - 1)
      }
    },
    onPageForward() {
      if (
        this.modelValue + 1 <=
        Math.ceil(this.rowsNumber / this.rowsPerPage)
      ) {
        this.onPageClick(this.modelValue + 1)
      }
    },
    async getLedgers(filter) {
      try {
        let ledgers = await api.get(`/v1/ledgers`)
        console.log(ledgers)
        this.ledgers = ledgers.data.data
      } catch (error) {
        console.log(error)
      }
    },
    showChanges(state){
      this.isShow = state
    },
    async showDetail(ledger) {
      console.log(ledger.ledger_id);
      this.machine_nm = ledger.machine_nm
      this.ledger_id = ledger.ledger_id
      setTimeout(() => {
        this.showChanges(true)
      }, 500)
    },
  },
  components: {
    SearchBar,
    StatusTpm,
    ModalItemcheck,
    Toaster,
  },
}
</script>

<style scoped>
.line {
  max-width: 50px;
}

.no {
  max-width: 20px;
}

.item-check {
  max-width: 20px;
}

.mc {
  max-width: 50px;
}
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  background: white;
}
</style>
