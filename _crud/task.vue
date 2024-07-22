<template></template>
<script>

export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qblog.entityNames.category"),
        apiRoute: 'apiRoutes.qblog.categories',
        permission: 'iblog.categories',
        create: {
          title: 'new task',
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth'},
            {name: 'description', label: this.$tr('isite.cms.form.description'), field: 'description', align: 'description'},
            {name: 'startDate', label: this.$tr('isite.cms.form.startDate'), field: 'startDate', align: 'startDate'},
            {name: 'endDate', label: this.$tr('isite.cms.form.endDate'), field: 'endDate', align: 'endDate'},
            {name: 'statusId', label: this.$tr('isite.cms.form.statusId'), field: 'statusId', align: 'statusId'},
            {name: 'priorityId', label: this.$tr('isite.cms.form.priorityId'), field: 'priorityId', align: 'priorityId'},
            {name: 'estimatedTime', label: this.$tr('isite.cms.form.estimatedTime'), field: 'estimatedTime', align: 'estimatedTime'},
            {name: 'assignedToId', label: this.$tr('isite.cms.form.assignedToId'), field: 'assignedToId', align: 'assignedToId'},
            {name: 'categoryId', label: this.$tr('isite.cms.form.categoryId'), field: 'categoryId', align: 'categoryId'},
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'deleted_at', label: this.$tr('isite.cms.form.deletedAt'), field: 'deletedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'parent,qrs'},
          filters: {}
        },
        update: {
          title: this.$tr('iblog.cms.updateCategory'),
        },
        delete: true,
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
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          startDate: {
            value: '',            
            type: 'input',
            props: {
              label: 'start date',
            }
          },
          endDate: {
            value: '',            
            type: 'input',
            props: {
              label: 'end date',
            }
          },
          statusId: {
            value: 0,
            type: 'select',
            props: {
              label: 'priority id',
              options: [
                {label: this.$tr('isite.cms.label.disabled'), value: 0},
              ],
            }
          },
        },
        formRight: {
          priorityId: {
            value: 0,
            type: 'select',
            props: {
              label: 'priority id',
              options: [
                {label: this.$tr('isite.cms.label.disabled'), value: 0},
              ],
            }
          },
          estimatedTime: {
            value: '',            
            type: 'input',
            props: {
              label: 'estimatedTime',
            }
          },
          assignedToId: {
            value: 0,
            type: 'select',
            props: {
              label: 'assignedToId',
              options: [
                {label: this.$tr('isite.cms.label.disabled'), value: 0},
              ],
            }
          },
          categoryId: {
            value: 0,
            type: 'select',
            props: {
              label: 'categoryId',
              options: [
                {label: this.$tr('isite.cms.label.disabled'), value: 0},
              ],
            }
          },
        }
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>
