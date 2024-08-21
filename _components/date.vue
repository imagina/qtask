<template>
  <div 
    v-if="data"
    style="width: 90px;"
  >
    <q-chip 
      outline
      text-color="white"
      :color="state.color"
      class="q-py-none full-width"
    >
    <div class="full-width">
      <i v-if="state?.icon" :class="state.icon"></i>
      &nbsp;{{ date }}
      <q-tooltip>{{ data }}</q-tooltip>
    </div>
    </q-chip>
  </div>
  </template>
  <script lang="ts">
  import {defineComponent} from 'vue'
  import moment from 'moment';

  const dateFormat = 'YYYY/MM/DD';
  const states = {
    notExpired: {
      color: 'gray', 
      icon: ''
    },
    expired: {
      color: 'red', 
      icon: 'fa-regular fa-calendar-circle-exclamation'
    }  
  }
  
  export default defineComponent({
    props: {
      row: {default: {}},
      col: {default: {}},
      data: {default: {}}
    },
    computed: {
      state(){
        return moment().format(dateFormat) > moment(this.data).format(dateFormat) ? states.expired : states.notExpired
      }, 
      date(){
        return moment(this.data).format('MMM D')
      }
    }
  })
  </script>
  <style lang="scss">
  </style>