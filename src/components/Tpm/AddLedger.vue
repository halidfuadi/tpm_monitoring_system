<template>
  <CCard>
    <CCardHeader>
      Add Ledger
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol class="overflow-auto">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th class="item-check text-center">Machine Name</th>
                <th class="item-check text-center">Line</th>
              </tr>
              <tr></tr>
            </thead>
            <tbody>
              <td class="item-check text-center">
                <CFormInput v-model="form.machine_nm" class="item-check text-center" style="border: none;" placeholder="add Name"/>
              </td>
              <td class="item-check text-center">
                <CFormSelect v-model="form.line_id" class="item-chech text-center" style="border: none;">
                  <option>Select Line</option>
                  <option value=0>Low Pressure</option>
                  <option value=1>Die Casting</option>
                  <option value=2>Assy Line</option>
                  <option value=3>Cylinder Block</option>
                  <option value=4>Cylinder Head</option>
                  <option value=5>Camshaft</option>
                  <option value=6>Crankshaft</option>
                </CFormSelect>
              </td>
            </tbody>
          </table>
        </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter>
        <CButton @click="submitForm()" class="btn btn-sm col mb-3" color="success" yarnstyle="max-width: 150px; margin-bottom: 5px;">
          ADD MACHINE
        </CButton>
    </CCardFooter>
  </CCard>
</template>

<script>
import { CCardFooter, CFormInput, CCol } from '@coreui/vue';
import { toast } from 'vue-sonner';

  export default{
    name: 'AddLedger',
    data() {
      return{
        form: {}
      }
    },

    methods: {
      async submitForm(){
        if(
          this.form.machine_nm != null &&
          this.form.line_id != null){
            this.submittedForm = {
              ...this.form
            }
            this.submittedForm.line_id = +this.submittedForm.line_id
            console.log(this.submittedForm);
            this.$store.dispatch('ACT_NEW_LEDGER', this.submittedForm)
            toast.success('Success to add Ledger')
          }else{
            toast.error('Must not Empty')
          }
      }
    },
  }
</script>
