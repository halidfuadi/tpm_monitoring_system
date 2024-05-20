<template>
  <CRow>
    <CCol class="overflow-auto">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th class="item-check text-center">Item Check</th>
            <th class="item-check text-center">Item Location</th>
            <th class="item-check text-center" colspan="2">Periodic</th>
            <th class="item-check text-center">Duration</th>
            <th class="item-check text-center">MP</th>
            <th class="item-check text-center">Standard</th>
            <th class="item-check text-center">Method</th>
            <th class="actions text-center">Plan Check Date</th>
          </tr>
          <tr></tr>
        </thead>
        <tbody>
          <td class="item-check text-center">
            <CFormInput v-model="form.itemcheck_nm" class="item-check text-center" style="border: none;" placeholder="add Name"/>
          </td>
          <td class="item-check text-center">
            <CFormInput v-model="form.itemcheck_loc" class="item-check text-center" style="border: none;" placeholder="add Location"/>
          </td>
          <td class="item-check text-center">
            <CFormInput v-model="form.val_period" class="item-check text-center" style="border: none;" placeholder="add Periodic"/>
          </td>
          <td class="item-check text-center">
            <CFormSelect v-model="form.period_id" class="item-chech text-center" style="border: none;">
              <option>Select Period</option>
              <option value=0>Day</option>
              <option value=1>Month</option>
              <option value=2>Year</option>
            </CFormSelect>
          </td>
          <td class="item-check text-center">
            <CFormInput v-model="form.duration" class="item-check text-center" style="border: none;" placeholder="add Duration"/>
          </td>
          <td class="item-check text-center">
            <CFormInput v-model="form.mp" class="item-check text-center" style="border: none;" placeholder="add MP"/>
          </td>
          <td class="item-check text-center">
            <CFormInput v-model="form.standard_measurement" class="item-check text-center" style="border: none;" placeholder="add Standard"/>
          </td>
          <td class="item-check text-center">
            <CFormInput v-model="form.itemcheck_method" class="item-check text-center" style="border: none;" placeholder="add Method"/>
          </td>
          <td class="item-check text-center">
            <CFormInput type="date" v-model="form.plan_check_dt" class="item-check text-center" style="border: none;" placeholder="add Method"/>
          </td>
        </tbody>
      </table>
    </CCol>
  </CRow>
  <CRow>
    <CCol>
      <CFormTextarea
        id="inputReasons"
        label="Reason to Add Itemcheck"
        rows="3"
        text="Must be 8-20 words long."
        v-model="form.reasons"
      ></CFormTextarea>
      <CButton @click="submitForm()" class="btn btn-sm col mb-3" color="success" yarnstyle="max-width: 150px; margin-bottom: 5px;">
        ADD ITEM
      </CButton>
    </CCol>
  </CRow>
</template>

<script>
import { CFormInput } from '@coreui/vue';
import { toast } from 'vue-sonner';

  export default{
    name: 'AddItemcheck',
    data() {
      return{
        form: {
          itemcheck_id : null,
          itemcheck_nm : null,
          itemcheck_method : null,
          duration : null,
          val_period : null,
          standard_measurement: null,
          ledger_id: this.ledger_id
        }
      }
    },

    methods: {
      async submitForm(){
        try {
          if(
            this.form.itemcheck_nm != null &&
            this.form.itemcheck_method != null &&
            this.form.duration != null &&
            this.form.standard_measurement != null){
              this.submittedForm = {
                ...this.form
              }
              console.log(this.submittedForm);
              this.submittedForm.period_id = +this.submittedForm.period_id
              this.submittedForm.val_period = +this.submittedForm.val_period

              this.$store.dispatch('ACT_NEW_ITEMCHECK', this.submittedForm)
              this.form.itemcheck_nm = null;
              this.form.itemcheck_method = null;
              this.form.duration = null;
              this.form.standard_measurement = null;
              this.form.val_period = null;
              this.form.period_id = null;
              this.form.plan_check_dt = null;
              this.form.itemcheck_loc = null;
              this.form.reasons = null;
              this.form.mp = null;
              toast.success('Success to add itemcheck, please wait for approval')
            }else{
              toast.error('Must not Empty')
            }
        } catch (error) {
          console.log(error);
          toast.error('Error to add itemcheck')
        }
      }
    },

    props:{
      ledger_id: Number
    }
  }
</script>
