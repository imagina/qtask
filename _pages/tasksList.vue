<template>  
  <q-table
    flat bordered
    title="DynamicTable"
    :rows="rows"
    :columns="columns"
    row-key="name"
    binary-state-sort
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >          
          {{  props.row[col.name] }}
          <q-popup-edit
            v-if="col?.isEditable || false"
            v-model="props.row[col.name]" 
            :title="`Update ${col.name}`" 
            buttons 
            
            v-slot="scope"
            @update:model-value="(value) => updateRow({col: col, row: props.row})"
          >
          <!-- dynamicfiield-->
            <dynamic-field v-model="scope.value" :field="col['dynamicField']"/>
            <q-input type="text" v-model="scope.value" dense autofocus v-if="false"/>
          </q-popup-edit>
        </q-td>        
      </q-tr>
    </template>
  </q-table>
</template>
<script>
//Components
import {ref} from 'vue';

      const rows = [
        {
          id: 1, 
          title: "new task", 
          startDate: "", 
          
        },
      ];


export default {
  props: {},
  components: {},
  watch: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {      
      loading: false, 
      columns: [
        {
          name: 'id',
          required: true,
          label: 'id',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true, 
          isEditable: false,
          style: 'width: 10px', 
        },
        
        {
          name: 'title', 
          align: 'center', 
          label: 'title', 
          field: 'title', 
          sortable: true,
          style: 'width: 10px', 
          isEditable: true, 
          dynamicField: {
              value: '',
              type: 'input',
              props: {
                label: `${this.$tr('isite.cms.form.title')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
            },
          }, 
        },
        {
          name: 'assignedtoId', 
          align: 'center', 
          label: 'assignedtoId', 
          field: 'assignedtoId', 
          sortable: true,
          style: 'width: 10px', 
          isEditable: true, 
          dynamicField: {
            value: [],
            type: 'select',
            props: {
              label: this.$tr('itask.cms.form.assigned'),
              //multiple: true,
              //useChips: true,
              useInput: true,
              rules: [
                val => !!val?.length || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.quser.users',              
              select: {
                label: 'email',
                id: item => `${item.id}`                
              }
            }
          },           
        },
        {
          name: 'startDate', 
          align: 'center', 
          label: 'startDate', 
          field: 'startDate', 
          sortable: true, 
          style: 'width: 10px', 
          isEditable: true,
          dynamicField:  {
            value: '',            
            type: 'date',
            props: {
              label: this.$tr('isite.cms.form.startDate')
            }
          },
        },
        
        /*
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
         */
        
      ],

      rows: ref(rows)
      
    }
  },
  computed: {},
  methods: {
    async init(){},
    updateRow(value){
      console.warn('update row ===>> ', value)
    }
  }
}
</script>
<style>
</style>
