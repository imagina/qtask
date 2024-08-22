<template>
  <div>
    <div class="q-mb-md">
      <p>
        {{ $tr('itask.cms.timeLogs.total') }} : {{ row.totalFormatedTimelogsDuration }}
      </p>
    </div>
    <div class="row q-gutter-x-md items-center">
      <div class="q-gutter-y-xs">
        <p>{{ $tr('itask.cms.timeLogs.startDate') }}</p>
        <dynamic-field
          v-model="dateModel"
          :field="dateField"
          style="width: 160px;"
        />
      </div>
      <div class="q-gutter-y-xs">
        <p>{{ $tr('itask.cms.timeLogs.timeSpent') }}</p>
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
    <div class="q-py-md">
      <p>{{ $tr('itask.cms.timeLogs.format.title') }}</p>
      <ul class="time-logs-format">
        <li>{{ $tr('itask.cms.timeLogs.format.weeks') }}</li>
        <li>{{ $tr('itask.cms.timeLogs.format.days') }}</li>
        <li>{{ $tr('itask.cms.timeLogs.format.hours') }}</li>
        <li>{{ $tr('itask.cms.timeLogs.format.minutes') }}</li>
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
  .time-logs-format {
    list-style: disc;
    padding-left: 20px;
  }
  </style>