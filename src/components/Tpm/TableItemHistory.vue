<template>

<CCard class="p-3">
  <CRow>
    <CCol lg="6">
      <span>ADDED ITEM HISTORY</span>
      <table class="table table-bordered table-striped" responsive="md">
        <thead>
          <tr>
            <th class="no text-center">No</th>
            <th class="no text-center">Machine</th>
            <th class="text-center">Item Name</th>
            <th class="text-center">Approval</th>
            <th class="text-center" colspan="2">Periods</th>
            <th class="text-center">Date</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in newItems" :key="i">
            <td class="text-center">{{ i+1 }}</td>
            <td class="text-center">{{ item.machine_nm }}</td>
            <td class="text-center">{{ item.itemcheck_nm }}</td>
            <td class="text-center">{{ item.approval }}</td>
            <td class="text-center">{{ item.val_periodic }}</td>
            <td class="text-center">{{ item.period_nm }}</td>
            <td class="text-center">{{ item.created_dt.split('T')[0] }}</td>
            <td class="text-center">
              <CButton class="btn btn-sm col" color="info" @click="" >DETAILS</CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </CCol>
    <CCol lg="6">

    </CCol>
  </CRow>
</CCard>

</template>

<script>
import api from "@/apis/CommonAPI";

export default {
  name: "TableItemHistory",
  data() {
    return {
      newItems: [],
    }

  },

  methods: {
    async getItem(){
      try {
        console.log("cie berhasil");
        let newItems = await api.get(`/tpm/history/getNewItem`, `?`)
        this.newItems = newItems.data.data
        console.log(this.newItems);
      } catch (error) {
        console.log(error);
      }
    }
  },

  mounted() {
    this.getItem()
  }
}


</script>
