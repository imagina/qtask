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
      type: 'input',
      props: {
        rules: [
          val => !!val || i18n.tr('isite.cms.message.fieldRequired')
        ]
      }
    }
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
        timeSpent: methods.setTimeSpent(),
        createdAt: state.dateModel ?  state.dateModel : moment().format(dateFormat)
      }

      state.loading = true
      services.createItem(apiRoute, data).then((response) => {
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
                state.loading = false
                methods.reloadRow()
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
    },
    setTimeSpent(){
      const types = ['m', 'h', 'd', 'w']
      const hour = 60; //mins
      const day = hour * 24;
      const week = day * 7;

      let timeSpent = state.timeSpentModel.toString().split(' ')
      let totalTimeSpent = 0

      timeSpent.forEach(element => {
        const str = element.toLowerCase()
        /*
        get last char if not valid or missing 
        ignores it and takes the time in minutes
        */
        const type = types.includes(str.slice(-1)) ? str.slice(-1) : types[0]
        let time = types.includes(str.slice(-1)) ? Number(str.slice(0, -1)) : Number(str)

        switch (type) {
          case types[1]:
            time = time * hour
            break;
          case types[2]:
            time = time * day
            break;
          case types[3]:
            time = time * week
            break;
        }
        totalTimeSpent = totalTimeSpent + time
      });
      return totalTimeSpent
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
