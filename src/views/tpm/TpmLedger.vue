<template>
  <Toaster position="top-center" closeButton />
  <CCard class="mb-3 p-2">
    <CRow>
      <CCol lg="4">
          <SearchBarLedger @getLedgers="getLedgers" />
          <AddLedger />
      </CCol>
      <CCol lg="8">
        <NewUpdate :dataUpdate="dataUpdate" :dataUpdatedItem="dataUpdatedItem"/>
      </CCol>
    </CRow>
  </CCard>
  <ModalItemcheck :isShow="isShow" :ledger_id="ledger_id" :machine_nm="machine_nm" :itemcheck_id="itemcheck_id" @showChanges="showChanges(state)" />
  <CCard>
    <CCardBody>
      <CRow>
        <CCol class="overflow-auto" lg="12">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="text-center">No</th>
                <th class="text-center">Line</th>
                <th class="text-center">Machine</th>
                <!-- <th class="text-center">Total Itemcheck</th> -->
                <th class="text-center">Actions</th>
              </tr>
            </thead>

            <tbody v-if="ledgers.length > 0 && !isLoading">
              <tr v-for="(ledger, i) in ledgers" :key="i">
                <td class="text-center">{{ i + 1 }}</td>
                <td class="text-center">{{ ledger?.line_nm }}</td>
                <td class="text-center">{{ ledger?.machine_nm }}</td>
                <!-- <td class="text-center">
                  <CBadge class="text-light bg-dark" shape="pill">{{ ledger?.num_item_checks }}</CBadge>
                </td> -->

                <td class="align-center">
                  <div class="d-flex justify-content-center">
                    <!-- Add a div with Bootstrap flex utilities -->
                    <CButton class="btn btn-sm col me-3" color="success" @click="showDetail(ledger)"
                      style="max-width: 100px">
                      ITEMCHECKS
                    </CButton>
                    <CButton class="btn btn-sm col" color="danger" style="max-width: 100px">
                      DELETE
                    </CButton>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="isLoading">
              <tr>
                <th class="text-center" colspan="5">
                  <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                  Loading...
                </th>
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
import api from "@/apis/CommonAPI";
import { Toaster } from "vue-sonner";

import ModalItemcheck from "@/components/Tpm/ModalItemcheck";
import SearchBarLedger from "@/components/Tpm/SearchBarLedger";
import StatusTpm from "@/components/Tpm/StatusTpm";
import NewUpdate from "@/components/Tpm/NewUpdate";
import AddItemcheck from "../../components/Tpm/AddItemcheck.vue";
import AddLedger from "../../components/Tpm/AddLedger.vue"

export default {
  name: "TpmLedger",
  data() {
    return {
      filtered: {
        currentPage: 1,
      },
      isLoading: false,
      rowsPerPage: 5,
      maxVisible: 5,
      modelValue: 10,

      dataUpdate: [],
      dataUpdatedItem: [],

      isShow: false,
      filter: null,
      schedule_id: null,
      approval: null,

      ledgers: [],
      ledger_id: null,
      line_nm: null,
      machine_nm: null,
      num_item_checks: null,
      rowsNumber: 1,

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
          label: "All",
          value: -1,
        },
      ],
    };
  },
  computed: {
    // pages() {
    //   function range(start, end) {
    //     return Array.from(Array(end - start + 1), (_, i) => i + start);
    //   }

    //   const max = this.maxVisible;
    //   const middle = Math.floor(this.maxVisible / 2);
    //   const pageNum = Math.ceil(this.rowsNumber / this.rowsPerPage);

    //   if (pageNum < max) {
    //     return range(1, pageNum);
    //   }

    //   let start = this.modelValue - middle;
    //   let end = this.modelValue + middle;

    //   // If we're close to the end
    //   if (this.modelValue >= pageNum - middle) {
    //     start = pageNum - max + 1;
    //     end = pageNum;
    //   }

    //   return range(Math.max(1, start), Math.max(end, max));
    // },
  },

  methods: {
    // onPageClick(page) {
    //   this.$emit("update:modelValue", page);
    // },
    // onPageBack() {
    //   if (this.modelValue - 1 >= 1) {
    //     this.onPageClick(this.modelValue - 1);
    //   }
    // },
    // onPageForward() {
    //   if (
    //     this.modelValue + 1 <=
    //     Math.ceil(this.rowsNumber / this.rowsPerPage)
    //   ) {
    //     this.onPageClick(this.modelValue + 1);
    //   }
    // },
    async getLedgers(filter) {
      try {
        // this.isLoading = true
        this.filter = filter
        let ledgers = await api.get(`/tpm/ledgers`, '?' + filter);
        console.log(ledgers);
        this.ledgers = ledgers.data.data;
        // this.isLoading = false
      } catch (error) {
        console.log(error);
      }
    },
    showChanges(state) {
      this.isShow = state;
    },
    async showDetail(ledger) {
      this.isLoading = true
      this.machine_nm = ledger.machine_nm;
      this.ledger_id = ledger.ledger_id;
      setTimeout(() => {
        this.showChanges(true);
        this.isLoading = false
      }, 500);
    },

    async getUpdate(){
      try {
        let dataUpdate = await api.get(`/tpm/ledgers/new_data`, '?')
        this.dataUpdate = dataUpdate.data.data
        console.log(this.dataUpdate);
      } catch (error) {
        console.log(error);
      }
    },

    async getUpdatedItem(){
      try {
        let dataUpdatedItem = await api.get(`/tpm/itemchecks/updatedItem`, '?')
        this.dataUpdatedItem = dataUpdatedItem.data.data
        console.log(this.dataUpdatedItem);
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted(){
    await this.getLedgers()
    await this.getUpdate()
    await this.getUpdatedItem()
  },

  components: {
    SearchBarLedger,
    NewUpdate,
    StatusTpm,
    ModalItemcheck,
    Toaster,
    AddLedger
  },
};
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
