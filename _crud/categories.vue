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
        apiRoute: 'apiRoutes.qtask.categories',
        permission: 'itask.categories',
        create: {
          title: 'New Category',
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
          filters: {}
        },
        update: {
          title: 'Update category',          
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
            type: 'input',
            props: {
              label: 'system name',
            }
          },
          parentId: {
            value: '',            
            type: 'input',
            props: {
              label: 'parent id',
            }
          },
          statoptionsusId: {
            value: 0,
            type: 'select',
            props: {
              label: 'Options',
              options: [
                {label: 'option 0', value: 0},
              ],
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
