<template>
  <div 
    :style="{ 'color': row['category']?.options?.color ? row['category']?.options?.color : '#000000' }" 
    class="text-h6">
    {{ data }}    
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
