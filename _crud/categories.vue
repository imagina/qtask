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
        apiRoute: 'apiRoutes.qtask.categories',
        permission: 'iblog.categories',
        create: {
          title: 'new task',
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth'},
            {name: 'description', label: this.$tr('isite.cms.form.description'), field: 'description', align: 'rigth'},
            {name: 'systemName', label: this.$tr('isite.cms.form.systemName'), field: 'systemName', align: 'rigth'},
            {name: 'parentId', label: this.$tr('isite.cms.form.parentId'), field: 'parentId', align: 'rigth'},
            {name: 'options', label: this.$tr('isite.cms.form.options'), field: 'options', align: 'rigth'},
            
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'parent,qrs'},
          filters: {}
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
          systemName: {
            value: '',
            isTranslatable: true,
            type: 'input',
            props: {
              label: 'system name',
            }
          },
          parentId: {
            value: '',
            isTranslatable: true,
            type: 'input',
            props: {
              label: 'parent id',
            }
          },
          options: {
            value: '',
            isTranslatable: true,
            type: 'input',
            props: {
              label: 'options',
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
