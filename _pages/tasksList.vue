<template>  
  <div>
    <dynamicList
      :api-route="apiRoute"
      :title="title"
      :columns="columns"
      :actions="actions"
      :permission="permission"
    />
  </div>
</template>
<script>
//Components
import dynamicList from 'modules/qsite/_components/master/dynamicList'
import redCard from 'modules/qtask/_components/redCard'
import {markRaw} from 'vue'

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
      permission: 'itask.categories',
      columns: [
        {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
        {name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth', 
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
          contentType: {
            component: redCard
          }          
          
        },
        {name: 'description', label: this.$tr('isite.cms.form.description'), field: 'description', align: 'description', 
          style: 'width: 200px',          
          isEditable: true,           
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
        {name: 'startDate', label: this.$tr('isite.cms.form.startDate'), field: 'startDate', align: 'startDate', isEditable: true,
          contentType: {
            content: (data) => {
              return `<span style="color: #c10015"><i class="fa-solid fa-circle-5"></i> ${data}</span>`
            }
          }
        },
        {name: 'endDate', label: this.$tr('isite.cms.form.endDate'), field: 'endDate', align: 'endDate', isEditable: true},
        {name: 'statusId', label: this.$tr('isite.cms.form.status'), field: 'statusId', align: 'statusId', isEditable: true},
        {name: 'priorityId', label: this.$tr('itask.cms.form.priority'), field: 'priorityId', align: 'priorityId', isEditable: true},
        {name: 'estimatedTime', label: this.$tr('itask.cms.form.estimatedTime'), field: 'estimatedTime', align: 'estimatedTime', isEditable: true},
        {name: 'assignedToId', label: this.$tr('itask.cms.form.assigned'), field: 'assignedToId', align: 'assignedToId', isEditable: true},
        {name: 'categoryId', label: this.$tr('isite.cms.form.category'), field: 'categoryId', align: 'categoryId', isEditable: true},
        {
          name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
          format: val => val ? this.$trd(val) : '-',
        },
        {
          name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
          format: val => val ? this.$trd(val) : '-',
        },
        {
          name: 'deleted_at', label: this.$tr('itask.cms.form.deletedAt'), field: 'deletedAt', align: 'left',
          format: val => val ? this.$trd(val) : '-',
        },
        {
          name: 'actions', label: this.$tr('isite.cms.form.actions'), 
          align: 'center',
         
        },
      ],        
      

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
