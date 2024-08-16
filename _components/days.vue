<template>
  <div>    
    <q-avatar 
      class="q-py-none"
      size="28px" 
      color="grey" 
      text-color="white">{{ diff.days }}
    </q-avatar>      
  </div>
  </template>
  <script lang="ts">
  import {defineComponent} from 'vue'
  import moment from 'moment';
  import { date } from 'src/plugins/utils';

  const dateFormat = 'YYYY/MM/DD';
  
  
  export default defineComponent({
    props: {
      row: {default: {}},
      col: {default: {}},
    },
    computed: {
      diff(){ //Difference in number of days
        const startDate = moment(this.row.startDate, dateFormat)
        const endDate = moment(this.row.endDate, dateFormat)
        //return moment.duration(endDate.diff(startDate)).asHours() /8 || '-'
        return date.getDiff(this.row.startDate, this.row.endDate)
      },
    }
  })
  </script>
  <style lang="scss">
  </style>