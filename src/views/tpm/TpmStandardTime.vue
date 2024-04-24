<template>
  <div class="card">
    <div class="card-header">
      Search
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Month</span>
            </div>
            <input v-model="selectedMonth" type="month" class="form-control" placeholder="Month">
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
    </div>

    <div class="card-body card">
      <GraphStandardTime :filter="filter" />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { toast } from 'vue-sonner'
import { GET_LINES } from '../../store/lines.module'
import { GET_MACHINES } from '../../store/machines.module'

import GraphStandardTime from '../../components/Tpm/GraphStandardTime.vue'

export default {
  name: "TPMStandardTime",
  data() {
    return {
      selectedMonth: moment().format('YYYY-MM'),
      filter: {
        month: `${moment().format('YYYY-MM')}`,
        line_id: -1,
        machine_id: -1,
      }
    }
  },
  components: {
    GraphStandardTime
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
    }
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
