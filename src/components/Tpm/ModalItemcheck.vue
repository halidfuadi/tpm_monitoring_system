<template>
  <CModal :visible="is_show" backdrop="static" size="lg" @close="changesShow()">
    <CModalHeader closeButton>Items</CModalHeader>
    <CModalBody>
      <CRow>
        <CCol lg="6">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Machine</span>
            </div>
            <input disabled type="text" class="form-control" placeholder="Machine" :value="machine_nm" />
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol class="overflow-auto" lg="12">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="no text-center">No</th>
                <th class="item-check text-center">Item Check</th>
                <th class="item-check text-center">Periodic</th>
                <th class="item-check text-center">Duration</th>
                <th class="item-check text-center">Standard</th>
                <th class="item-check text-center">Methods</th>
                <th class="actions text-center">Actions</th>
              </tr>
              <tr></tr>
            </thead>

            <tbody v-if="items">
              <tr v-for="(item, i) in items" :key="i">
                <td class="text-center">{{ i + 1 }}</td>
                <td class="item-check text-center">{{ item?.itemcheck_nm }}</td>
                <td class="item-check text-center">
                  {{ item?.val_period }} {{ item.period_nm }}
                </td>
                <td class="item-check text-center">{{ item?.duration }}</td>
                <td class="item-check text-center">
                  {{ item?.standard_measurement }}
                </td>
                <td class="item-check text-center">
                  {{ item?.method_check }}
                </td>
                <td class="actions">
                  <CButton class="btn btn-sm col" color="warning" @click="showDetail()" style="max-width: 100px">
                    EDIT
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
    </CModalBody>
    <CModalFooter>
      <CButton @click="changesShow()">Cancel</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import api from "@/apis/CommonAPI";
import { mapGetters } from "vuex";

export default {
  name: "ModalItemCheck",
  data() {
    return {
      users: [],
      is_show: false,
      items: null,
      id_ledger: null,
    };
  },
  watch: {
    isShow: function () {
      this.is_show = this.isShow;
      this.id_ledger = this.ledger_id;
    },
    getSubmitStatus: {
      handler() {
        console.log(this.getSubmitStatus);
        this.is_show = false;
        this.changesShow();
      },
      deep: true,
    },
    id_ledger: function () {
      console.log("CHANGES");
      console.log(this.id_ledger);
      if (this.id_ledger || this.id_ledger == 0) {
        this.getItems();
      }
    },
  },
  computed: {
    ...mapGetters(["getSubmitStatus"]),
  },
  methods: {
    async getItems() {
      console.log("getItems CAlling");
      console.log(this.id_ledger);
      try {
        let items = await api.get(
          `/tpm/ledgers/detail`,
          `?ledger_id=${this.id_ledger}`
        );
        console.log(items);
        this.items = items.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    changesShow() {
      this.userSelected = [];
      if (this.is_show) {
        this.is_show = false;
      } else {
        this.is_show = true;
      }
      this.$emit("showChanges", this.is_show);
    },
  },
  mounted() { },
  props: {
    incharge_id: String,
    isShow: Boolean,
    machine_nm: String,
    ledger_id: Number,
  },
};
</script>
