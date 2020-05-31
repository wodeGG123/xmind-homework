<template>
  <div class="app-layout">
  <header />
  <div class="content">
      内容
  </div>
  <footer />
  </div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';
export default {
 name:'Layout',
 components:{Header,Footer},

}
</script>

<style lang="scss" scoped>
.app-layout{
    width: 100vw;
    overflow: hidden;
    position: relative;
}
</style>>
