<template>  
  <div>
    <dynamicList
      :api-route="apiRoute"
      :title="title"
      :columns="read.columns"
      :actions="actions"
      :permission="permission"
      :requestParams="read.requestParams"
      :beforeUpdate="read.beforeUpdate"
    />
  </div>
</template>
<script>
//Components
import dynamicList from 'modules/qsite/_components/master/dynamicList'
import redCard from 'modules/qtask/_components/redCard'
import moment from 'moment';

const states = {
  notExpired: {
    color: '#000000', 
    icon: ''
  },
  expired: {
    color: '#fc0303', 
    icon: 'fa-solid fa-circle-exclamation'
  }
  
}

export default {
  props: {},
  components: {
    dynamicList, 
    redCard
  },
  watch: {},
  mounted() {
    this.$nextTick(function () {
      //this.init()
    })
  },
  data() {
    return {      
      loading: false,  
      title: "DynamicTable 2",
      apiRoute: 'apiRoutes.qtask.tasks',
      permission: 'itask.tasks',
      read: {
        columns: [
          {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
          {name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth', 
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
            contentType: {
              component: redCard
            }          
            
          },
          {name: 'description', label: this.$tr('isite.cms.form.description'), field: 'description', align: 'left', 
            style: 'width: 200px',
            dynamicField: {
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
          {name: 'startDate', label: this.$tr('isite.cms.form.startDate'), field: 'startDate', align: 'left',
            contentType: {
              content: (val) => {                
                const state = moment().format('YYYYMMDD') > moment(val).format('YYYYMMDD') ? states.expired : states.notExpired
                return `<span style="color: ${state.color}"><i class="${state.icon}"></i> ${val}</span>`
              }
            }, 
            dynamicField: {          
              value: '',            
              type: 'date',
              props: {
                label: this.$tr('isite.cms.form.startDate'),
              }
            }
          },
          {name: 'endDate', label: this.$tr('isite.cms.form.endDate'), field: 'endDate', align: 'left', 
            dynamicField: {          
              value: '',            
              type: 'date',
              props: {
                label: this.$tr('isite.cms.form.endDate'),
              }
            }
          },
          {
            name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'left',
            format: val => ((val && val.title) ? val.title : '-'),
            contentType: {
              content: (val) => {
                return `<span style="color: ${val.color}"><i class="${val.icon}"></i> ${val.title}</span>`
              }
            }
          },
          {name: 'priority', label: this.$tr('itask.cms.form.priority'), field: 'priority', align: 'center', 
            format: val => ((val && val.title) ? val.title : '-'),

          },
          {name: 'estimatedTime', label: this.$tr('itask.cms.form.estimatedTime'), field: 'estimatedTime', align: 'left'},
          {name: 'assignedTo', label: this.$tr('itask.cms.form.assigned'), field: 'assignedTo', align: 'left',
            format: val => ((val && (val.firstName || val.lastName) ) ? `${val.firstName} ${val.lastName}` : '-'),
          },
          {
            name: 'category', label: this.$tr('isite.cms.form.category'),
            align: 'left', field: 'category', sortable: true,
            contentType: {
              content: (val) => {
                return `<span style="color: ${val.options.color}"><i class="${val.options.icon}"></i> ${val.title}</span>`
              }
            }
            
          },
          {
            name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
            format: val => val ? this.$trd(val) : '-',
          },
          {
            name: 'updatedAt', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
            format: val => val ? this.$trd(val) : '-',
          },
          {
            name: 'deletedAt', label: this.$tr('itask.cms.form.deletedAt'), field: 'deletedAt', align: 'left',
            format: val => val ? this.$trd(val) : '-',
          },
          {
            name: 'actions', label: this.$tr('isite.cms.form.actions'), 
            align: 'center',
          
          },
        ],
        requestParams: {include: 'category,status,priority,timelogs,assignedTo'},
        beforeUpdate: (val) => {
          console.warn('update bby', val)
        }
      }, 
      

      actions: [
        {//Edit action
          icon: 'fa-light fa-pencil',
          name: 'edit',
          sortOrder: 99,
          color: 'red',
          label: this.$tr('isite.cms.label.edit'),
          action: (item) => {
            console.warn('edit', item.id)
          }
        },
        {//Delete action
          icon: 'fa-light fa-trash-can',
          name: 'delete',
          sortOrder: 99,
          color: 'red',
          label: this.$tr('isite.cms.label.delete'),          
          action: (item) => {
            console.warn('delete', item.id)
          }
        },
      ]      
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style>
</style>
