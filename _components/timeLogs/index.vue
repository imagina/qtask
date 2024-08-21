<template>
  <div>
    <div class="q-mb-md">
      <p>
        Registro: {{ row.totalFormatedTimelogsDuration }}
      </p>
    </div>
    <div class="row q-gutter-x-md items-center">
      <div class="q-gutter-y-xs">
        <p>Fecha de inicio</p>
        <dynamic-field
          v-model="dateModel"
          :field="dateField"
          style="width: 160px;"
        />
      </div>
      <div class="q-gutter-y-xs">
        <p>Tiempo empleado</p>
        <dynamic-field
          v-model="timeSpentModel"
          :field="timeSpentField"
          style="width: 160px;"
        />
      </div>
      <div class="q-gutter-y-xs">
        <q-btn
          :label="$tr('isite.cms.label.save')"
          rounded
          no-caps
          unelevated
          color="primary"
          @click="() => createTimeLog()"
          :disable="disableButton"
        />
      </div>
    </div>
    <div class="q-pa-md">
      <p>Usa este formato: 2w 4d 6h 45m</p>
      <ul>
        <li>w = semanas</li>
        <li>d = días</li>
        <li>h = horas</li>
        <li>m = minutos</li>
      </ul>
    </div>
    <div class="q-mt-sm" v-if="row.timelogs?.length">
      <q-separator class="q-my-sm"/>
      <q-scroll-area style="height: 220px;" visible>
        <q-list>
          <template v-for="(item, itemKey) in row.timelogs"  :key="itemKey">
            <q-item>
              <q-item-section>
                <q-item-label class="q-gutter-x-xs">
                  <span class="text-weight-medium">{{ createdBy(item) }}</span>
                  <span>{{ item.formatedTimeSpent }}</span>
                </q-item-label>
                <q-item-label caption lines="1">{{ $trd(item.createdAt)}}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>
                  <q-btn
                    :label="$tr('isite.cms.label.delete')"
                    @click="deleteTimeLog(item)"
                    rounded
                    no-caps
                    unelevated
                    dense
                    color="grey-3"
                    text-color="grey-8"
                    class="q-px-md"
                  />
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </div>
    <inner-loading :visible="loading"/>
  </div>
  
  </template>
  <script lang="ts">
  import {defineComponent} from 'vue'
  import controller from 'modules/qtask/_components/timeLogs/controller'
  
  export default defineComponent({
    props: {
      row: {default: {}}
    },
    setup(props, {emit}) {
      return controller(props, emit)
    }
  })
  </script>
  <style lang="scss">
  </style>