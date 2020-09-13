<template>
  <div id="App">
    <Menu/>
    <Content/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import Event from './event'

import Content from './components/Content.vue'
import Menu from './components/Menu.vue'

import { iMenuItem } from './types/Menu'

@Component({
  components: {
    Content,
    Menu,
  },
})
export default class App extends Vue {}
</script>

<style>
body {
  height: 100%;
  font-size: 14px;
  font-family: sans-serif;
}

#App {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #c1daf7;
  overflow: hidden;
}

.header {
  padding: 12px;
  font-size: 16px;
  color: white;
  background: #4fa1ff;
}

.pointer { cursor: pointer; }

</style>
