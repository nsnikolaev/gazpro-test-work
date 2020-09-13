<template>
  <div id="Menu">
    <div class="header">Меню</div>
    <div class="menu-section"
      v-for="(section, index) in getSections()" :key="`menu-section-${index}`">

      <div class="menu-section-title pointer" @click="toggleSection(section.id)">
        {{ section.title }}
      </div>

      <div class="menu-section-items" v-if="isSectionToddled(section.id)">
        <div class="menu-section-item pointer" @click="setItem(item.id, item.title)"
          v-for="(item, index) in getItems(section.id)" :key="`menu-item-${index}`"
          :class="{selected: item.id === itemSelectedId}">
          {{ item.title }}
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

import * as Api from '../api'
import Event from '../event'

import { iMenu, iMenuSection, iMenuItem } from '../types/Menu'

@Component({})
export default class Menu extends Vue {

  private menuStructure: iMenu[] = []
  private sectionToggledIds: number[] = []
  private itemSelectedId: number = 0

  @Watch('menuStructure', { immediate: true }) menuStructureWatch(): void { this.init() }

  async init(): Promise<void> {
    try {
      this.menuStructure = await Api.getMenu()
    }
    catch (error) { console.error(error) }
  }

  getSections(): iMenuSection[] {
    let sections: iMenuSection[] = []
    for (const item of this.menuStructure) sections.push({ id: item.id, title: item.title })
    return sections
  }

  getItems(sectionId: number): iMenuItem[] {
    let items: iMenuItem[] = []
    for (const item of this.menuStructure) {
      if (item.id === sectionId) return item.items
    }
    return items
  }

  setItem(id: number, title: string): void {
    this.itemSelectedId = id
    Event.emit('app-section-select', { id, title })
  }

  toggleSection(sectionId: number): void {
    const index: number = this.sectionToggledIds.indexOf(sectionId)
    if (index === -1) this.sectionToggledIds.push(sectionId)
    else this.sectionToggledIds.splice(index, 1)
  }

  isSectionToddled(sectionId: number): boolean {
    return this.sectionToggledIds.indexOf(sectionId) !== -1
  }

  created(): void { this.init() }
}
</script>

<style>
#Menu {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100%;
  overflow-y: auto;
  background: #ffffff;
}

.menu-section {
  margin: 5px;
}

.menu-section-title {
  padding: 8px 12px 8px 7px;
  font-size: 16px;
  background: #e0e0e0;
}

.menu-section-item {
  padding: 8px 12px 8px 12px;
}
.menu-section-item.selected {
  background: #fcdeb1;
}
</style>
