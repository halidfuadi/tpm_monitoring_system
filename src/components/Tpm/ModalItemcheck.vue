<template>
  <CModal :visible="is_show" backdrop="static" @close="changesShow()">
    <CModalHeader closeButton>Items</CModalHeader>
    <CModalBody>
      <CRow>
        <CCol lg="6">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Machine</span>
            </div>
            <input
              disabled
              type="text"
              class="form-control"
              placeholder="Machine"
              :value="machine_nm"
            />
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
                <th class="actions text-center">Actions</th>
              </tr>
              <tr>
              </tr>
            </thead>

            <tbody v-if="items.length > 0">
              <tr v-for="(item, i) in items" :key="i">
                <td class="text-center" >{{ i + 1 }}</td>
                <td class="item-check text-center">{{ item?.itemcheck }}</td>
                <td class="actions row">
                  <CButton class="btn btn-sm col" color="warning" v-bind="props" @click="showDetail()" style="max-width: 100px">
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
import api from '@/apis/CommonAPI'
import { mapGetters } from 'vuex'

export default {
  name: 'ModalPic',
  data() {
    return {
      users: [],
      is_show: false,
      items: [],
    }
  },
  watch: {
    isShow: function () {
      this.is_show = this.isShow
      console.log(this.ledger_id);
    },
    getSubmitStatus: {
      handler() {
        console.log(this.getSubmitStatus)
        this.is_show = false
        this.changesShow()
      },
      deep: true,
    },
    ledger_id: function() {
      this.getItems(this.ledger_id)
    }
  },
  computed: {
    ...mapGetters(['getSubmitStatus']),
  },
  methods: {
    async getItems(ledger_id) {
      try {
        let items = await api.get(`v1/ledgers/detail`, `?ledger_id=${ledger_id}`)
        console.log(items)
        this.items = items.data
      } catch (error) {
        console.log(error)
      }
    },
    changesShow() {
      this.userSelected = []
      if (this.is_show) {
        this.is_show = false
      } else {
        this.is_show = true
      }
      this.$emit('showChanges', this.is_show)
    },
  },
  mounted() {
  },
  props: {
    incharge_id: String,
    isShow: Boolean,
    machine_nm: String,
    ledger_id: Number
  },
}
</script>
