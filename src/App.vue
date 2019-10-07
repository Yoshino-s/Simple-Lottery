<template>
  <div id="app">
    <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon to="/" slot="left">
          <mu-icon value="assignment"></mu-icon>
        </mu-button>Hello World!
        <mu-button icon to="/draw" slot="right">
          <mu-icon value="cake"></mu-icon>
        </mu-button>
    </mu-appbar>
    <div style="margin-top: 60px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background: url("/topBG.jpg");
}
</style>
