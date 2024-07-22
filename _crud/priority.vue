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
        extraFormFields: 'iblog.crud-fields.categories',
        create: {
          title: 'new task',
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'name', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth'},
            {name: 'slug', label: this.$tr('isite.cms.form.slug'), field: 'slug', align: 'left'},
            {
              name: 'status',
              label: this.$tr('isite.cms.form.status'),
              field: 'status',
              align: 'left',
              isTranslatable: true
            },
            {
              name: 'parent', label: this.$tr('isite.cms.form.parent'), field: 'parent', align: 'left',
              format: val => val ? (val.title ? val.title : '-') : '-'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'parent,qrs'},
          filters: {
            parentId: {
              value: null,
              type: 'treeSelect',
              props: {
                label: this.$tr('isite.cms.form.parent')
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qblog.categories',
                requestParams: {filter: {status: 1}}
              }
            },
          }
        },
        update: {
          title: this.$tr('iblog.cms.updateCategory'),
          requestParams: {include: 'parent'}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          color: {
            value: '',
            isTranslatable: true,
            type: 'input',
            props: {
              label: 'color',
            }
          },
          icon: {
            value: '',
            isTranslatable: true,
            type: 'input',
            props: {
              label: 'color',
            }
          },
          
        },
        formRight: {}
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>
