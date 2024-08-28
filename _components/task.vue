<template>  
  <div class="row">
    <div class="col-12">  
      <!-- title -->
      <div>
        <span class="text-h6">{{ row.title }}</span>
      </div>
      <!-- desc -->
      <div class="q-my-md">
        <span class="text-subtitle2 text-weight-bold">
          {{ this.$tr('isite.cms.form.description') }}:
        </span>
        <div class="q-my-xs" v-html="row.description">
        </div>
      </div>

      <div class="q-my-md">
        <span class="text-subtitle2 text-weight-bold">
          Details:
        </span>
        <div class="q-my-xs">
          <div class="row">
            <div class="col-3">          
              {{ this.$tr('itask.cms.form.priority') }} :
            </div>
            <div class="col-9">
              {{ row.priority.title }}       
            </div>
          </div>
          <div class="row">
            <div class="col-3">          
              {{ this.$tr('itask.cms.form.assigned') }}: 
            </div>
            <div class="col-9">
              {{ assignedTo}}
            </div>
          </div>
          <div class="row">
            <div class="col-3">          
              {{ $tr('itask.cms.duration') }}: 
            </div>
            <div class="col-9">
              {{ row.duration }}
            </div>
          </div>
          <div class="row">
            <div class="col-3">          
              {{ $tr('isite.cms.form.startDate') }}: 
            </div>
            <div class="col-9">
              {{ row.startDate }}       
            </div>
          </div>
          <div class="row">
            <div class="col-3">          
              {{ $tr('isite.cms.form.endDate') }}: 
            </div>
            <div class="col-9">
              {{ row.endDate }}       
            </div>
          </div>
        </div>
      </div>
      

      <!-- show timelogs-->
      <div class="q-mt-md">
        <span class="text-subtitle2 text-weight-bold">
          {{ this.$tr('itask.cms.timeLogs.title') }}:
        </span>
        <q-btn
          text-color="primary"
          class="q-mr-sm"
          unelevated
          no-caps
          :label="`${row.totalFormatedTimelogsDuration}`"
          @click="$emit('openTimeLogsModal', row)"
        />          
      </div>
    </div>
  
  </div>
</template>
  <script lang="ts">
  import {defineComponent} from 'vue'
  
  export default defineComponent({
    props: {
      row: {default: {}}  
    },    
    computed: {
      assignedTo(){        
        return (this.row.assignedTo && (this.row.assignedTo?.firstName || this.row.assignedTo?.lastName)  ?  `${this.row.assignedTo.firstName} ${this.row.assignedTo.lastName}` : '-')
      }
    },
    methods: {}      
  })
  </script>
  <style lang="scss">
  </style>