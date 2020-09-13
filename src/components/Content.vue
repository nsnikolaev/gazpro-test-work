<template>
  <div id="Content">
    <div class="header">
      {{ appSectionTitle.length > 0 ? appSectionTitle : 'Содержимое раздела' }}
    </div>
    <div class="content-wrap">

      <div v-if="appSectionId === 0">
        Выберите раздел...
      </div>

      <div v-if="appSectionId > 0">
        <table class="content-table">
          <tr>
            <td class="content-table-header"
              v-for="(item, index) in headers" :key="`table-header-${index}`">
              {{ item.value }}
            </td>
          </tr>
          <tr v-for="(cells, index) in itemsFormed" :key="`table-cells-${index}`">
            <td class="content-table-cell"
              v-for="(cell, index) in cells" :key="`table-cell-${index}`">
              {{ cell }}
            </td>
          </tr>
        </table>
      </div>

    </div>
    <Table/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import * as Api from '../api'
import Event from '../event'

import { iMenuItem } from '../types/Menu'
import { iContentHeader, iContentItem } from '../types/Content'

@Component({})
export default class Content extends Vue {
  private appSectionId: number = 0
  private appSectionTitle: string = ''
  
  private headers: iContentHeader[] | null = null
  private items: iContentItem[] | null = null
  private itemsFormed: Array<Array<any>> = []

  setItemsFormed(): void {
    this.itemsFormed = []
    const keys = []
    for (const item of this.headers) keys.push(item.key)
    for (const item of this.items) {
      let itemFormed: Array<any> = []
      for (const key of keys) {
        itemFormed.push( item[key] ? item[key] : null )
      }
      this.itemsFormed.push(itemFormed)
    }
  }

  created() {
    const self = this // because 'events' is oldschool lib 
    Event.on('app-section-select', async function(data: iMenuItem): Promise<void> {
      self.appSectionId = data.id
      self.appSectionTitle = data.title
      try {
        const response = await Api.getContent()
        self.headers = response.headers
        self.items = response.items
        self.setItemsFormed()
      }
      catch (error) { console.error(error) }
    })
  }
}
</script>

<style>
#Content {
  display: block;
  position: fixed;
  top: 0;
  left: 265px;
  width: calc(100% - 265px);
  height: 100%;
  background: #ffffff;
  box-sizing: border-box;
  overflow: auto;
}

.content-wrap {
  margin: 5px;
}

.content-table {
  border: solid 1px #eeeeee;
  border-collapse: collapse;
}

.content-table-header {
  padding: 5px 12px;
  font-weight: bold;
  text-align: center;
  border: solid 1px #eeeeee;
  border-collapse: collapse;
}

.content-table-cell {
  padding: 5px 12px;
  border: solid 1px #eeeeee;
  border-collapse: collapse;
}
</style>
