<template>
  <SearchBarHistory @getHistory="getHistory" />
  <CCard>
    <CCardBody>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Date Check</th>
            <th>Itemcheck</th>
            <th>Actual</th>
            <th>OK</th>
            <th>NG</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody v-if="GETTER_HISTORY_TPM.length > 0">
          <tr v-for="item in GETTER_HISTORY_TPM" :key="item.schedule_id">
            <td>{{ item.no }}</td>
            <td>{{ item.actual_check_dt.split('T')[0] }}</td>
            <td>{{ item.itemcheck_nm }}</td>
            <td>{{ item.checked_val }}</td>
            <td>{{ item.ok_val }}</td>
            <td>{{ item.ng_val }}</td>
            <td>
              <router-link
                class="btn btn-sm bg-primary text-light"
                :to="`/tpm/monitoring/${item.schedule_id}`"
              >
                Details
              </router-link>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center" colspan="7">
              <b>Tidak Ada Data</b>
            </td>
          </tr>
        </tbody>
      </table>
    </CCardBody>
    <CCardFooter>

    </CCardFooter>
  </CCard>
</template>

<script>
import SearchBarHistory from '@/components/Tpm/SearchBarHistory.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'TpmHistory',
  components: {
    SearchBarHistory,
  },
  methods: {
    getHistory(filter) {
      console.log(filter)
      this.$store.dispatch('ACT_HISTORY_TPM', filter)
    },
  },
  computed: {
    ...mapGetters(['GETTER_HISTORY_TPM']),
  },
}
</script>
