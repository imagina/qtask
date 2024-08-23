import {computed, reactive, ref, onMounted, toRefs, watch, markRaw, shallowRef} from "vue";

import services from "modules/qtask/_components/timeLogs/services";
import { store, i18n, clone, alert } from 'src/plugins/utils';
import moment from 'moment';

export default function controller(props, emit) {  

  const dateFormat = 'YYYY/MM/DD'
  const apiRoute = 'apiRoutes.qtask.timelogs'

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  }

  // States
  const state = reactive({
    // Key: Default Value
    loading: false,
    dateModel: null,
    dateField: {
      value: moment().format(dateFormat),
      type: 'date',
    },
    timeSpentModel: null,
    timeSpentField: {
      type: 'timeSpent',
      props: {
        //label: i18n.tr('itask.cms.timeLogs.timeSpent') ,
        unit: 'minutes'
      }
    },
  })

  // Computed
  const computeds = {
    // key: computed(() => {})
    //data to display
    disableButton: computed(() => state.timeSpentModel ==  null || state.timeSpentModel ==  '')
  }

  // Methods
  const methods = {
    // methodKey: () => {}
    init() {    
    }, 
    createTimeLog(){
      const data = {
        taskId: props.row.id,
        timeSpent: state.timeSpentModel,
        createdAt: state.dateModel ?  state.dateModel : moment().format(dateFormat)
      }

      state.loading = true
      services.createItem(apiRoute, data).then((response) => {
        state.timeSpentModel = null
        state.loading = false
        alert.info({message: i18n.tr('isite.cms.message.recordCreated')});
        methods.reloadRow()
      })
    },
    deleteTimeLog(timelog){
      alert.error({
        mode: 'modal',
        title: `ID: ${timelog.id}`,
        message: i18n.tr('isite.cms.message.deleteRecord'),
        actions: [
          { label: i18n.tr('isite.cms.label.cancel'), color: 'grey' },
          {
            label: i18n.tr('isite.cms.label.delete'),
            color: 'red',
            handler: async () => {
              state.loading = true
              services.deleteItem(apiRoute, timelog.id).then((response) => {
                methods.reloadRow()
                state.loading = false                
              })
            }
          }
        ]
      })
    },
    reloadRow(){
      emit('reloadRow', props.row)
    },
    
    createdBy(item){
      return item.creator?.firstName ? `${item.creator.firstName} ${item.creator.lastName}` : item.creator.email
    }
  }

  // Mounted
  onMounted(() => {
    methods.init()
  })

  // Watch
  // watch(key, (newField, oldField): void => {
  //
  // }, {deep: true})

  return {...refs, ...(toRefs(state)), ...computeds, ...methods}
}
