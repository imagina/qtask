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
        apiRoute: 'apiRoutes.qtask.tasks',
        permission: 'itask.tasks',
        create: {
          title: this.$tr('itask.cms.newTask'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'center'},
            {name: 'description', label: this.$tr('isite.cms.form.description'), field: 'description', align: 'center', style: 'width: 200px'},
            {name: 'startDate', label: this.$tr('isite.cms.form.startDate'), field: 'startDate', align: 'center'},
            {name: 'endDate', label: this.$tr('isite.cms.form.endDate'), field: 'endDate', align: 'center'},
            {name: 'statusId', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'center', 
             format: (val) => val && val?.title ? val.title : '-',
            },
            {name: 'priority', label: this.$tr('itask.cms.form.priority'), field: 'priority', align: 'center',
             format: (val) => val && val?.title ? val.title : '-',
            },
            {name: 'formatedEstimatedTime', label: this.$tr('itask.cms.form.estimatedTime'), field: 'formatedEstimatedTime', align: 'center'},
            {name: 'assignedTo', label: this.$tr('itask.cms.form.assigned'), field: 'assignedTo', align: 'center',  
             format: (val) => ((val && (val.firstName || val.lastName) ) ? `${val.firstName} ${val.lastName}` : '-'),
            },
            {name: 'category', label: this.$tr('isite.cms.form.category'), field: 'category', align: 'center',
             format: (val) => val && val?.title ? val.title : '-',
            },
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
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {
            include: 'category,status,priority,timelogs.creator,assignedTo',
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
          }
        },
        update: {
          title: this.$tr('itask.cms.updateTask'),
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
            required: true,
            props: {
              label: this.$tr('isite.cms.form.startDate')
             }
          },        
          endDate: {
            value: '',            
            type: 'date',
            required: true,
            props: {
              label: this.$tr('isite.cms.form.endDate'),
            }
          },
          estimatedTime: {
            value: '',
            type: 'timeSpent',            
            props: {
              label: this.$tr('itask.cms.form.estimatedTime'),
              unit: 'minutes'
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
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('modules/qtask/_crud/categories'),
              customData: {
                read: {
                  requestParams: {include: 'parent', filter: {status: 1}}
                }
              },
              crudProps: {
                label: `${this.$tr('isite.cms.form.category')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
            },
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
