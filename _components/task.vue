<template>  
  <div class="row  q-col-gutter-x-md">    
    <div class="col-12 col-md-8">
      <!-- master-modal height-->
      <q-scroll-area style="height: calc(100vh - 173px);" visible class="q-pa-md">
        <!-- title -->
         <div style="min-height: 240px; height: 100%;">
          <div>
            <span class="text-h6">{{ row.title }}</span>
          </div>  
          <!-- description -->
          <div class="q-my-md">
            <span class="text-subtitle2 text-weight-bold">
              {{ $tr('isite.cms.form.description') }}:
            </span>
            <div class="q-my-xs" v-html="row.description">
            </div>
          </div>
        </div>
        <q-separator />
        <comments-component 
          :commentableId="Number(row.id)"
          commentableType="Modules\Itask\Entities\Task"
        />
      </q-scroll-area>      
    </div>
    <div class="col-12 col-md-4">
      <div class="q-mb-md task-details q-pa-sm">
        <span class="text-subtitle2 text-weight-bold">
          {{ $tr('isite.cms.details') }}
        </span>
        <div class="q-my-xs q-col-gutter-y-sm">
          <div class="row">
            <div class="col-5">          
              {{ $tr('isite.cms.form.category') }} :
            </div>
            <div class="col-7">
              {{ row.category.title }}       
            </div>
          </div>
          <div class="row">
            <div class="col-5">          
              {{ $tr('isite.cms.form.status') }} :
            </div>
            <div class="col-7">
              {{ row.status.title }}       
            </div>
          </div>
          <div class="row">
            <div class="col-5">          
              {{ $tr('itask.cms.form.priority') }} :
            </div>
            <div class="col-7">
              {{ row.priority.title }}       
            </div>
          </div>
          <div class="row">
            <div class="col-5">          
              {{ $tr('itask.cms.form.assigned') }}: 
            </div>
            <div class="col-7">
              {{ assignedTo}}
            </div>
          </div>          
          <div class="row">
            <div class="col-5">          
              {{ $tr('itask.cms.form.estimatedTime') }}: 
            </div>
            <div class="col-7">
              {{ row.formatedEstimatedTime}}
            </div>
          </div>
          <div class="row">
            <div class="col-5">          
              {{ $tr('itask.cms.duration') }}: 
            </div>
            <div class="col-7">
              {{ row.duration }}
            </div>
          </div>
          <div class="row">
            <div class="col-5">          
              {{ $tr('isite.cms.form.startDate') }}: 
            </div>
            <div class="col-7">
              {{ row.startDate }}       
            </div>
          </div>
          <div class="row">
            <div class="col-5">          
              {{ $tr('isite.cms.form.endDate') }}: 
            </div>
            <div class="col-7">
              {{ row.endDate }}       
            </div>
          </div>
        </div>
        <!-- show timelogs-->
        <div class="q-my-md">
          <div>
            <span class="text-subtitle2 text-weight-bold">
              {{ $tr('itask.cms.timeLogs.title') }}:
            </span>
          </div>
          <div>
            <q-btn
              text-color="primary"
              unelevated
              no-caps
              rounded
              :label="`${row.totalFormatedTimelogsDuration}`"
              @click="$emit('openTimeLogsModal', row)"
            />    
          </div>      
        </div>
        <div class="flex justify-end items-center">
          <q-btn
            :label="$tr('isite.cms.label.edit')" 
            @click=" () => {
              $emit('onUpdate', row)
              $emit('close')
            }"
            rounded
            no-caps
            unelevated
          />        
          <q-btn 
            :label="$tr('isite.cms.label.delete')" 
            @click="$emit('onDelete', row)"
            no-caps
            unelevated
            class="q-ml-sm"
          />
      </div>
      </div>      
    </div>  
  </div>
</template>
  <script lang="ts">
  import {defineComponent} from 'vue'
  import commentsComponent from 'modules/qcomment/_components/comments'
  
  export default defineComponent({
    props: {
      row: {default: {}}
    },
    components: {
      commentsComponent
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
  .task-details {
    border: 1px solid #091E4224;
    border-radius: 4px;
  }
  </style>