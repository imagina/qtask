<template>    
    <q-card style="width: 300px;">
      <q-card-section class="bg-white"> 
        <div class="row col-12">
          <h4>Seguimiento de tiempo</h4>
        </div>
        <div class="row col-12">          
          <dynamic-field
            v-model="timeLogModel"
            :field="timeLogField"
            @update:model-value="(value) => $emit(value)"               
            style="width: 246px;"
          />
          
        </div>

        <div class="row  q-gutter-y-sm">
          <template v-for="(item, itemKey) in row.timelogs"  :key="itemKey" >            
              <div class="col-12">
                <q-chip 
                  removable
                  outline
                  @remove="deleteTimeLog(item)"
                >
                <span class="text-weight-bold">{{ item.formatedTimeSpent }}</span>
                &nbsp;
                <span >{{ $trd(item.createdAt) }}</span>
                {{ item.createdBy }}

                </q-chip>
              </div>                
          </template>
        </div>
      </q-card-section>
      <q-card-actions align="right"  class="q-px-md q-pb-md">
        <q-btn
          :label="$tr('notification.cms.cancel')"
          rounded
          no-caps
          unelevated
          color="grey-3"
          text-color="grey-8"
          @click="$emit('closeModal')"
          class="q-px-md"
        />
        <q-btn
          label="Save"
          rounded
          no-caps
          unelevated
          color="grey-3"
          text-color="grey-8"
          @click="() => createTimeLog()"
          class="q-px-md"
        />
      </q-card-actions>
    </q-card>
  
  </template>
  <script lang="ts">
  import {defineComponent} from 'vue'
  import controller from 'modules/qtask/_components/timeLogs/controller'
  
  export default defineComponent({
    props: {
      row: {default: {}},
      col: {default: {}},
      data: {default: {}}
    },
    setup(props, {emit}) {
      return controller(props, emit)
    }, 
    computed: {
    },
    data(){
      return {        
        timeLogField: {
          value: '',
          type: 'input',
          props: {
            label: 'Tiempo empleado',
            rules: [
              val => !!val || this.$tr('isite.cms.message.fieldRequired')
            ],          
          },
        },
      }
    },
    
    
  })
  </script>
  <style lang="scss">
  </style>