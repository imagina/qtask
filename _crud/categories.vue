<template></template>
<script>

export default {
  data() {
    return {
      crudId: this.$uid()
    };
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qtask.categories',
        permission: 'itask.categories',
        create: {
          title: this.$tr('isite.cms.newCategory')
        },
        read: {
          columns: [
            { name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px' },
            { name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth' },
            {
              name: 'parent', label: this.$tr('isite.cms.form.parent'), field: 'parent', align: 'rigth',
              format: val => val?.title ?? '-'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            {
              name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            { name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left' }
          ],
          filters: {
            parentId: {
              type: 'select',
              props: {
                label: this.$tr('isite.cms.form.parent'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qtask.categories',
                filterByQuery: true
              }
            }
          },
          requestParams: {
            include: 'parent'
          }
        },
        update: {
          title: this.$tr('isite.cms.updateCategory')
        },
        delete: true,
        formLeft: {
          id: { value: '' },
          userId: { value: this.$store.state.quserAuth.userId },
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ]
            }
          },
          description: {
            name: 'description',
            value: '',
            type: 'html',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ]
            }
          },
          systemName: {
            value: '',
            type: 'input',
            props: {
              label: this.$tr('isite.cms.form.systemName')
            }
          },
          parentId: {
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.parent'),
              clearable: true
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qtask.categories',
              filterByQuery: true
            }
          }
        },
        formRight: {}
      };
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {};
    }
  }
};
</script>
