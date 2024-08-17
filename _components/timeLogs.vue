<template>
  <div @click="modal = true" class="cursor-pointer">
    <p>timeLogs: {{ data }}</p>


    <q-dialog v-model="modal">
        <q-card >
          <q-card-section class="bg-white">
            <p>totalFormatedTimelogsDuration: {{ row.totalFormatedTimelogsDuration }}</p>
            <p>totalTimelogsDurationInMinutes: {{ row.totalTimelogsDurationInMinutes }}</p>
          </q-card-section>

          <q-card-section>
            <div class="">
              <p>Usa este formato: 2w 4d 6h 45m</p>
                <ul>
                  <li>w = semanas</li>
                  <li>d = días</li>
                  <li>h = horas</li>
                  <li>m = minutos</li>
                </ul>
              </div>
          </q-card-section>

          

          <q-card-actions align="right"  class="q-px-md q-pb-md">
            <q-btn
              :label="$tr('notification.cms.cancel')"
              rounded
              no-caps
              unelevated
              color="grey-3"
              text-color="grey-8"
              @click="closeModal()"
              class="q-px-md"
            />
            <q-btn
              label="Save"
              rounded
              no-caps
              unelevated
              color="grey-3"
              text-color="grey-8"
              @click="closeModal()"
              class="q-px-md"
            />
          </q-card-actions>
        </q-card>
    </q-dialog>

        
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
    },
    data(){
      return {
        modal: false
      }
    },
    methods: {
      closeModal(){
        this.modal = false
      }
    }
    
  })
  </script>
  <style lang="scss">
  </style>