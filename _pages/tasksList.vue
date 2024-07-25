<template>  
  <div>    
    <component :is="componentCrudData" ref="componentCrudData" />
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
            <!--cell content-->
            <div class="ellipsis-2-lines" style="max-width: 300px;" v-html="props.row[col.name]"></div>        
            
            <q-popup-edit
              v-if="col?.isEditable || false"
              v-model="props.row[col.name]"
              v-slot="scope"              
              no-caps
              @update:model-value="(value) => updateRow({col: col, row: props.row})"
            >
            <p>Update {{ col.label }} :</p>
            <div class="q-py-sm">
              <dynamic-field v-model="scope.value" :field="col['dynamicField']"/>
              <q-btn
                label="Close"
                no-caps
                flat dense
                @click.stop.prevent="scope.cancel"
              />

              <q-btn
                label="Update"
                no-caps
                flat dense
                @click.stop.prevent="scope.set"
                :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value"
              />
            </div>
            
            </q-popup-edit>
          </q-td>        
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
//Components
import {ref, markRaw} from 'vue';

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
      crudData: null,
      componentCrudData: null,
      columns: [],
      rows: []
    }
  },
  computed: {
  },
  methods: {
    async init(){
      await this.getCrudData()
      await this.getData()      
    },
    getCrudModule(){
      let crud = this.$route.meta.crud
      return crud
    },
    async getCrudData(){
      const crudComponent  = await this.getCrudModule()
      if (crudComponent.default) this.componentCrudData = markRaw(crudComponent.default);
      this.$nextTick(function() {
        if (this.$refs.componentCrudData && this.$refs.componentCrudData.crudData) {
          this.crudData = this.$clone(this.$refs.componentCrudData.crudData); //asing crudData to params           
          this.columns = this.crudData.read.columns || []

          const dynamicFields = {...this.crudData.formLeft, ...this.crudData.formRight}
          //add dynamicField to column if editable
          this.columns.forEach(element => {
            if(element?.isEditable){                
              element['dynamicField'] = {...dynamicFields[element.name]}
            }              
          });
          
        }
      })
    },
    getData(){
      const rows = [
        {
          id: 1, 
          title: "new task", 
          startDate: "",           
        },
      ];
      this.rows = ref(rows)
    },
    updateRow(value){
      console.warn('update row ===>> ', value)
    }
  }
}
</script>
<style>
</style>
