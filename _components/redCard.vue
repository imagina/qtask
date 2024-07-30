<template>
  <div>    
    <q-chip 
      :label="data"
      @click="() => {console.log('click');$emit('click', {row, col}) }"
    />
    
    <q-badge outline align="middle" color="red">
      {{ data }}
    </q-badge>
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
})
</script>
<style lang="scss">
</style>
