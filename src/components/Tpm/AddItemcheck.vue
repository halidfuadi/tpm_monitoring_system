<template>
  <CRow>
    <CCol class="overflow-auto">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th class="item-check text-center">Item Check</th>
            <th class="item-check text-center">Periodic</th>
            <th class="item-check text-center">Duration</th>
            <th class="item-check text-center">Standard</th>
            <th class="item-check text-center">Methods</th>
            <!-- <th class="actions text-center">Actions</th> -->
          </tr>
          <tr></tr>
        </thead>
        <tbody>
          <td class="item-check text-center">
            <input class="item-check text-center" style="border: none;" placeholder="add Name"</input>
          </td>
          <td class="item-check text-center">
            <CInputGroup class="">
              <CFormInput aria-label="Text input with dropdown button"/>
              <CDropdown alignment="end" variant="input-group">
                <CDropdownToggle variant="outline">Dropdown</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                  <CDropdownDivider/>
                  <CDropdownItem href="#">Separated link</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CInputGroup>
          </td>
          <td class="item-check text-center">
            <input class="item-check text-center" style="border: none;" placeholder="add Duration"</input>
          </td>
          <td class="item-check text-center">
            <input class="item-check text-center" style="border: none;" placeholder="add Standard"</input>
          </td>
          <td class="item-check text-center">
            <input class="item-check text-center" style="border: none;" placeholder="add Method"</input>
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
      ></CFormTextarea>
      <CButton class="btn btn-sm col" color="success" @click="" style="max-width: 150px; margin-bottom: 5px;">
        ADD ITEM
      </CButton>
    </CCol>
  </CRow>
</template>

<script>
  export default{
    name: 'AddItemcheck',
    data() {
      return{
        id_ledger: this.ledger_id
      }
    },
    props:{
      ledger_id: Number
    }
  }
</script>
