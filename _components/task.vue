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

      <div>
        <span class="text-subtitle2 text-weight-bold">
          {{ this.$tr('itask.cms.form.priority') }}: 
        </span>
        {{ row.priority.title }}       
      </div>

      <div>
        <span class="text-subtitle2 text-weight-bold">
          {{ this.$tr('itask.cms.form.assigned') }}: 
        </span>
        {{ assignedTo}}
      </div>


      <div>
        <span class="text-subtitle2 text-weight-bold">
          {{ $tr('itask.cms.duration') }}: 
        </span>
        {{ row.duration }}       
      </div>
      <div>
        <span class="text-subtitle2 text-weight-bold">
          {{ $tr('isite.cms.form.startDate') }}: 
        </span>
        {{ row.startDate }}       
      </div>
      <div>
        <span class="text-subtitle2 text-weight-bold">
          {{ $tr('isite.cms.form.endDate') }}: 
        </span>
        {{ row.endDate }}
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
          :label="`${$tr('itask.cms.timeLogs.total')} : ${row.totalFormatedTimelogsDuration}`"
          @click="$emit('openTimeLogsModal', row)"
        />          
      </div>
    </div>


      
      
      
      
      
      
    

    
    

    
    
  
  </div>
</template>
  <script lang="ts">
  import {defineComponent,  ref} from 'vue'
  import moment from 'moment';

  
  
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