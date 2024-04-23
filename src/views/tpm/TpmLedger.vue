<template>
  <Toaster position="top-center" closeButton />
  <ModalPic
    :isShow="isShow"
    :incharge_id="incharge_id"
    :machine_nm="machine_nm"
    :schedule_id="schedule_id"
    @showChanges="showChanges(state)"
  />
  <SearchBar @getLedgers="getLedgers" />
  <StatusTpm :filter="filter" />
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="overflow-auto" lg="12">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th rowspan="2">No</th>
                <th class="w100-line" rowspan="2">Line</th>
                <th class="w200-mc" rowspan="2">Machine</th>
                <th class="w200-item-check" rowspan="2">Item Check</th>
                <th class="w200-per" rowspan="2">Periodic</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="Object.keys(ledgers).length > 0">
                <tr v-for="(ledgers, key, ipar) in ledgers" :key="key">
                  <td>{{ ipar + 1 }}</td>
                  <td>{{ ledger[0].line_nm }}</td>
                  <td>{{ ledger[0].machine_nm }}</td>
                  <td>{{ ledger[0].itemcheck_nm }}</td>
                  <td>
                    {{ ledger[0].val_periodic }} {{ ledger[0].period_nm }}
                  </td>
                </tr>
              </template>
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
              <option
                v-for="limit in limitOpts"
                :key="limit.label"
                :value="limit.value"
              >
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
import { Toaster } from 'vue-sonner'

import ModalPic from '@/components/Tpm/ModalPic'
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
      ledger_id: null,
      ledgers: [],
      incharge_id: null,
      machine_nm: null,
      year: null,
      month: null,
      limitOpts: [
        {
          label: 5,
          value: 5,
        },
        {
          label: 10,
          value: 10,
        },
        {
          label: 100,
          value: 100,
        },
        {
          label: 'All',
          value: -1,
        },
      ],
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

      let start = this.modelValue - middle
      let end = this.modelValue + middle

      // If we're close to the end
      if (this.modelValue >= pageNum - middle) {
        start = pageNum - max + 1
        end = pageNum
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
        // let month = filter.split('=')[1].split('-')[1]
        // let year = filter.split('=')[1].split('-')[0]
        // this.generateDate(month, year)
        // this.filter = filter
        // let ledgers = await api.get(`/v1/ledgers/get`, '?' + filter)
        let ledgers = await api.get(`/v1/ledgers/get`)
        console.log(ledgers)
        this.ledgers = ledgers.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async confirmShow(schedule) {
      await this.showChanges(true)
      console.log(schedule)
      this.machine_nm = schedule.machine_nm
      this.incharge_id = schedule.incharge_id
      this.schedule_id = schedule.schedule_id
    },
    executionPage(schedule) {
      this.$router.push(`monitoring/${schedule.schedule_id}`)
    },
  },
  components: {
    SearchBar,
    StatusTpm,
    ModalPic,
    Toaster,
  },
}
</script>

<style scoped>
.w100-line {
  min-width: 100px;
}

.w40-date {
  min-width: 40px;
  z-index: -1 !important;
}

.w300-item-check {
  min-width: 300px;
}

.w200-mc {
  min-width: 100px;
}

.w200-per {
  min-width: 90px;
}

th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  background: white;
}

thead {
  top: 0;
  position: sticky;
  z-index: 1 !important;
}

tr td:nth-child(1),
tr td:nth-child(2),
tr td:nth-child(3),
tr td:nth-child(4),
tr th:nth-child(1),
tr th:nth-child(2),
tr th:nth-child(3),
tr th:nth-child(4) {
  position: sticky;
  left: 0;
}

tr th:nth-child(2),
tr td:nth-child(2) {
  left: 30px;
}

tr th:nth-child(3),
tr td:nth-child(3) {
  left: 100px;
}

tr th:nth-child(4),
tr td:nth-child(4) {
  left: 200px;
}
</style>
