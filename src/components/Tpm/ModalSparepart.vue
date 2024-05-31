<template>
  <CModal>
    <CModalHeader>
      <CModalTitle>
        LIST SPAREPART {{ this.id_ledger }}
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <table class="table table-bordered table-striped" responsive="md">
        <thead>
          <tr>
            <th class="no text-center">No</th>
            <th class="text-center">Sparepart</th>
          </tr>
        </thead>
        <tbody v-if="sparepart">
          <tr v-for="(part, i) in sparepart" :key="i">
            <td class="text-center">{{ i + 1 }}</td>
            <td class="text-center">{{ part.sparepart_nm }}</td>
          </tr>
        </tbody>
      </table>
    </CModalBody>
  </CModal>
</template>

<script>
import api from "@/apis/CommonAPI";
import { mapGetters } from "vuex";
import { toast } from "vue-sonner";

export default {
  name: "ModalSparepart",
  data() {
    return {
      sparepart: [],
      id_ledger: null,

    };
  },
  watch: {
    is_show_sparepart: function () {
      this.is_show = this.is_show_sparepart;
    },

  },
  methods: {
  },

  mounted() {

  },
  props: {

  },
};
</script>
