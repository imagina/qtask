<template>
    <div
      v-if="data"
      :style="{ 'background-color': background, 'color': color}"
    >
      <div class="flex justify-center items-center " style="width: 140px;  height: 36px; padding: 8px;">
        <div class="ellipsis">
          <i v-if="data?.icon" :class="data?.icon"></i>&nbsp;
          {{ data.title }}
        </div>
      </div>
    </div>
  </template>
  <script lang="ts">
  import {defineComponent} from 'vue'
  
  export default defineComponent({
    props: {
      row: {default: {}},
      col: {default: {}},
      data: {default: {}}
    },
    computed: {
      background(){
        return this.data?.color ? this.data.color : '#000000'
      }, 
      color(){
        return this.data?.color ? '#ffffff' : '#000000'
      }
    }
  })
  </script>
  <style lang="scss">
  </style>