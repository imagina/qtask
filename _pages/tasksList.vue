<template>  
    <div>
    <!--Content-->
    <!-- tabs -->
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 q-mb-sm">
        <q-tabs
          v-model="tabModel"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          no-caps
          narrow-indicator
          style="align-items: center;"
        >
          <q-tab v-for="(tab, index) in tabs" :key="index" :name="tab.value"  :label="tab.label" />
        </q-tabs>
      </div>
    </div>
    <!-- tasks -->
    <div class="q-px-md">
      <dynamicList
        v-if="tabModel == tabs[0].value"        
        ref="dynamicList"
        :listData="listData"
        @new="() => $refs.crudComponent.create()"
      >
      <!-- date range and week navigation -->      
      <template #top-table>
        <div class="tw-w-full tw-flex q-my-md items-center">
          <div>
            <q-btn
              text-color="primary"
              class="q-mr-sm"
              size="sm"
              unelevated
              round            
              icon="fa-regular fa-chevron-left"
              @click="goToPrevious()"
            >
              <q-tooltip anchor="bottom middle" self="top middle">
                {{ $tr('itask.cms.previousWeek') }}
              </q-tooltip>
            </q-btn>
          </div>
          <div class="tw-w-full row">
            <dynamic-field
                v-model="dateRangeFilter.value"
                @update:model-value="(value) => setDateRange(value)"
                :field="dateRangeFilter"
                style="width: 246px;"
            />
            <div class="text-primary q-pa-md" style="font-size: 16px">
              <div>{{ dynamicListTitle }}</div>
            </div>
          </div>
          <div>
            <q-btn
              text-color="primary"
              class="q-mr-sm"
              size="sm"
              unelevated
              round
              icon="fa-regular fa-chevron-right"
              @click="goToNext()"
            >
              <q-tooltip anchor="bottom middle" self="top middle">
                {{ $tr('itask.cms.nextWeek') }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </template>
      </dynamicList>
    </div>

    <!--- show task modal --->
    <master-modal
      v-model="selectedRow.showModal"      
      :title="`Task : ${selectedRow.row?.id}`"
      width="460px"
      @hide="selectedRow.showModal = false"      
    > 
      <taskComponent 
       :row="selectedRow.row"
       @openTimeLogsModal="(row) => openTimeLogsModal(row)"
      />
    </master-modal>

    <!-- crud form -->
    <crud 
      ref="crudComponent"
      :type="null"
      :crud-data="import('modules/qtask/_crud/tasks')"
      @created="refreshDynamicList()"
      @updated="refreshDynamicList()"
      @deleted="refreshDynamicList()"
    />

    <!-- modal for timelogs -->
    <master-modal
      v-model="selectedRow.timeLogsModal"
      :title="$tr('itask.cms.timeLogs.title')"
      width="460px"
      @hide="selectedRow.timeLogsModal = false"
    >
      <timeLogsComponent
        :row="selectedRow.row"
        @closeModal="selectedRow.timeLogsModal = false"
        @reloadRow="(row) => reloadRow(row)"
      />
    </master-modal>

    <inner-loading :visible="loading"/>
  </div>
</template>
<script>
//Components
import dynamicList from 'modules/qsite/_components/master/dynamicList'
import statusComponent from 'modules/qtask/_components/status'
import dateComponent from 'modules/qtask/_components/date'
import timeLogsComponent from 'modules/qtask/_components/timeLogs'
import taskComponent from 'modules/qtask/_components/task'
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD'

export default {
  props: {},
  components: {
    dynamicList,
    statusComponent,
    timeLogsComponent,
    taskComponent
  },
  watch: {},
  mounted() {
    this.$nextTick(function () {
      //this.init()
    })
  },
  data() {
    return {
      selectedRow: {
        timeLogsModal: false,
        showModal: false,
        row: null
      },
      
      tabs: [
        {
          value: 'table',
          label: 'Table'
        },
        {
          value: 'backlog',
          label: 'Backlog'
        },        
      ],      
      tabModel: 'table',
      date: {
        from: moment().startOf('week').format(dateFormat),  
        to: moment().endOf('week').format(dateFormat)
      },
      dateRangeFilter: {
        value: {
          type: 'customRange',
          from: moment().startOf('week').format(dateFormat),  
          to: moment().endOf('week').format(dateFormat)
        },
        type: 'dateRange',        
        props: {
          label: 'Date',
          clearable: false,
          removeTime: true, 
          autoClose: true
        }
      },
      loading: false,
      listData: {
        apiRoute: 'apiRoutes.qtask.tasks',
        permission: 'itask.tasks',
        search: true,
        create: {
          title: this.$tr('itask.cms.newTask'),
        },
        read: {
          title: this.$tr('itask.cms.taskManagement'),
          tableProps: {
            dense: true
          },
          columns: [
            {
              name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: '',
              onClick: ({row}) => this.openShowModal(row)
            },
            {
              name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth',
              style: "max-width: 200px;width: 200px;", 
              onClick: ({row}) => this.openShowModal(row)
            },
            {
              name: 'assignedTo', label: this.$tr('itask.cms.form.assigned'), field: 'assignedTo', align: 'left',
              format: ({val}) => ((val && (val.firstName || val.lastName) ) ? `${val.firstName} ${val.lastName}` : '-'),
              dynamicField: {
                value: [],
                type: 'select',
                name: 'assignedToId',
                props: {
                  label: this.$tr('itask.cms.form.assigned'),
                  useInput: true,
                  clearable: true,
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
              name: 'startDate', label: this.$tr('isite.cms.form.startDate'), field: 'startDate', align: 'center',
              classes: "padding-none",
              headerClasess: "padding-none",
              component: dateComponent,
              dynamicField: {          
                value: '',            
                type: 'date',
                props: {
                  label: this.$tr('isite.cms.form.startDate'),
                }
              }
            },
            {
              name: 'endDate', label: this.$tr('isite.cms.form.endDate'), field: 'endDate', align: 'center',
              classes: "padding-none",
              headerClasess: "padding-none",
              component: dateComponent,
              dynamicField: {          
                value: '',            
                type: 'date',
                props: {
                  label: this.$tr('isite.cms.form.endDate'),
                }
              }
            },
            {
              name: 'duration', label: this.$tr('itask.cms.duration'), field: 'duration', align: 'center',
              classes: "padding-none",
              headerClasess: "padding-none",
              format: ({val}) => val ? val : '-',
            },
            {
              name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'center', 
              classes: "padding-none",
              headerClasess: "padding-none",
              component: statusComponent,
              dynamicField: {
                type: 'select',
                name: 'statusId',
                props: {
                  label: this.$tr('isite.cms.form.status'),             
                  useInput: true,
                  clearable: true,
                  rules: [
                    val => !!val?.length || this.$tr('isite.cms.message.fieldRequired')
                  ],
                },
                loadOptions: {
                  apiRoute: 'apiRoutes.qtask.statuses',
                  select: {
                    label: 'title',
                    id: item => `${item.id}`
                  }
                }
              },
            },
            {
              name: 'priority', label: this.$tr('itask.cms.form.priority'), field: 'priority', align: 'center',
              classes: "padding-none",
              headerClasess: "padding-none",
              component: statusComponent, 
              dynamicField: {
                value: [],
                type: 'select',
                name: 'priorityId',
                props: {
                  label: this.$tr('itask.cms.form.priority'),             
                  useInput: true,
                  clearable: true,
                  rules: [
                    val => !!val?.length || this.$tr('isite.cms.message.fieldRequired')
                  ],
                },
                loadOptions: {
                  apiRoute: 'apiRoutes.qtask.priorities',
                  select: {
                    label: 'title',
                    id: item => `${item.id}`
                  }
                }
              },
            },           
            {
              name: 'estimatedTime', label: this.$tr('itask.cms.form.estimatedTime'), field: 'formatedEstimatedTime', align: 'center',
              format: ({row}) => row?.formatedEstimatedTime ? row.formatedEstimatedTime : '-',
              dynamicField: {
                value: '',
                name: 'estimatedTime',
                type: 'timeSpent',
                props: {
                  label: this.$tr('itask.cms.form.estimatedTime'),
                  unit: 'minutes'
                }
              },
            },
            {
              name: 'category', label: this.$tr('isite.cms.form.category'),
              align: 'left', field: 'category',
              format: ({val}) => val && val?.title ? val.title : '-',
              dynamicField: {
                value: [],
                type: 'select',
                name: 'categoryId',
                props: {
                  label: this.$tr('isite.cms.form.category'),
                  useInput: true,
                  rules: [
                    val => !!val?.length || this.$tr('isite.cms.message.fieldRequired')
                  ],
                },
                loadOptions: {
                  apiRoute: 'apiRoutes.qtask.categories',
                  select: {
                    label: 'title',
                    id: item => `${item.id}`
                  }
                }
              },
            },
            {
              name: 'totalFormatedTimelogsDuration', label: this.$tr('itask.cms.timeLogs.title'), field: 'totalFormatedTimelogsDuration', align: 'left',
              format: ({val}) => val ? val : '-',
              onClick: ({row})  => {
                this.openTimeLogsModal(row)
              }
            },            
            {
              name: 'actions', label: this.$tr('isite.cms.form.actions'), 
              align: 'center',          
            },
          ],
          requestParams: {
            include: 'category,status,priority,timelogs.creator,assignedTo',
            filter: {
              rangeDate: {
                from: moment().startOf('week').format(dateFormat),  
                to: moment().endOf('week').format(dateFormat)
              }
            }
          },
          filters: {
            assignedToId: {
              value: [],
              type: 'select',
              props: {
                label: this.$tr('itask.cms.form.assigned'),
                useInput: true,
                clearable: true,                
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
            priorityId: {
              value: [],
              type: 'select',
              props: {
                label: this.$tr('itask.cms.form.priority'),             
                useInput: true,
                clearable: true,
                rules: [
                  val => !!val?.length || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qtask.priorities',
                select: {
                  label: 'title',
                  id: item => `${item.id}`
                }
              }
            },
            categoryId: {
              value: [],
              type: 'select',
              props: {
                label: this.$tr('isite.cms.form.category'),
                useInput: true,
                clearable: true,
                rules: [
                  val => !!val?.length || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qtask.categories',
                select: {
                  label: 'title',
                  id: item => `${item.id}`
                }
              }
            },
            statusId: {
              value: [],
              type: 'select',
              props: {
                label: this.$tr('isite.cms.form.status'),             
                useInput: true,
                clearable: true,
                rules: [
                  val => !!val?.length || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qtask.statuses',
                select: {
                  label: 'title',
                  id: item => `${item.id}`
                }
              }
            },            
          },
          
          help: {
            title: this.$tr('itask.cms.taskManagement'),
            description: this.$tr('itask.cms.taskManagement')
          },
          
        },
        update: {
          title: this.$tr('itask.cms.taskManagement')
        },
        //runs before update the row
        beforeUpdate: ({val, row}) => {
          return new Promise((resolve, reject) => {
            //check startDate should be minor than dateFormat
            if(row.description == '') reject(row)
            
            if(moment(row.startDate).format(dateFormat) > moment(row.endDate).format(dateFormat)){
              this.$alert.error({message: this.$tr('itask.cms.date.error')})
              reject(row)
            } else {
              resolve(row)
            }
          })
        },
        actions: [
          //onClick: ({row}) => this.openShowModal(row)
          {//Open timelogs
            icon: 'fa-light fa-timer',
            name: 'addTimelog',
            label: this.$tr('itask.cms.timeLogs.title'),
            action: (item) => {
              this.openTimeLogsModal(item)
            }
          },
          {//show action
            icon: 'fa-light fa-eye',
            name: 'edit',
            label: this.$tr('isite.cms.label.show'),
            action: (item) => {
              this.openShowModal(item)
            }
          },
          {//Edit action
            icon: 'fa-light fa-pencil',
            name: 'edit',
            label: this.$tr('isite.cms.label.edit'),
            action: (item) => {
              this.$refs.crudComponent.update(item)
            }
          },
          {//Delete action
            icon: 'fa-light fa-trash-can',
            name: 'delete',
            label: this.$tr('isite.cms.label.delete'),
            action: (item) => {
              this.$refs.crudComponent.delete(item)
            }
          },          
        ]      
      }
    }
  },
  computed: {
    dynamicListTitle(){
      const from = moment(this.date.from).format('MMM Do')
      const to = moment(this.date.to).format('MMM Do')
      return `${this.$tr('itask.cms.week')}:  ${from} - ${to}`
    }, 
    
  },
  methods: {
    init(){},
    setDate(from, to){    
      this.date = {from, to}
      this.dateRangeFilter.value = {
        type: 'customRange',
        from,
        to
      } 
      this.listData.read.requestParams.filter['rangeDate'] = this.date
      this.$refs.dynamicList.updateFilter('rangeDate', this.date)      
      this.refreshDynamicList()
    },
    refreshDynamicList(){
      this.$refs.dynamicList.getData({pagination: {page: 0}}, true)
    },
    goToPrevious(){      
      //next week
      const from = moment(this.date.from).subtract(1, 'weeks').startOf('week').format(dateFormat)
      const to = moment(this.date.from).subtract(1, 'weeks').endOf('week').format(dateFormat)
      this.setDate(from, to)      
    },
    goToNext(){
      //next week
      const from = moment(this.date.from).add(1, 'weeks').startOf('week').format(dateFormat)
      const to = moment(this.date.to).add(1, 'weeks').endOf('week').format(dateFormat)
      this.setDate(from, to)      
    },
    setDateRange(value){
      if(value != null && value?.from && value?.to){
        const from = moment(value.from).format(dateFormat)
        const to = moment(value.to).format(dateFormat)
        if(from != this.date.from || to != this.date.to ) this.setDate(from, to)
      }
    }, 
    openTimeLogsModal(row){
      this.selectedRow.row = row
      this.selectedRow.timeLogsModal = true
    }, 
    async reloadRow(row){
      const newRow = await this.$refs.dynamicList.reloadRow(row)
      this.selectedRow.row = newRow      
    }, 
    openShowModal(row){
      this.selectedRow.row = row
      this.selectedRow.showModal = true
    }
  }
}
</script>
<style lang="scss">
.padding-none {
  padding: 0px !important;
}
</style>
