import {computed, reactive, ref, onMounted, toRefs, watch, markRaw, shallowRef} from "vue";

import services from "modules/qtask/_components/timeLogs/services";
import { store, i18n, clone } from 'src/plugins/utils';
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
    timeLogModel: null
  })

  // Computed
  const computeds = {
    // key: computed(() => {})
    //data to display       
   
  }

  // Methods
  const methods = {
    // methodKey: () => {}
    init() {    
    }, 
    createTimeLog(){
      const data = {
        taskId: props.row.id,
        timeSpent: state.timeLogModel,  //validate later
        createdAt: moment().format(dateFormat)
      }

      services.createItem(apiRoute, data).then((response) => {
        methods.reloadRow()
      })
    },
    deleteTimeLog(timelog){
      services.deleteItem(apiRoute, timelog.id).then((response) => {
        methods.reloadRow()        
      })
    },
    reloadRow(){
      emit('closeModal')        
      emit('reloadRow', props.row)
    },
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
