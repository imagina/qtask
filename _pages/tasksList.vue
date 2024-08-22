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
                Previous week
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
                Next week
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </template>
      </dynamicList>
    </div>

    <crud 
      ref="crudComponent"
      :type="null"
      :crud-data="import('modules/qtask/_crud/tasks')"
      @created="refreshDynamicList()"
      @updated="refreshDynamicList()"
      @deleted="refreshDynamicList()"
    />


    <master-modal
      v-model="timeLogs.modal"
      title="Seguimiento de tiempo"
      width="460px"
      @hide="timeLogs.modal = false"
    >
      <timeLogsComponent
        :row="timeLogs.row"
        @closeModal="timeLogs.modal = false"
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
import priorityComponent from 'modules/qtask/_components/priority'
import dateComponent from 'modules/qtask/_components/date'
import timeLogsComponent from 'modules/qtask/_components/timeLogs'
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD'

export default {
  props: {},
  components: {
    dynamicList,
    statusComponent,
    priorityComponent,
    timeLogsComponent
  },
  watch: {},
  mounted() {
    this.$nextTick(function () {
      //this.init()
    })
  },
  data() {
    return {
      timeLogs: {
        modal: false,
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
          title: 'New Task',
        },
        read: {
          title: "Task Management",
          showAs: 'custom',
          tableProps: {
            dense: true
          },
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: ''},
            {name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth',
              style: "max-width: 200px;width: 200px;", 
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
            {name: 'assignedTo', label: this.$tr('itask.cms.form.assigned'), field: 'assignedTo', align: 'left',
              format: val => ((val && (val.firstName || val.lastName) ) ? `${val.firstName} ${val.lastName}` : '-'),
              dynamicField: {
                value: [],
                type: 'select',
                name: 'assignedToId',
                props: {
                  label: this.$tr('itask.cms.form.assigned'),
                  //multiple: true,
                  //useChips: true,
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
            {name: 'startDate', label: this.$tr('isite.cms.form.startDate'), field: 'startDate', align: 'center',
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
            {name: 'endDate', label: this.$tr('isite.cms.form.endDate'), field: 'endDate', align: 'center',
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
            {name: 'duration', label: 'duration', field: 'duration', align: 'center',
              classes: "padding-none",
              headerClasess: "padding-none",
              format: (val) => { return val ? val : '-'},
            },
            {
              name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'center', 
              classes: "padding-none",
              headerClasess: "padding-none",
              component: statusComponent,
              dynamicField: {
                //value: [],
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
            {name: 'priority', label: this.$tr('itask.cms.form.priority'), field: 'priority', align: 'center',
              classes: "padding-none",
              headerClasess: "padding-none",
              component: priorityComponent, 
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
            {name: 'formatedEstimatedTime', label: this.$tr('itask.cms.form.estimatedTime'), field: 'formatedEstimatedTime', align: 'center'},
            {
              name: 'category', label: this.$tr('isite.cms.form.category'),
              align: 'left', field: 'category',
              format: (val) => {
                return val && val?.title ? val.title : '-'
              },
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
              name: 'totalFormatedTimelogsDuration', label: 'Time Logs', field: 'totalFormatedTimelogsDuration', align: 'left',
              format: (val) => {                
                return val ? val : '-'
              },
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
                //multiple: true,
                //useChips: true,
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
            title: this.$tr("Dynamic table"),
            description: this.$tr("this is the dynamic table description")
          },
        },
        update: {
          title: 'Update task'
        },
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          title: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          description: {
            name : "description",
            value: '',
            type: 'html',
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
        },
        formRight: {          
          assignedToId: {
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
          startDate: {
            value: '',            
            type: 'date',
            props: {
              label: this.$tr('isite.cms.form.startDate')
             }
          },        
          endDate: {
            value: '',            
            type: 'date',
            props: {
              label: this.$tr('isite.cms.form.endDate'),
            }
          },
          estimatedTime: {
            value: '',            
            type: 'input',
            props: {
              label: this.$tr('itask.cms.form.estimatedTime'),
            }          
          },
          priorityId: {
            value: [],
            type: 'select',
            props: {
              label: this.$tr('itask.cms.form.priority'),             
              useInput: true,
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
        beforeUpdate: (val) => {
          return new Promise((resolve, reject) => {
            //check startDate should be minor than dateFormat
            if(val.description == '') reject(val)
            
            if(moment(val.startDate).format(dateFormat) > moment(val.endDate).format(dateFormat)){
              this.$alert.error({message: 'start date is bigger than end date'})
              reject(val)
            } else {
              resolve(val)
            }
          })
        },
        actions: [
          {//Open timelogs
            icon: 'fa-light fa-timer',
            name: 'addTimelog',
            label: 'Timelog',
            action: (item) => {
              this.openTimeLogsModal(item)
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
      return `Week:  ${from} - ${to}`
    }, 
    
  },
  methods: {
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
      this.timeLogs.row = row
      this.timeLogs.modal = true
    }, 
    reloadRow(row){
      this.$refs.dynamicList.reloadRow(row)
    }
  }
}
</script>
<style lang="scss">
.padding-none {
  padding: 0px !important;
}
</style>
